import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';

const AvisGrid = ({ avisList }) => {
  return (
    <Grid container spacing={2}>
      {avisList.map((avis) => (
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
    </Grid>
  );
};

export default AvisGrid;
