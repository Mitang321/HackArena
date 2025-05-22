import React, { useEffect, useState } from 'react';
import Rocket from './Rocket';

interface BoardProps {
  rockets: Array<{
    id: number;
    position: { x: number; y: number };
    isPlayer: boolean;
    isExploding?: boolean;
  }>;
  playerPosition: { x: number; y: number };
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const Board: React.FC<BoardProps> = ({ rockets, playerPosition }) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const createStars = () => Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 600,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
    }));

    setStars(createStars());

    const interval = setInterval(() => {
      setStars(prevStars => 
        prevStars.map(star => {
          let newY = star.y + 0.5;
          if (newY > 600) {
            newY = 0;
          }
          return {
            ...star,
            y: newY,
            opacity: Math.sin(Date.now() / 1000 + star.id) * 0.3 + 0.7,
          };
        })
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative bg-gray-900 rounded-lg overflow-hidden"
      style={{ width: '400px', height: '600px' }}
    >
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}

      <div
        className="absolute"
        style={{
          left: `${playerPosition.x}px`,
          top: `${playerPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Rocket position={{ x: 0, y: 0 }} isPlayer={false} />
      </div>

      {rockets.map(rocket => (
        <Rocket
          key={rocket.id}
          position={rocket.position}
          isPlayer={rocket.isPlayer}
          isExploding={rocket.isExploding}
        />
      ))}
    </div>
  );
};

export default Board; 