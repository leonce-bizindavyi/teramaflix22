import fs from 'fs-extra';
import formidable from 'formidable';
import path from 'path';
import executeQuery from '@/Config/db4';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadHandler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    // Créez un répertoire "Thumbnails" s'il n'existe pas déjà
    await fs.ensureDir('./public/Thumbnails');

    // Définissez le répertoire de destination des vidéos uploadées
    form.uploadDir = path.join(process.cwd(), './public/Thumbnails');

    // Parsez la requête
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'upload des vidéos.' });
      }

      // Récupérez les informations des fichiers uploadés
      const images = Array.isArray(files.image) ? files.image : [files.image];
      // Déplacez chaque fichier uploadé dans le répertoire de destination
      if(images[0] == undefined) {
        insertVideo(fields.oldimage,fields)
        res.status(200).json({ message: 'Upload réussi !' });
      }else{
        const movePromises = images.map((image) => {
          if(image.newFilename) return moveVideo(image,fields);
          else return insertVideo(fields.oldimage,fields)
        });
        Promise.all(movePromises)
        .then(() => {
          res.status(200).json({ message: true });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'enregistrement des vidéos.' });
        });
      }
      

      
    });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Méthode non autorisée');
  }
}

async function moveVideo(image,fields) {
  //insertion dans la base de données
  insertVideo(fields,image.newFilename)
  //modifier dans le dossier
  const newPath = `./public/Thumbnails/${image.newFilename}`
  await insertVideo(image.newFilename,fields);
  return newPath;
}

async function insertVideo(image,fields) {
  const {title,desc,cat,id} = fields
  try {
    // Exécutez la requête SQL pour insérer une vidéo dans la base de données
    const rows = await executeQuery('UPDATE posts SET Title=?, Image=?, Body=?, Categorie=?, Visible=? WHERE ID=?',
    [title, image, desc, cat, 1, id]);

  } catch (error) {
  }
}