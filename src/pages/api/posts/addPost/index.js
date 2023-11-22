import fs from 'fs-extra';
import formidable from 'formidable';
import path from 'path';
import executeQuery from '@/Config/db4';
import chokidar from 'chokidar';

export const config = {
  api: {
    bodyParser: false,
  },
};

const thumbnailsFolderPath = path.join(process.cwd(), './public/Thumbnails');

// Créez un watcher pour surveiller les changements dans le dossier Thumbnails
const watcher = chokidar.watch(thumbnailsFolderPath);

watcher.on('all', async (event, filePath) => {
  console.log(`File ${filePath} has been ${event}`);
  // Réagissez aux changements ici, par exemple, mettre à jour la base de données
  // ou déclencher une autre action en fonction des changements dans le dossier Thumbnails
});

export default async function uploadHandler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    // Créez un répertoire "Thumbnails" s'il n'existe pas déjà
    await fs.ensureDir(thumbnailsFolderPath);

    // Définissez le répertoire de destination des vidéos uploadées
    form.uploadDir = thumbnailsFolderPath;

    // Parsez la requête
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'upload des vidéos.' });
      }

      // Récupérez les informations des fichiers uploadés
      const images = Array.isArray(files.image) ? files.image : [files.image];

      // Déplacez chaque fichier uploadé dans le répertoire de destination
      if (images[0] === undefined) {
        await insertVideo(fields.oldimage, fields);
        res.status(200).json({ message: 'Upload réussi !' });
      } else {
        const movePromises = images.map(async (image) => {
          if (image.newFilename) {
            await moveVideo(image, fields);
          } else {
            await insertVideo(fields.oldimage, fields);
          }
        });

        try {
          await Promise.all(movePromises);
          
          // Répondez au client une fois que tous les fichiers ont été traités
          res.status(200).json({ message: true });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'enregistrement des vidéos.' });
        }
      }
    });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Méthode non autorisée');
  }
}

async function moveVideo(image, fields) {
  // Modifier dans le dossier
  const newPath = path.join(thumbnailsFolderPath, image.newFilename);
  await insertVideo(image.newFilename, fields);
  return newPath;
}

async function insertVideo(image, fields) {
  const { title, desc, cat, id } = fields;
  try {
    // Exécutez la requête SQL pour insérer une vidéo dans la base de données
    const rows = await executeQuery('CALL editPost(?,?,?,?,?)', [title, image, desc, cat, id]);
    // Autres opérations après l'insertion de la vidéo
  } catch (error) {
    console.error(error);
    // Gérer l'erreur ici
    throw error; // Propager l'erreur pour que Promise.all le capture
  }
}
