import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link,NavLink } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };



  return (

      <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <NavLink  to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h6" component="div">
              Home
            </Typography>
        </NavLink>
        <div style={{ flexGrow: 1 }} /> {/* Cet espace flexible pousse le bouton à droite */}
        <Button component={Link} to="/reservation" color="inherit">
          Réserver
        </Button>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
          <MenuItem component={NavLink} to="/galerie" onClick={handleMenuClose}>Galerie</MenuItem>
          <MenuItem component={NavLink} to="/a-propos" onClick={handleMenuClose}>A propos de la salle</MenuItem>
          <MenuItem component={NavLink} to="/nos-services" onClick={handleMenuClose}>Nos services</MenuItem>
          <MenuItem component={NavLink} to="/tarifs" onClick={handleMenuClose}>Forfaits et tarifs</MenuItem>
          <MenuItem component={NavLink} to="/temoignage-avis" onClick={handleMenuClose}>Témoignage et avis</MenuItem>
          <MenuItem component={NavLink} to="/disponibilites" onClick={handleMenuClose}>Nos disponibilités</MenuItem>
          <MenuItem component={NavLink} to="/contact" onClick={handleMenuClose}>Nous contacter</MenuItem>
          <MenuItem component={NavLink} to="/acces" onClick={handleMenuClose}>Plan d'accès</MenuItem>
        </Menu>
    </AppBar>
  );
};

export default Navbar;