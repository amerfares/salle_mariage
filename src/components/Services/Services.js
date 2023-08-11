import React from 'react';
import { Grid, Typography, Container, Paper, Box } from '@mui/material';

const Service = () => {
  const services = [
    {
      title: 'Décoration Personnalisée',
      description: 'Créez une ambiance unique avec notre service de décoration personnalisée.',
    },
    {
      title: 'Catering de Luxe',
      description: 'Dégustez des plats raffinés préparés par nos chefs talentueux.',
    },
    {
      title: 'Planification Expertise',
      description: 'Profitez d\'une planification de mariage sans stress avec notre équipe d\'experts.',
    },
  ];

  return (
    <Box py={4} bgcolor="#f9f9f9">
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Nos Services Exceptionnels
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Nous sommes dédiés à rendre votre mariage parfait. Découvrez nos services
          qui vous aideront à créer un événement inoubliable.
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {services.map(service => (
            <Grid item xs={12} sm={6} md={4} key={service.title}>
              <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Service;
