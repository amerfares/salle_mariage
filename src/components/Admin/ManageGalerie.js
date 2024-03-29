import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Alert
  } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

function ManageGalerie() {
    const [galleryData, setGalleryData] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [editOrder, setEditOrder] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        fetchGalleryData();
      }, []);

      const fetchGalleryData = () => {
        axios.get('http://localhost:5000/api/galerie')
          .then((response) => {
            setGalleryData(response.data);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des données de la galerie :', error);
          });
      };
  
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = async () => {
        if (selectedFile) {
          const formData = new FormData();
          formData.append('image', selectedFile);
      
          try {
            const response = await fetch('http://localhost:5000/api/upload', {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              console.log('Image ajoutée avec succès.');
              // Vous pouvez effectuer des actions supplémentaires ici si nécessaire
            } else {
              console.error('Erreur lors de l\'ajout de l\'image.');
            }
          } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'image :', error);
          }
        }
      };

      const handleEditOrder = (itemId, currentOrder) => {
        setEditItemId(itemId);
        setEditOrder(currentOrder);
        setAlertMessage('');
        setAlertSeverity('success');
      };
    
      const handleSaveOrder = async (itemId) => {
        if (editOrder === '') {
          setAlertMessage('Veuillez entrer un nouvel ordre.');
          setAlertSeverity('error');
          return;
        }
    
        try {
          const response = await axios.put(`http://localhost:5000/api/galerie/${itemId}`, {
            Ordre: editOrder,
          });
    
          if (response.data.message) {
            setAlertMessage('Ordre mis à jour avec succès.');
            setAlertSeverity('success');
            setTimeout(() => {
              setAlertMessage('');
            }, 10000); // Masquer l'alerte après 10 secondes
            setEditItemId(null);
            fetchGalleryData();
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.error) {
            setAlertMessage(error.response.data.error);
          } else {
            setAlertMessage('Erreur lors de la mise à jour de l\'ordre.');
          }
          setAlertSeverity('error');
        }
      };


      const handleDeleteConfirmation = (itemId) => {
        setDeleteItemId(itemId);
        setDeleteDialogOpen(true);
      };
    
      const handleDeletePhoto = async (itemId) => {
        console.log(itemId)
        try {
          const response = await axios.delete(`http://localhost:5000/api/galerie-delete/${itemId}`);
    
          if (response.data.message) {
            // Suppression réussie, mettre à jour la liste
            fetchGalleryData();
            setAlertSeverity('success');
            setAlertMessage('Photo supprimée avec succès.');
          }
        } catch (error) {
          setAlertSeverity('error');
          setAlertMessage('Erreur lors de la suppression de la photo.');
        }
        setDeleteDialogOpen(false);
        setDeleteItemId(null);
      };
      
  
    return (
      <div>
        <h1>Gérer ma galerie</h1>
        <h2>Ajouter une image</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Ajouter l'image
        </Button>
        <div>
        <h2>Gérer la galerie</h2>
        {alertMessage && (
        <Alert severity={alertSeverity} onClose={() => setAlertMessage('')}>
          {alertMessage}
        </Alert>
      )}
      <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ordre</TableCell>
              <TableCell>Image</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {galleryData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {editItemId === item.id ? (
                    <TextField
                      value={editOrder}
                      onChange={(e) => setEditOrder(e.target.value)}
                    />
                  ) : (
                    item.Ordre
                  )}
                </TableCell>
                <TableCell>{item.lien}</TableCell>
                <TableCell>
                  {editItemId === item.id ? (
                    <>
                      <IconButton onClick={() => handleSaveOrder(item.id)}>
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditItemId(null)}>
                        <CloseIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={() => handleEditOrder(item.id, item.Ordre)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton onClick={() => handleDeleteConfirmation(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmation de la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cette photo ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={() => handleDeletePhoto(deleteItemId)} color="primary">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
      </div>
      
    );
  }

export default ManageGalerie;