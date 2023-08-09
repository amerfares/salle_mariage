const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 5000;
const cors = require('cors'); // Importez le module cors

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



// Définir les routes ou d'autres configurations ici

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
