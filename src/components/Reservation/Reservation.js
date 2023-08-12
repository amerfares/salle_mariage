import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Grid, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import './Reservation.css';
import axios from 'axios';

function Reservation() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await axios.get('http://localhost:5000/reservations'); // Assurez-vous d'utiliser la bonne URL
        setReservations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
      }
    }

    fetchReservations();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Vous devrez ajouter ici la logique pour récupérer les réservations de votre backend en fonction de la date
    // Par exemple, vous pourriez appeler une fonction fetchReservations(date) pour récupérer les réservations pour la date sélectionnée
    // Puis, vous mettez à jour l'état reservations avec les réservations récupérées
  };

  const handleDeleteReservation = async (id,user_email) => {
    try {
      await axios.delete(`http://localhost:5000/reservations/delete/${id,user_email}`);
      // Mettez à jour la liste des réservations en excluant la réservation supprimée
      setReservations(reservations.filter(res => res.id !== id)); // Utilisation de 'res' au lieu de 'reservation'
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation :', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={new Date()}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <div className="reservation-table">
          <Typography variant="h6">Réservations pour {selectedDate.toLocaleDateString()}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Heure</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell></TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>
                      {reservation.date && new Date(reservation.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                    <TableCell>{reservation.user_nom}</TableCell>
                    <TableCell>{reservation.user_prenom}</TableCell>
                    <TableCell>{reservation.user_email}</TableCell>
                    <TableCell>{reservation.user_phone}</TableCell>
                    <TableCell>
                  <DeleteIcon onClick={() => handleDeleteReservation(reservation.id)} />
                </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </div>
      </Grid>
    </Grid>
  );
}

export default Reservation;
