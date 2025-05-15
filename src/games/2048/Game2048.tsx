import React, { useEffect, useState } from 'react';
import {Board from './Board';}
import {useGame2048} from './useGame2048';
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RefreshCw} from 'lucide-react';

const Game2048: React.FC = () => {
    const{
        grid,
        score,
        bestScore,
        isgameOver,
        isGameWon,
        move,
        restart
        = useGame2048();
    }

    ude Effect(() => {  
        const handlekeydown = (event: keybosrdevent) => {
        if (isGameOver || isGameWon) return;

        switch (event.key) {
            case 'ArrowUp':
                move('up');
                event.preventDefault();
                break;
            case 'ArrowDown':    
            move('down');
                event.preventDefault();
                break;
            case 'ArrowLeft':
                move('left');
                event.preventDefault();
                break;
            case 'ArrowRight':
                move('right');
                event.preventDefault();
                break;

        }
        };

        window.addEventListener('keydown', handlekeydown);
        return () => window.removeEventListener('keydown', handlekeydown);
    } , [move, isGameOver, isGameWon]);

    return (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="flex justify-between w-full mb-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-primary-400">2048</h2>
          <p className="text-gray-400 text-sm">Join the tiles, get to 2048!</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-800 rounded-lg px-4 py-2 text-center">
            <div className="text-xs text-gray-400">SCORE</div>
            <div className="font-bold text-lg">{score}</div>
          </div>
          <div className="bg-gray-800 rounded-lg px-4 py-2 text-center">
            <div className="text-xs text-gray-400">BEST</div>
            <div className="font-bold text-lg">{bestScore}</div>
          </div>
        </div>
      </div>

      <div className="mb-4 flex justify-between w-full">
        <button 
          onClick={restart}
          className="btn-outline py-2 px-4 flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          New Game
        </button>
      </div>

      <board grid={grid} /> 



      <div className="mt-8 grid grid-cols-3 gap-2 w-full max-w-[280px] md:hidden">
        <div className="col-span-1"></div>
        <button 
          onClick={() => move('up')} 
          className="btn-outline p-3 flex justify-center"
          aria-label="Move up"
        >
          <ArrowUp />
        </button>
        <div className="col-span-1"></div>
        
        <button 
          onClick={() => move('left')} 
          className="btn-outline p-3 flex justify-center"
          aria-label="Move left"
        >
          <ArrowLeft />
        </button>
        <button 
          onClick={() => move('down')} 
          className="btn-outline p-3 flex justify-center"
          aria-label="Move down"
        >
          <ArrowDown />
        </button>
        <button 
          onClick={() => move('right')} 
          className="btn-outline p-3 flex justify-center"
          aria-label="Move right"
        >
          <ArrowRight />
        </button>
      </div>

      {(isGameOver || isGameWon) && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center animate-scale-in">
          <h3 className="text-xl font-bold mb-2">
            {isGameWon ? '🎉 You Win!' : '😔 Game Over!'}
          </h3>
          <p className="mb-4 text-gray-300">
            {isGameWon 
              ? 'Congratulations! You reached 2048!'
              : `Your score: ${score}`
            }
          </p>
          <button 
            onClick={restart} 
            className="btn-primary"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="mt-6 text-gray-400 text-sm">
        <p className="mb-2">How to play:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use arrow keys to move tiles (or touch controls on mobile)</li>
          <li>When two tiles with the same number touch, they merge!</li>
          <li>Get to the 2048 tile to win the game</li>
        </ul>
      </div>
    </div>
  );
};

export default Game2048;
