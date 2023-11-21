import bcrypt from 'bcryptjs/dist/bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { transporter } from "@/Config/Email";
import * as z from 'zod'
import executeQuery from "@/Config/db4";

const registerValidator=z.object({
  userName:z
    .string()
    .min(3,{
      message:'le nom  doit être supérieur ou égal à 3 caractères'
    })
    .max(15,{
      message:'le nom ne doit pas être supérieur à 15 caractères'
    }),
    userPrenom:z
    .string()
    .min(3,{
      message:'le prénom doit être supérieur ou égal à 3 caractères'
    })
    .max(15,{
      message:'le prénom ne doit pas être supérieur à 15 caractères'
    }),
    userMail:z
    .string()
    .email({
      message:'saisissez un email valide'
    }),
    userPassword:z
    .string()
    .min(7,{
      message:'le mot de passe doit être supérieur ou égal à 7 caractères'
    })
    .max(15,{
      message:'le mot de passe ne doit pas être supérieur à 15 caractères'
    })
   })
   
   

export default async function handler(req, res) {
    
    if(req.method==="POST"){
      async function checkEmailUniqueness(email) {
        // Vérifier si l'email est unique dans la base de données
        try {
           // Exécuter la requête SQL pour récupérer les videos
           const rows = await executeQuery( `SELECT * FROM users WHERE Mail=? `, [email]);
    
           // Retourner true si l'email est unique, false sinon
           let mess=""
           console.log('user:',rows)
           if(rows[0]==null){
            mess="true"
            console.log("2:MAil n'existe pas")
            return mess
           }
           else{
            mess="false"
            console.log('user:',rows[0])
            console.log("1:MAil existe")
            }
        } catch (error) {
          console.log('error in sql for checking Mail',error)
        }
      }
      try {
        const userName=req.body.nom
        const userPrenom=req.body.prenom
        const userMail=req.body.mail
        const userPassword=req.body.password
        const uniid = uuidv4()
        const uName=userName+' '+userPrenom

        const isUnique=await checkEmailUniqueness(userMail);
        if(isUnique!=="true"){  
        res.status(402).json({response:{data:'errorMail',message:'cet email est déjà utilisé avec un  utre utilisateur.'}});
        }
        else{
          const saltrounds=10
          const salt=await bcrypt.genSalt(saltrounds)
          const hashedPassword=await bcrypt.hash(userPassword,salt)
          try {
            // Exécuter la requête SQL pour récupérer les videos
            const rows = await executeQuery( `CALL adduser(?,?,?,?)`, [uniid,uName,userMail,hashedPassword]);

            //Envoie d'Email pour la validation du compte
            const mailOptions = {
              from: 'teramaflix@gmail.com',
              to: userMail,
              subject: 'Validation de votre compte',
              html: `Hello ${userName} ${userPrenom} ,<br><br>Thanks your account created successfully<br>
                    Please click the below link to activate your account<br><br>"<br><a href="${process.env.NEXT_PUBLIC_URL}/activate?uniid=${uniid}">
                    <button style="
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    font-size: 16px;
                    border: none;
                    cursor: pointer;">Activer Maintenant</button></a>`
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('E-mail envoyé: ' + info.response);
              }
            });

            // Renvoyer les résultats de la requête sous forme de réponse JSON
            res.status(200).json({response:{data:rows[0],message:'success'}})
          } catch (error) {
            console.error(error);
            res.status(500).json({response:{data:"sqlError",dat:error,message: 'Erreur lors de l\'insertion à la base de données.'} });
          }
        }  
    }catch (error) {
      res.status(401).json({response:{data:error,message:'validationError'}});
    }
  }
}