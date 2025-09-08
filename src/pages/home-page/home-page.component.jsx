import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextImage } from '../../store/carouselSlice';
import './home-page.styles.css';
import { resetTyping, typeHeadingChar, typeSubheadingChar } from '../../store/typingSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const { currentImageIndex, images } = useSelector((state) => state.carousel);
  const { headingText, subheadingText, typedHeading, typedSubheading } = useSelector((state) => state.typing);

  // Use a ref to store the latest typedHeading and typedSubheading
  const typedStateRef = useRef({ typedHeading, typedSubheading });

  useEffect(() => {
    typedStateRef.current = { typedHeading, typedSubheading };
  }, [typedHeading, typedSubheading]); // Update ref whenever typedHeading or typedSubheading changes

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(nextImage());
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [dispatch]);

  // Combined effect for typing the heading and then the subheading
  useEffect(() => {
    dispatch(resetTyping()); // Reset typing state on component mount

    let hIntervalId;
    let sIntervalId;

    const startTypingHeading = () => {
      hIntervalId = setInterval(() => {
        // Access latest typedHeading from ref
        if (typedStateRef.current.typedHeading.length < headingText.length) {
          dispatch(typeHeadingChar());
        } else {
          clearInterval(hIntervalId);
          // Delay before starting subheading typing
          setTimeout(() => {
            startTypingSubheading();
          }, 500); // Small delay after heading is done
        }
      }, 100); // Typing speed for heading
    };

    const startTypingSubheading = () => {
      sIntervalId = setInterval(() => {
        // Access latest typedSubheading from ref
        if (typedStateRef.current.typedSubheading.length < subheadingText.length) {
          dispatch(typeSubheadingChar());
        } else {
          clearInterval(sIntervalId);
        }
      }, 70); // Typing speed for subheading
    };

    startTypingHeading();

    return () => {
      clearInterval(hIntervalId);
      clearInterval(sIntervalId);
    };
  }, [dispatch, headingText, subheadingText]); // Dependencies only include stable items or things that genuinely trigger a re-setup

  const navigate = useNavigate();

  const handleBrainstormClick = () => {
    navigate('/brainstorming-dream-travel');
  };

  return (
    <>      
      <div className="carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentImageIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        ))}
        <div className="image-overlay"></div>
        <div className="content">
          <h1>{typedHeading}</h1>
          <h2>{typedSubheading}</h2>
          <div className="buttons-container">
            <button className="dream-button">Draw my dream destination</button>
            <button className="dream-button" onClick={handleBrainstormClick}>Brain storm you dream travel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
