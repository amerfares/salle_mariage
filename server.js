const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000;
const cors = require('cors'); // Importez le module cors
const nodemailer = require("nodemailer");
require('dotenv').config();



app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost', // Remplacez localhost par l'hôte de votre base de données MySQL
  user: 'root',
  password: '',
  database: 'salle_mariage'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données:', err);
  } else {
    console.log('Connexion à la base de données réussie');
  }
});

// Endpoint pour récupérer les liens depuis la base de données
app.get('/api/galerie-lien', (req, res) => {
  const sql = 'SELECT lien FROM galerie ORDER BY Ordre';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    } else {
      const liens = result.map(item => item.lien);
      res.json({ liens });
    }
  });
});

app.get('/api/galerie', (req, res) => {
  const sql = 'SELECT * FROM galerie ORDER BY Ordre';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erreur de requête SQL:', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    } else {
      res.json(result); // Retourne toutes les lignes de la table "galerie"
    }
  });
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Image'); // Chemin où stocker les images
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Utilise le nom original du fichier
  },
});


const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    const imageName = req.file.filename; // Obtient le nom de l'image enregistrée

    // Ajoutez le nom de l'image dans la base de données
    const sql = 'INSERT INTO galerie (lien) VALUES (?)';
    db.query(sql, [imageName], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'ajout du lien dans la base de données :', err);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du lien dans la base de données' });
      } else {
        console.log('Lien ajouté avec succès dans la base de données');
        res.json({ message: 'Image ajoutée avec succès' });
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'upload :', error);
    res.status(500).json({ error: 'Erreur lors de l\'upload' });
  }
});

// Endpoint pour mettre à jour l'ordre d'une image dans la base de données
app.put('/api/galerie/:id', (req, res) => {
  const { id } = req.params;
  const { Ordre } = req.body;

  // Vérifier si l'ordre existe déjà
  const checkExistingOrderSql = 'SELECT id FROM galerie WHERE Ordre = ? AND id != ?';
  db.query(checkExistingOrderSql, [Ordre, id], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Erreur lors de la vérification de l\'ordre existant :', checkErr);
      res.status(500).json({ error: 'Erreur lors de la vérification de l\'ordre existant' });
      return;
    }

    if (checkResult.length > 0) {
      // L'ordre existe déjà, renvoyer une alerte
      res.status(400).json({ error: 'Modification impossible, ce rang est déjà pris!' });
      return;
    }

    // Mettre à jour l'ordre dans la base de données
    const updateOrderSql = 'UPDATE galerie SET Ordre = ? WHERE id = ?';
    db.query(updateOrderSql, [Ordre, id], (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Erreur lors de la mise à jour de l\'ordre dans la base de données :', updateErr);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'ordre dans la base de données' });
      } else {
        console.log('Ordre mis à jour avec succès dans la base de données');
        res.json({ message: 'Ordre mis à jour avec succès' });
      }
    });
  });
});


// Endpoint pour supprimer une photo de la galerie
app.delete('/api/galerie-delete/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;

    // Récupérer le lien de la photo depuis la base de données
    const lienQuery = "SELECT lien FROM galerie WHERE id=?";
    db.query(lienQuery, [itemId], async (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération du lien de la photo :', error);
        return res.status(500).json({ error: 'Erreur lors de la suppression de la photo.' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'L\'élément de la galerie n\'existe pas.' });
      }

      const photoLien = results[0].lien;

      // Supprimer la photo du dossier public/Image
      const photoPath = path.join(__dirname, 'public/Image', photoLien);
      fs.promises.unlink(photoPath);

      // Supprimer la photo de la base de données
      const deleteQuery = "DELETE FROM galerie WHERE id=?";
      db.query(deleteQuery, [itemId], async (error, result) => {
        if (error) {
          console.error('Erreur lors de la suppression de l\'élément de la galerie :', error);
          return res.status(500).json({ error: 'Erreur lors de la suppression de la photo.' });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'L\'élément de la galerie n\'existe pas.' });
        }

        // Suppression réussie, renvoyer une réponse
        res.json({ message: 'Photo supprimée avec succès.' });
      });
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la photo :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la photo.' });
  }
});




// Configuration de Nodemailer

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.REACT_APP_EMAIL_ADMIN,
    pass: process.env.REACT_APP_PASSWORD_ADMIN,
  },
});

