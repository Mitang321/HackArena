import React from 'react';
import { GridCell } from '../../types';
import Tile from './Tile';

interface BoardProps {
  grid: GridCell[][];
}

const Board: React.FC<BoardProps> = ({ grid }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg p-2 select-none"
      style={{ 
        width: 'min(100%, 350px)',
        aspectRatio: '1/1'
      }}
    >
      <div className="relative w-full h-full grid grid-cols-4 gap-2">
        {/* Background cells */}
        {grid.flat().map((cell, index) => (
          <div 
            key={`cell-${index}`}
            className="bg-gray-700 rounded"
          />
        ))}
        
        {/* Tiles */}
        <div className="absolute inset-0 grid grid-cols-4 gap-2">
          {grid.flat().map((cell) => (
            cell.tile && (
              <Tile 
                key={`tile-${cell.tile.id}`}
                tile={cell.tile}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;