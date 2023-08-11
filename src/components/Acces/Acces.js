import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Acces = () => {
  const [destination, setDestination] = useState('');
  const weddingVenueAddress = "6 Rte des Loges, 91180 Saint-Germain-lès-Arpajon";

  const handleFindRoute = () => {
    if (destination.trim() !== '') {
      // Ouvrir Google Maps avec l'itinéraire
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(destination)}&destination=${encodeURIComponent(weddingVenueAddress)}`;
      window.open(mapsUrl, "_blank");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Accès et Itinéraire
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Utilisez le formulaire ci-dessous pour trouver l'itinéraire jusqu'à notre salle de mariage.
      </Typography>

      <TextField
        label="Votre adresse"
        fullWidth
        variant="outlined"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        margin="normal"
      />

        <Box textAlign="center" mt={2}> {/* Centrer le bouton */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleFindRoute}
          >
            Trouver l'itinéraire
          </Button>
        </Box>
    </Container>
  );
};

export default Acces;
