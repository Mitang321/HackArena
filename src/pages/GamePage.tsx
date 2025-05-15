import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Game2048 from '../games/2048/Game2048';

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Currently only the 2048 game is implemented
  if (id !== '2048') {
    return <Navigate to="/library" />;
  }

  return (
    <div className="container-page">
      <div className="flex items-center mb-6">
        <Link to="/library" className="mr-4 p-2 hover:bg-gray-800 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold">2048</h1>
      </div>
      
      <div className="max-w-lg mx-auto">
        <Game2048 />
      </div>
    </div>
  );
};

export default GamePage;