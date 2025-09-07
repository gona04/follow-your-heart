import React, { useState, useEffect } from 'react';
import './home-page.styles.css';

const images = [
  '/images/beach1.jpg',
  '/images/beach2.jpg',
  '/images/image10.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
  '/images/image5.jpg',
  '/images/image6.jpg',
  '/images/image7.jpg',
  '/images/image8.jpg',
  '/images/jungle2.jpeg',
];

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [typedHeading, setTypedHeading] = useState('');
  const [typedSubheading, setTypedSubheading] = useState('');

  const headingText = "Foollow Your Heart".trim();
  const subheadingText = "Arre you a beach person, mountain person, jungle person or...? ".trim();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTypedHeading('');
    setTypedSubheading('');
    let hIndex = 0;
    let sIndex = 0;
    let headingTypingInterval;
    let subheadingTypingInterval;
  
    const startHeadingTyping = () => {
      headingTypingInterval = setInterval(() => {
        if (hIndex < headingText.length) {
          setTypedHeading((prev) => prev + headingText.charAt(hIndex));
          hIndex++;
        } else {
          clearInterval(headingTypingInterval);
          startSubheadingTyping();
        }
      }, 100);
    };
  
    const startSubheadingTyping = () => {
      subheadingTypingInterval = setInterval(() => {
        if (sIndex < subheadingText.length) {
          setTypedSubheading((prev) => prev + subheadingText.charAt(sIndex));
          sIndex++;
        } else {
          clearInterval(subheadingTypingInterval);
        }
      }, 70);
    };
  
    startHeadingTyping();
  
    return () => {
      clearInterval(headingTypingInterval);
      clearInterval(subheadingTypingInterval);
    };
  }, []);    // Dependencies for re-running effect

  return (
    <div className="carousel-container">
      <div
        className="carousel-slide"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          opacity: 1,
        }}
      >
        <div className="image-overlay"></div>
      </div>
      <div className="content">
        <h1>{typedHeading}{typedHeading.length === headingText.length ? null : <span className="cursor"></span>}</h1>
        <h2>{typedSubheading}{typedSubheading.length === subheadingText.length ? null : <span className="cursor"></span>}</h2>
        <div className="buttons-container">
          <button className="dream-button">Draw my dream destination</button>
          <button className="dream-button">Describe my dream destination</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
