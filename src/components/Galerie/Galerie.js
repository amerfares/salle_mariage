import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { Grid, Typography, Container } from '@mui/material';

const Galerie = () => {
  const [liens, setLiens] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/galerie-lien')
      .then(response => {
        setLiens(response.data.liens);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des liens:', error);
      });
  }, []);

  useEffect(() => {
    const imagesArray = liens.map(lien => ({
      src: `Image/${lien}`,
    }));
    setImages(imagesArray);
  }, [liens]);

  return (
    <div>
      <Container maxWidth="md">
        {/* Présentation de la salle */}
        <Typography variant="h4" align="center" gutterBottom>
          Bienvenue dans notre Salle de Mariage
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Découvrez notre espace élégant et romantique, parfait pour célébrer
          votre mariage avec style. Parcourez les photos ci-dessous pour avoir
          un aperçu de notre magnifique salle.
        </Typography>

        {/* Carrousel d'images */}
        <Grid container justifyContent="center">
          <Grid item xs={12} md={12} lg={12}>
            <Carousel images={images} autoPlayInterval={3000} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Galerie;
