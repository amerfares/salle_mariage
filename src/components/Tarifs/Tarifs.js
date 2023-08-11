import React from 'react';
import { Grid, Typography, Container, Paper, Box } from '@mui/material';

const Tarifs = () => {
  const forfaits = [
    {
      title: 'Forfait Premium',
      description: 'Inclut la décoration personnalisée, le catering de luxe et la planification experte.',
      price: '$5000',
    },
    {
      title: 'Forfait Élégance',
      description: 'Inclut la décoration élégante, le catering de qualité et la coordination du jour J.',
      price: '$3500',
    },
    {
      title: 'Forfait Classique',
      description: 'Inclut la décoration de base, un menu varié et l\'assistance à la cérémonie.',
      price: '$2500',
    },
  ];

  return (
    <Box py={4} bgcolor="#f0f0f0">
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Forfaits et Tarifs
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Découvrez nos forfaits spécialement conçus pour répondre à vos besoins et à votre budget.
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {forfaits.map(forfait => (
            <Grid item xs={12} sm={6} md={4} key={forfait.title}>
              <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  {forfait.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {forfait.description}
                </Typography>
                <Typography variant="h5" color="primary">
                  {forfait.price}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Tarifs;
