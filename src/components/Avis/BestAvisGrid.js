import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarsIcon from '@mui/icons-material/Stars';
import { Link as RouterLink } from 'react-router-dom';

const BestAvisGrid = () => {
  const [bestAvisList, setBestAvisList] = useState([]);

  useEffect(() => {
    fetchBestAvisList();
  }, []);

  const fetchBestAvisList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/avis/best');
      setBestAvisList(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des meilleurs avis:', error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ margin: '0 auto' }}>
        <Slider {...settings}>
          {bestAvisList.map((avis) => (
            <Grid item xs={12} key={avis.id}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="subtitle1" gutterBottom>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarsIcon
                    key={index}
                    sx={{ color: index < avis.etoiles ? '#EFC443' : 'rgba(0, 0, 0, 0.54)' }}
                  />
                  ))}
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  {avis.nom.toUpperCase()} {avis.prenom}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {avis.avis}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Slider>
      </Grid>
      <Grid item xs={12} style={{ marginTop: '16px', textAlign: 'center' }}>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/avis"
        >
          Ecrire ou voir plus d'avis
        </Button>
      </Grid>
    </Grid>
  );
};

export default BestAvisGrid;
