import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <Gamepad2 className="text-primary-500 w-16 h-16 mr-3" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text">
            HackArena
          </h1>
        </div>
       
        <Link 
          to="/library" 
          className="btn-primary text-lg py-4 px-8 animate-pulse hover:animate-none"
        >
          Game Library
        </Link>
      </div>
    </div>
  );
};

export default HomePage;