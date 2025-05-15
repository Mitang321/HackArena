import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { GameInfo } from '../types';

const GAMES: GameInfo[] = [
  {
    id: '2048',
    name: '2048',
    description: 'Combine the numbers to reach 2048 tile! A classic puzzle game of strategy and planning.',
    icon: '🧩',
    category: 'puzzle',
  },
  
];

const LibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredGames = GAMES.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-page">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="mr-4 p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold">Game Library</h1>
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No games found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              available={game.id === '2048'} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;