import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './brainstorming-dream-travel.styles.css';

const BrainstormingDreamTravel = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from location state (passed from maps page)
  const { selectedCategory, selectedContinent } = location.state || {};
  
  // Get travel data from Redux store
  const { travelData } = useSelector((state) => state.travel);

  useEffect(() => {
    // Get places for the selected category and continent
    const availablePlaces = selectedCategory && selectedContinent && travelData[selectedCategory] 
      ? travelData[selectedCategory].places[selectedContinent] || []
      : [];

    // Create a detailed welcome message
    let welcomeMessage = "🌍 Welcome to your dream travel brainstorming session!";
    
    if (selectedCategory && selectedContinent) {
      welcomeMessage = `🌍 Perfect! You're interested in **${selectedCategory}** destinations in **${selectedContinent}**.`;
      
      if (availablePlaces.length > 0) {
        welcomeMessage += "\n\nHere are some amazing places to consider:\n\n";
        availablePlaces.forEach((place) => {
          welcomeMessage += `**${place.name}** - ${place.description}\n\n`;
        });
        welcomeMessage += "Which of these destinations appeals to you most? Or tell me what specific experiences you're looking for!";
      } else {
        welcomeMessage += "\n\nTell me what specific experiences you're looking for in this category!";
      }
    } else if (selectedContinent) {
      welcomeMessage = `🌍 Great choice! You've selected ${selectedContinent}. Let's brainstorm your dream travel experience there. What type of adventure are you looking for?`;
    }
    
    setMessages([{ text: welcomeMessage, sender: 'ai' }]);

    // Handle mobile viewport changes for keyboard
    const handleViewportChange = () => {
      // Force recalculation of viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial viewport height
    handleViewportChange();

    // Listen for viewport changes (keyboard open/close)
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
    };
  }, [selectedContinent, selectedCategory, travelData]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      
      // Simulate AI response based on continent selection
      setTimeout(() => {
        let aiResponse = "That's an interesting idea! Tell me more.";
        
        if (selectedContinent) {
          const continentResponses = {
            'North America': "North America offers incredible diversity! Are you thinking of exploring the national parks, vibrant cities like New York or LA, or maybe the Canadian wilderness?",
            'South America': "South America is amazing! Are you drawn to the Amazon rainforest, Machu Picchu, the beaches of Brazil, or perhaps the wine regions of Argentina?",
            'Europe': "Europe has so much history and culture! Are you interested in the romantic cities of Paris and Rome, the Nordic countries, or maybe the Mediterranean coastline?",
            'Africa': "Africa offers unforgettable experiences! Are you thinking of a safari adventure, exploring ancient Egypt, or discovering the diverse cultures across the continent?",
            'Asia': "Asia is incredibly diverse! Are you interested in the temples of Southeast Asia, the modern cities of Japan, the Great Wall of China, or the beaches of Thailand?",
            'Oceania': "Oceania is paradise! Are you dreaming of Australia's outback and Great Barrier Reef, New Zealand's stunning landscapes, or the tropical islands of the Pacific?",
            'Antarctica': "Antarctica is the ultimate adventure! Are you interested in wildlife watching, ice formations, or the unique experience of visiting the most remote continent?"
          };
          aiResponse = continentResponses[selectedContinent] || aiResponse;
        }
        
        setMessages((prevMessages) => [...prevMessages, { text: aiResponse, sender: 'ai' }]);
      }, 1000);
    }
  };

  const handleInputFocus = () => {
    // On mobile, scroll the input into view when focused
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        const inputElement = document.querySelector('.chat-input-area input');
        if (inputElement) {
          inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300); // Delay to allow keyboard animation
    }
  };

  return (
    <div className="brainstorming-dream-travel-container">
      <div className="chat-header">
        <button className="back-button" onClick={() => navigate('/')}>← Back to Home</button>
        <div className="header-content">
          <h2>Let's make this dream come true</h2>
          {selectedContinent && (
            <p className="selected-continent">🌍 Exploring: {selectedContinent}</p>
          )}
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <div className="input-with-button">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            onFocus={handleInputFocus}
            placeholder="Ask me about your dream destination..."
          />
          <button onClick={handleSendMessage} className="send-button">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrainstormingDreamTravel;
