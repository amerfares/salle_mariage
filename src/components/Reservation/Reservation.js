import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Grid, Typography, Button,Box, TextField } from '@mui/material';
import { format, startOfDay, addHours } from 'date-fns';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';


function Reservation() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: ''
  });
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  

  useEffect(() => {
    async function fetchReservations() {
      try {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const response = await axios.get(`http://localhost:5000/reservations/date/${formattedDate}`);
        setReservations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
      }
    }

    fetchReservations();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when changing the date
  };

  const availableSlots = [];
  const start = startOfDay(selectedDate);
  for (let i = 9; i <= 17; i++) {
    const slotStart = addHours(start, i);
    availableSlots.push(slotStart);
  }

  const filteredSlots = availableSlots.filter((slot) => {
    const slotHour = slot.getHours();
    return !reservations.some((reservation) => {
      const reservationDate = new Date(reservation.date);
      const reservationHour = reservationDate.getHours();
      return slotHour === reservationHour;
    });
  });

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Créer un objet de réservation avec les données du formulaire et le créneau sélectionné
    const reservationData = {
      user_nom: formData.lastName,
      user_prenom: formData.firstName,
      user_phone: formData.phoneNumber,
      user_email: formData.emailAddress,
      date: format(selectedSlot, 'yyyy-MM-dd HH:mm:ss') // Format au format datetime
    };
  
    try {
      // Effectuer une requête POST pour enregistrer la réservation dans la base de données
      console.log(reservationData)
      const response = await axios.post('http://localhost:5000/reservations/create', reservationData);
      console.log('Réservation enregistrée :', response.data);
      setShowConfirmationDialog(true);
  setConfirmationMessage('Votre réservation a été enregistrée avec succès!');
  
  // Réinitialiser le formulaire et le créneau sélectionné
  setFormData({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: ''
  });
  setSelectedSlot(null);
} catch (error) {
  console.error('Erreur lors de l\'enregistrement de la réservation :', error);
  
  // Afficher le dialogue d'erreur
  setShowConfirmationDialog(true);
  setConfirmationMessage('Une erreur est survenue. Veuillez réessayer.');
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
        <div className="time-slots">
          <Typography variant="h6">Créneaux disponibles pour {format(selectedDate, 'dd/MM/yyyy')}</Typography>
          {filteredSlots.map((slot, index) => (
            <Button
              key={index}
              variant={selectedSlot === slot ? 'contained' : 'outlined'}
              className="slot-button"
              onClick={() => handleSlotClick(slot)}
            >
              {format(slot, 'HH:mm')}
            </Button>
          ))}
          {selectedSlot && (
            <form onSubmit={handleFormSubmit}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                required
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleFormChange}
                required
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleFormChange}
                required
              />
              <TextField
                label="Email Address"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleFormChange}
                required
                type="email"
              />
              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">
                  Réserver
                </Button>
              </Box>
            </form>
          )}
        </div>
      </Grid>
      
    </Grid>

    
  );
}

export default Reservation;
