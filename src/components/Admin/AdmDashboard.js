//AdminDashboard.js

import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';


const AdmDashboard = () => {
  return (
    <Container maxWidth="lg" sx={{marginBottom:"10%"}}>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>Tableau de bord administrateur</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box p={2} border="1px solid #ccc" borderRadius="4px">
              <Typography variant="h6" gutterBottom>Gérer ma galerie</Typography>
              <Typography variant="body1" gutterBottom>Ajoutez ou l'ordre des photos.</Typography>
              <Link href="/adm/galerie" variant="contained" underline="none" color="secondary">Accéder</Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdmDashboard;