import React from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';


const Contact = () => {


  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pouvez mettre la logique pour envoyer le formulaire
  };

  return (
    <div classname="container">
       <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" align="center">
              Contactez-nous
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Prénom"
                    placeholder="Prénom"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    label="Nom"
                    placeholder="Nom"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    label="Adresse e-mail"
                    placeholder="Adresse e-mail"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="tel"
                    label="Numéro de téléphone"
                    placeholder="Numéro de téléphone"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Sujet du message"
                    placeholder="Sujet du message"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    multiline
                    rows={4}
                    placeholder="Tapez votre message ici"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Envoyer
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>

    </div>
  )
};

export default Contact;
