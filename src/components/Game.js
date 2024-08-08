// src/components/Game.js
import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Game.css';

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    fetch('/Card.json')
      .then(response => response.json())
      .then(data => {
        setCards(generateCards(data));
      })
      .catch(error => {
        console.error('Error fetching card data:', error);
      });
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

  useEffect(() => {
    if (matchedIndices.length === cards.length) {
      setGameOver(true);
    }
  }, [matchedIndices, cards]);

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || flippedIndices.includes(index) || matchedIndices.includes(index) || gameOver) return;
    
    setFlippedIndices(prev => [...prev, index]);
  };

  const handleTryAgain = () => {
    fetch('/Card.json')
      .then(response => response.json())
      .then(data => {
        setCards(generateCards(data));
        setFlippedIndices([]);
        setMatchedIndices([]);
        setScore(0);
        setGameOver(false);
      })
      .catch(error => {
        console.error('Error fetching card data:', error);
      });
  };

  const generateCards = (images) => {
    const cardArray = images.flatMap(image => [
      { id: image.id + '1', image: image.image },
      { id: image.id + '2', image: image.image },
    ]);
    return cardArray.sort(() => Math.random() - 0.5).slice(0, 30);
  };

  return (
    <div className="background-container">
      <img className="background-image" src="/background/7.jpeg" alt="background" />
      <div className="game-container">
        {!gameOver && (
          <>
            <div className="score">Score: {score}</div>
            <div className="card-grid">
              {cards.length === 0 ? (
                <p>Loading...</p>
              ) : (
                cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    id={index}
                    onClick={handleCardClick}
                    isFlipped={flippedIndices.includes(index) || matchedIndices.includes(index)}
                  />
                ))
              )}
            </div>
          </>
        )}
        {gameOver && (
          <div className="game-over-popup">
            <h2>Hello Buddy !</h2>
            <p>Please try </p>
            <img src="/assets/robot.gif" alt="robot" />
            <button onClick={handleTryAgain}>Play</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
