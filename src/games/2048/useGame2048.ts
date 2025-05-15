import { useState, useEffect, useCallback } from "react";
import { Direction, GridCell, Tile , TileePosition} from "../../types";

const GRID_SIZE = 4;
CONST WIN_VALUE = 2048;

let tileIdCounter = 0;

Const initialGrid = (): GridCell[][] => {
    const grid: GridCell[][] = [];
    for (let row = 0; row  GRID_SIZE; row++) {
        const gridRow: GridCell[] = [];
        for (let col = 0; col < GRID_SIZE; col++) {
            rowArrow.push({
                position: { row,col},
                title: null,
            });
        }
        grid.push(rowArrsay);

    }
    return grid;
};

const geRandomEmptyCell = (grid: GridCell[][]): TileePosition | null => {

    const availableCells: TileePosition[] = [];

    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (!cell.title) {
                availableCells.push({ row: rowIndex, col: colIndex });
            }
        });
    }          