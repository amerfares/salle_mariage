import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Button, TextField, InputAdornment, Box } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Galerie.css';

const Galerie = () => {
  const [liens, setLiens] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/galerie-lien')
      .then(response => {
        setLiens(response.data.liens);
        console.log(liens)
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des liens:', error);
      });
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <div>
        <div className="next-slick-arrow"> <ArrowCircleRightIcon/> </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className="prev-slick-arrow"> <ArrowCircleLeftIcon /> </div>
      </div>
    )
  };


  //AUTOMATISE LA RECUPERATION DES IMAGES PUIS FAIRE UN THUMBNAIL
  const thumbnailSettings = {
    slidesToShow: 9,
    slidesToScroll: 2,
    asNavFor: ".slider-for",
    swipeToSlide: true,
    focusOnSelect: true,
  };


  

  return (
    <div className='container'>
      <Slider {...settings}>
      {liens.map((lien, index) => (
          <div key={index}>
            <img src={"Image/" + lien} alt={`Image ${index}`} />
          </div>
        ))}
      </Slider>

    </div>
    
    
  );
};

export default Galerie;
