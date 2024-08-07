// src/components/Game.js
import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Game.css';

// Generate a shuffled array of cards
const generateCards = (images) => {
  const cardArray = images.flatMap(image => [
    { id: image + '1', image },
    { id: image + '2', image },
  ]);
  return cardArray.sort(() => Math.random() - 0.5);
};

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [score, setScore] = useState(0);

  const images = Array.from({ length: 25 }, (_, i) => `/images/image${i + 1}.jpg`);

  useEffect(() => {
    setCards(generateCards(images));
  }, []);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const [firstCard, secondCard] = [cards[firstIndex], cards[secondIndex]];

      if (firstCard.image === secondCard.image) {
        setMatchedIndices(prev => [...prev, firstIndex, secondIndex]);
        setScore(prev => prev + 1);
      }

      setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIndices.includes(index)) return;
    
    setFlippedIndices(prev => [...prev, index]);
  };

  return (
    <div className="game-container">
      <div className="score">Score: {score}</div>
      <div className="card-grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            id={index}
            onClick={handleCardClick}
            isFlipped={flippedIndices.includes(index) || matchedIndices.includes(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
