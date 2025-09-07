import React, { useState } from 'react';
import './brainstorming-dream-travel.styles.css';
import { useNavigate } from 'react-router-dom';

const BrainstormingDreamTravel = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: "That's an interesting idea! Tell me more.", sender: 'ai' }]);
      }, 1000);
    }
  };

  return (
    <div className="brainstorming-dream-travel-container">
      <div className="chat-header">
        <button className="back-button" onClick={() => navigate('/')}>← Back to Home</button>
        <h2>Lets make this dream come true</h2>
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
