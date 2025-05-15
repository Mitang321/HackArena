import { useState, useEffect, useCallback } from 'react';
import { Direction, GridCell, Tile, TilePosition } from '../../types';

const GRID_SIZE = 4;
const WIN_VALUE = 2048;

let tileIdCounter = 0;

const initializeGrid = (): GridCell[][] => {
  const grid: GridCell[][] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    const rowArray: GridCell[] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      rowArray.push({
        position: { row, col },
        tile: null,
      });
    }
    grid.push(rowArray);
  }
  return grid;
};

const hasAvailableCells = (grid: GridCell[][]): boolean => {
  return grid.some(row => row.some(cell => !cell.tile));
};

const getRandomAvailableCell = (grid: GridCell[][]): TilePosition | null => {
  const availableCells: TilePosition[] = [];

  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!cell.tile) {
        availableCells.push({ row: rowIndex, col: colIndex });
      }
    });
  });

  if (availableCells.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  return availableCells[randomIndex];
};

const addRandomTile = (grid: GridCell[][]): GridCell[][] => {
  const cell = getRandomAvailableCell(grid);
  if (!cell) return grid;

  const { row, col } = cell;
  const newGrid = [...grid];
  
  const value = Math.random() < 0.9 ? 2 : 4;
  
  newGrid[row][col] = {
    ...newGrid[row][col],
    tile: {
      id: tileIdCounter++,
      value,
      position: { row, col },
      isNew: true,
    },
  };
  
  return newGrid;
};

const hasAvailableMoves = (grid: GridCell[][]): boolean => {
  if (hasAvailableCells(grid)) return true;

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const tile = grid[row][col].tile;
      if (!tile) continue;

      const directions = [
        { row: row - 1, col }, // top
        { row: row + 1, col }, // bottom
        { row, col: col - 1 }, // left
        { row, col: col + 1 }, // right
      ];

      for (const { row: r, col: c } of directions) {
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE) {
          const adjacentTile = grid[r][c].tile;
          if (adjacentTile && adjacentTile.value === tile.value) {
            return true;
          }
        }
      }
    }
  }

  return false;
};


const hasWon = (grid: GridCell[][]): boolean => {
  return grid.some(row => 
    row.some(cell => cell.tile && cell.tile.value >= WIN_VALUE)
  );
};


const saveBestScore = (score: number) => {
  try {
    localStorage.setItem('2048BestScore', score.toString());
  } catch (e) {

  }
};

const loadBestScore = (): number => {
  try {
    const savedScore = localStorage.getItem('2048BestScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  } catch (e) {
    return 0;
  }
};

export const useGame2048 = () => {
  const [grid, setGrid] = useState<GridCell[][]>(() => {
    const initialGrid = initializeGrid();
    return addRandomTile(addRandomTile(initialGrid));
  });
  
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() => loadBestScore());
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);


  useEffect(() => { 
    if (score > bestScore) {
      setBestScore(score);
      saveBestScore(score);
    }
  }, [score, bestScore]);


  useEffect(() => {

    if (!isGameWon && hasWon(grid)) {
      setIsGameWon(true);
    }
    

    if (!hasAvailableMoves(grid)) {
      setIsGameOver(true);
    }
  }, [grid, isGameWon]);


  useEffect(() => {
    const clearFlags = () => {
      setGrid(prevGrid => 
        prevGrid.map(row => 
          row.map(cell => {
            if (cell.tile) {
              return {
                ...cell,
                tile: {
                  ...cell.tile,
                  isNew: false,
                  mergedFrom: undefined,
                },
              };
            }
            return cell;
          })
        )
      );
    };

    const timeout = setTimeout(clearFlags, 300);
    return () => clearTimeout(timeout);
  }, [grid]);


  const restart = useCallback(() => {
    tileIdCounter = 0;
    const newGrid = initializeGrid();
    setGrid(addRandomTile(addRandomTile(newGrid)));
    setScore(0);
    setIsGameOver(false);
    setIsGameWon(false);
  }, []);

  const move = useCallback((direction: Direction) => {
    if (isGameOver || isGameWon) return;

   
    const traversals = {
      row: Array.from({ length: GRID_SIZE }, (_, i) => 
        direction === 'down' ? GRID_SIZE - 1 - i : i
      ),
      col: Array.from({ length: GRID_SIZE }, (_, i) => 
        direction === 'right' ? GRID_SIZE - 1 - i : i
      ),
    };

    if (direction === 'right' || direction === 'down') {
      traversals.row.reverse();
      traversals.col.reverse();
    }

    const getNextPosition = (pos: TilePosition): TilePosition => {
      switch (direction) {
        case 'up':
          return { row: pos.row - 1, col: pos.col };
        case 'down':
          return { row: pos.row + 1, col: pos.col };
        case 'left':
          return { row: pos.row, col: pos.col - 1 };
        case 'right':
          return { row: pos.row, col: pos.col + 1 };
      }
    };

    const isValidPosition = (pos: TilePosition): boolean => {
      return pos.row >= 0 && pos.row < GRID_SIZE && 
             pos.col >= 0 && pos.col < GRID_SIZE;
    };

    const newGrid = grid.map(row => 
      row.map(cell => ({
        ...cell,
        tile: cell.tile ? { ...cell.tile } : null,
      }))
    );

    let moved = false;
    let newScore = score;

    const processedPositions = new Set<string>();

    const rowOrder = direction === 'up' ? [...Array(GRID_SIZE).keys()] : 
                    [...Array(GRID_SIZE).keys()].reverse();
    const colOrder = direction === 'left' ? [...Array(GRID_SIZE).keys()] : 
                    [...Array(GRID_SIZE).keys()].reverse();

    for (const r of rowOrder) {
      for (const c of colOrder) {
        const pos = { row: r, col: c };
        const cell = newGrid[r][c];
        
        if (!cell.tile) continue;

        let currentPos = { ...pos };
        let nextPos = getNextPosition(currentPos);
        
        while (isValidPosition(nextPos)) {
          const nextCell = newGrid[nextPos.row][nextPos.col];
          
          if (!nextCell.tile) {
            currentPos = nextPos;
            nextPos = getNextPosition(currentPos);
          } else if (nextCell.tile.value === cell.tile.value && 
                     !processedPositions.has(`${nextPos.row},${nextPos.col}`)) {
            currentPos = nextPos;
            break;
          } else {
            break;
          }
        }

        if (currentPos.row !== pos.row || currentPos.col !== pos.col) {
          moved = true;
          
          if (newGrid[currentPos.row][currentPos.col].tile) {
            const targetTile = newGrid[currentPos.row][currentPos.col].tile!;
            const doubledValue = targetTile.value * 2;
            
            newGrid[currentPos.row][currentPos.col].tile = {
              id: tileIdCounter++,
              value: doubledValue,
              position: currentPos,
              mergedFrom: [cell.tile, targetTile],
            };
            
            newGrid[pos.row][pos.col].tile = null;
            
            newScore += doubledValue;
            
            processedPositions.add(`${currentPos.row},${currentPos.col}`);
          } else {
            newGrid[currentPos.row][currentPos.col].tile = {
              ...cell.tile,
              position: currentPos,
            };
            
            newGrid[pos.row][pos.col].tile = null;
          }
        }
      }
    }

    if (!moved) return;

    const gridWithNewTile = addRandomTile(newGrid);
    
    setGrid(gridWithNewTile);
    setScore(newScore);
  }, [grid, score, isGameOver, isGameWon]);

  return {
    grid,
    score,
    bestScore,
    isGameOver,
    isGameWon,
    move,
    restart,
  };
};