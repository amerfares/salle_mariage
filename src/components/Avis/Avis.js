import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Box, TextField, Button, IconButton, Grid } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';

const Avis = () => {
  const [etoiles, setEtoiles] = useState(0);
  const [codeAvis, setCodeAvis] = useState('');
  const [codeValide, setCodeValide] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [avis, setAvis] = useState('');
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  const handleStarClick = (starCount) => {
    setEtoiles(starCount);
  };

  const handleSubmitAvis = async (event) => {
    event.preventDefault();

    if (codeAvis === process.env.REACT_APP_CODE_AVIS) {
      try {
        const response = await axios.post('http://localhost:5000/api/avis', {
          nom,
          prenom,
          avis,
          etoiles,
        });
        if (response.data) {
          // Réinitialiser le formulaire
          setNom('');
          setPrenom('');
          setAvis('');
          setEtoiles(0);
          setCodeValide(false);
          setCodeAvis('');
        }
        if (response.data.message === 'Avis enregistré avec succès !') {
          console.log('Avis enregistré avec succès !');
          setAfficherFormulaire(false);
        }
      } catch (error) {
        console.error('Erreur lors de la soumission de l\'avis:', error);
      }
    } else {
      console.log('Code d\'avis invalide');
    }
  };

  const handleCodeAvisChange = (event) => {
    const enteredCode = event.target.value;

    if (enteredCode === process.env.REACT_APP_CODE_AVIS) {
      console.log('Code is Valid');
      setCodeValide(true);
    } else {
      console.log('Code is Invalid');
      setCodeValide(false);
    }
    setCodeAvis(enteredCode);
  };

  return (
    <Box py={4} bgcolor="#f9f9f9">
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Laissez votre avis
        </Typography>

        {!afficherFormulaire ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAfficherFormulaire(true)}
          >
            Laisser un avis
          </Button>
        ) : null}

        {afficherFormulaire && (
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <form onSubmit={handleSubmitAvis}>
            <TextField
              label="Code d'avis"
              fullWidth
              variant="outlined"
              value={codeAvis}
              onChange={handleCodeAvisChange}
              margin="normal"
              required
            />
            {codeValide ? (
              <Typography variant="caption" color="success">
                Code valide
              </Typography>
            ) : (
              <Typography variant="caption" color="error">
                Code invalide
              </Typography>
            )}
            <TextField
              label="Votre nom"
              fullWidth
              variant="outlined"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Votre prénom"
              fullWidth
              variant="outlined"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Votre avis"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={avis}
              onChange={(e) => setAvis(e.target.value)}
              margin="normal"
              required
            />
            <Typography variant="subtitle2">Votre évaluation:</Typography>
            <Box>
              {[1, 2, 3, 4, 5].map((star) => (
                <IconButton
                  key={star}
                  color={etoiles >= star ? 'primary' : 'default'}
                  onClick={() => handleStarClick(star)}
                >
                  <StarsIcon />
                </IconButton>
              ))}
            </Box>
            <Grid container justifyContent="space-between">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Soumettre
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setAfficherFormulaire(false);
                    setNom('');
                    setPrenom('');
                    setAvis('');
                    setEtoiles(0);
                    setCodeValide(false);
                    setCodeAvis('');
                  }}
                >
                  Annuler
                </Button>
              </Grid>
            </form>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Avis;
