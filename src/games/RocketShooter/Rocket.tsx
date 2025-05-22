import React from 'react';

interface RocketProps {
  position: { x: number; y: number };
  isPlayer: boolean;
  isExploding?: boolean;
}

const Rocket: React.FC<RocketProps> = ({ position, isPlayer, isExploding = false }) => {
  if (isExploding) {
    return (
      <div
        className="absolute"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-8 h-8 bg-yellow-500 rounded-full animate-ping" />
        <div className="w-6 h-6 bg-orange-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    );
  }

  if (isPlayer) {
    return (
      <div
        className="absolute"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-2 h-4 bg-blue-400 rounded-full relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-6 bg-blue-300 opacity-50 blur-sm" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="w-4 h-8 bg-red-500 rounded-t-lg relative">
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-300 rounded-t-lg" />
        
        <div className="absolute bottom-0 left-0 w-2 h-3 bg-gray-700 transform -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-2 h-3 bg-gray-700 transform translate-x-1/2" />
        
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-4 bg-yellow-500 rounded-b-lg animate-pulse" />
          <div className="w-1 h-3 bg-orange-500 rounded-b-lg mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Rocket; 