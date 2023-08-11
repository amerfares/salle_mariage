import React from 'react';
import APropos from '../APropos/APropos';
import Services from '../Services/Services';
import Tarifs from '../Tarifs/Tarifs';
import BestAvisGrid from '../Avis/BestAvisGrid'; // Assurez-vous d'importer correctement le composant BestAvisGrid
import Disponibilites from '../Disponibilites/Disponibilites';
import Contact from '../Contact/Contact';
import Acces from '../Acces/Acces';
import { Typography, Container, Box, Button } from '@mui/material';


const Home = () => {
  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" mt={4} mb={2}>
          Bienvenue sur notre page d'accueil
        </Typography>
        
        <APropos />
        <Services />
        <Tarifs />

        <Box my={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Avis de nos clients
          </Typography>
          <BestAvisGrid /> 
          

        </Box>

        <Disponibilites />
        <Acces />
      </Container>
    </div>
  );
};

export default Home;
