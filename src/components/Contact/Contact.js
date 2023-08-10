import React, { useRef } from 'react'
import emailjs from 'emailjs-com';

import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';


const Contact = () => {
  const form = useRef();
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;



  const handleSubmit = (e) => {
    e.preventDefault();
    

    emailjs.sendForm(serviceId, templateId , form.current, publicKey)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
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
            <form ref={form} onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="user_name"
                    label="Prénom"
                    placeholder="Prénom"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField
                    name="user_last_name"
                    label="Nom"
                    placeholder="Nom"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="user_email"
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
                    name="user_phone_number"
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
                    name="message_subject"
                    label="Sujet du message"
                    placeholder="Sujet du message"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="message"
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
