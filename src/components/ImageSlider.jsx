import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

/* Animación de las imágenes */
const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="slider-container">
      {images.length > 0 && (
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="slider-image"
        />
      )}
    </div>
  );
};

export default ImageSlider;
