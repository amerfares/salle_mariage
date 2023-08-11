import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const APropos = () => {
  return (
    <Box py={4} bgcolor="#f0f0f0">
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          À Propos de Notre Salle de Mariage
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Nous sommes ravis de vous accueillir dans notre magnifique salle de mariage.
          Avec une histoire riche et une ambiance élégante, nous créons des souvenirs
          inoubliables pour chaque couple.
        </Typography>

        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Nos Services
          </Typography>
          <Typography variant="body2">
            De la décoration personnalisée à la planification experte, nous offrons
            une gamme complète de services pour rendre votre journée spéciale.
          </Typography>
        </Paper>

        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Notre Engagement
          </Typography>
          <Typography variant="body2">
            Notre équipe dévouée est déterminée à créer une expérience de mariage
            exceptionnelle pour vous et vos invités. Nous sommes là à chaque étape
            pour vous guider dans la réalisation de votre vision.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default APropos;