import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Game.css';

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('/Card.json')
      .then(response => response.json())
      .then(data => {
        setCards(generateCards(data));
      });
  }, []);

  const generateCards = (images) => {
    const cardArray = images.flatMap(image => [
      { id: image.id + '1', image: image.image },
      { id: image.id + '2', image: image.image },
    ]);
    return cardArray.sort(() => Math.random() - 0.5);
  };

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