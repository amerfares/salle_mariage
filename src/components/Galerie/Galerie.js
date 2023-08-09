import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Galerie.css';

const Galerie = () => {
  const [liens, setLiens] = useState([]);
  const [slider1, setSlider1] = useState(null);
  const thumbnailSliderRef = useRef(null); // Référence du carrousel de miniatures

  useEffect(() => {
    axios.get('http://localhost:5000/api/galerie-lien')
      .then(response => {
        setLiens(response.data.liens);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des liens:', error);
      });
  }, []);

  useEffect(() => {
    if (slider1) {
      setSlider1(slider1);
    }
  }, [slider1]);

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

  const thumbnailSettings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    asNavFor: slider1,
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

  const handleThumbnailClick = (index) => {
    if (thumbnailSliderRef.current) {
      thumbnailSliderRef.current.slickGoTo(index);
    }
  };

  return (
    <div>
      <div className='container'>
        <Slider {...settings} ref={(slider) => setSlider1(slider)} className="slider-for">
          {liens.map((lien, index) => (
            <div key={index} className='image'>
              <img src={"Image/" + lien} alt={`Image ${index}`} />
            </div>
          ))}
        </Slider>
      </div>

      <div className='thumbnail-container'>
        <div className="thumbnail-nav">
          <Slider {...thumbnailSettings} ref={thumbnailSliderRef} className='thumbnail-slider'>
            {liens.map((lien, index) => (
              <div key={index} className='thumbnail' onClick={() => handleThumbnailClick(index)}>
                <img src={"Image/" + lien} alt={`Thumbnail ${index}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Galerie;
