// src/components/Card.js
import React from 'react';
import './Card.css';

const Card = ({ card, onClick, isFlipped, id }) => {
  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''}`} 
      onClick={() => onClick(id)}
    >
      <div className="card-front"></div>
      <div className="card-back">
        <img src={card.image} alt="card" />
      </div>
    </div>
  );
};

export default Card;
