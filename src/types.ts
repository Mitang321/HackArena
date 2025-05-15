export interface GameInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface TilePosition {
  row: number;
  col: number;
}

export interface Tile {
  id: number;
  value: number;
  position: TilePosition;
  mergedFrom?: Tile[];
  isNew?: boolean;
}

export interface GridCell {
  position: TilePosition;
  tile: Tile | null;
}