import React,  { useState }  from 'react'
import emailjs from 'emailjs-com';
import axios from 'axios'; 

import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';

const Contact = () => {
  
  
  //const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  //const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  //const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;


  const [formData, setFormData] = useState({
    user_name: '',
    user_last_name: '',
    user_email: '',
    user_phone_number: '',
    message_subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const response = axios.post('http://localhost:5000/api/send-email', formData);
      console.log("E-mail envoyé avec succès !");
      // Ajoutez ici la logique pour afficher un message de succès à l'utilisateur
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
      // Ajoutez ici la logique pour afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <div className="container">
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
                    name="user_name"
                    label="Prénom"
                    placeholder="Prénom"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
