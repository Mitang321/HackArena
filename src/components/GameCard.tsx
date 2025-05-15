import React from 'react';
import { Link } from 'react-router-dom';
import { GameInfo } from '../types';

interface GameCardProps {
  game: GameInfo;
  available: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, available }) => {
  return (
    <div className="card group hover:scale-[1.02] transition-transform">
      <div className="flex items-start mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 text-2xl">
          {game.icon}
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold">{game.name}</h3>
          <span className="text-sm px-2 py-1 bg-gray-800 rounded-full text-gray-300 capitalize">
            {game.category}
          </span>
        </div>
      </div>
      
      <p className="text-gray-300 mb-4 line-clamp-2">{game.description}</p>
      
      {available ? (
        <Link 
          to={`/game/${game.id}`} 
          className="btn-primary w-full"
        >
          Play Now
        </Link>
      ) : (
        <button 
          className="btn-outline w-full opacity-70 cursor-not-allowed"
          disabled
        >
          Coming Soon
        </button>
      )}
    </div>
  );
};

export default GameCard;