app.post("/api/send-email", async (req, res) => {
  console.log(process.env.REACT_APP_EMAIL_ADMIN)
  const { user_name, user_last_name, user_email, user_phone_number, message_subject, message } = req.body;
  
  const mailOptions = {
    from: process.env.REACT_APP_EMAIL_ADMIN,
    to: process.env.REACT_APP_EMAIL_ADMIN,
    subject: "CONTACT VIA VOTRE SITE :" + message_subject,
    text: `De: ${user_name} ${user_last_name}\nE-mail: ${user_email}\nTéléphone: ${user_phone_number}\n\nMessage: ${message}`,
  
  };


    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail d\'expédition:', error);
        // Vous pouvez choisir de continuer même en cas d'erreur ici, car la commande a déjà été confirmée avec l'e-mail précédent.
      }

    });
  })



app.get('/api/avis', async (req, res) => {
  try {
    const selectAvis = 'SELECT etoiles, nom, prenom, avis FROM avis';
    db.query(selectAvis, (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération des avis:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des avis.' });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des avis:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des avis.' });
  }
});


app.post('/api/avis', async (req, res) => {
  try {
    const { nom, prenom, avis, etoiles } = req.body;

    const insertAvis = 'INSERT INTO avis (nom, prenom, avis, etoiles) VALUES (?, ?, ?, ?)';
    db.query(insertAvis, [nom, prenom, avis, etoiles], (error, result) => {
      if (error) {
        console.error('Erreur lors de l\'enregistrement de l\'avis:', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'avis.' });
      } else {
        res.json({ message: 'Avis enregistré avec succès !' });
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'avis:', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'avis.' });
  }
});

// Endpoint pour récupérer les avis avec best=true
app.get('/api/avis/best', (req, res) => {
  const query = 'SELECT * FROM avis WHERE best = true';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des avis:', err);
      res.status(500).json({ message: 'Erreur lors de la récupération des avis' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint pour récupérer les réservations
app.get('/reservations', (err, res) => {
  const query='SELECT id, user_nom, user_prenom, user_phone, user_email, date FROM reservation';
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupérations des réservations", err);
    }  
    else {
      res.json(results);
      console.log("Récupération ok!")
    }
  });
})


app.delete('/reservations/delete/:id', (req, res) => {
  const reservationId = req.params.id;

  db.query('SELECT user_email, date FROM reservation WHERE id = ?', [reservationId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de la réservation pour l'envoi de l'e-mail :", err);
      res.status(500).json({ error: "Erreur lors de la récupération de la réservation pour l'envoi de l'e-mail" });
    } else {
      const user_email = results[0].user_email;
      const date = new Date(results[0].date).toLocaleDateString();

      const query = 'DELETE FROM reservation WHERE id = ?';
      db.query(query, [reservationId], (deleteErr, result) => {
        if (deleteErr) {
          console.error("Erreur lors de la suppression de la réservation :", deleteErr);
          res.status(500).json({ error: "Erreur lors de la suppression de la réservation" });
        } else {
          const mailOptions = {
            from: process.env.REACT_APP_EMAIL_ADMIN,
            to: user_email,
            subject: "ANNULATION RDV AVEC VOILIER91 : "  + date ,
            text: `Votre rendez-vous pour le ${date} a été annulé.`
          };

          transporter.sendMail(mailOptions, (emailError) => {
            if (emailError) {
              console.error('Erreur lors de l\'envoi de l\'e-mail d\'expédition:', emailError);
            }
          });
          res.json({ message: "Réservation supprimée avec succès !" });
        }
      });
    }
  });
});


// Endpoint pour récupérer les réservations pour une date donnée
app.get('/reservations/date/:date', (req, res) => {
  const selectedDate = req.params.date;
  const query = 'SELECT id, user_nom, user_prenom, user_phone, user_email, date FROM reservation WHERE DATE(date) = ?';
  
  db.query(query, [selectedDate], (err, results) => {
    console.log(selectedDate);
    if (err) {
      console.error("Erreur lors de la récupération des réservations pour la date donnée", err);
      res.status(500).json({ error: "Erreur lors de la récupération des réservations pour la date donnée" });
    } else {
      res.json(results);
      console.log("Réservations pour la date donnée récupérées avec succès !");
    }
  });
});

// Définir les routes ou d'autres configurations ici

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
