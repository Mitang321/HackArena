import React from 'react';
import { Tile as TileType } from '../../types';

interface TileProps {
  tile: TileType;
}

const TILE_COLORS: Record<number, string> = {
  2: 'bg-[#eee4da] text-[#776e65]',
  4: 'bg-[#ede0c8] text-[#776e65]',
  8: 'bg-[#f2b179] text-white',
  16: 'bg-[#f59563] text-white',
  32: 'bg-[#f67c5f] text-white',
  64: 'bg-[#f65e3b] text-white',
  128: 'bg-[#edcf72] text-white',
  256: 'bg-[#edcc61] text-white',
  512: 'bg-[#edc850] text-white',
  1024: 'bg-[#edc53f] text-white',
  2048: 'bg-[#edc22e] text-white',
};

const getFontSize = (value: number): string => {
  if (value >= 1000) return 'text-lg md:text-xl';
  if (value >= 100) return 'text-xl md:text-2xl';
  return 'text-2xl md:text-3xl';
};

const Tile: React.FC<TileProps> = ({ tile }) => {
  const { value, isNew, mergedFrom } = tile;
  
  const colorClass = TILE_COLORS[value] || 'bg-[#3c3a32] text-white';
  const fontSizeClass = getFontSize(value);
  
  const animation = isNew 
    ? 'animate-pop' 
    : mergedFrom 
      ? 'animate-pop' 
      : '';

  return (
    <div
      className={`flex items-center justify-center rounded w-full h-full font-bold shadow-lg ${colorClass} ${fontSizeClass} ${animation}`}
    >
      {value}
    </div>
  );
};

export default Tile;