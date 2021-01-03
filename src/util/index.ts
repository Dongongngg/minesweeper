import { COLUMN, ROW, BOMBS } from '../config/const';
import { Cell, CellValue, CellState } from '../types';

// check cells around current cell, return each cell

const getCellsAround = (
  cells: Cell[][],
  col: number,
  row: number,
): {
  top: Cell | null;
  right: Cell | null;
  bottom: Cell | null;
  left: Cell | null;
  topRight: Cell | null;
  topLeft: Cell | null;
  bottomRight: Cell | null;
  bottomLeft: Cell | null;
} => {
  //  get each cells aound crtcell if exist
  const top = row > 0 ? cells[col][row - 1] : null;
  const right = col < ROW - 1 ? cells[col + 1][row] : null;
  const bottom = row < COLUMN - 1 ? cells[col][row + 1] : null;
  const left = col > 0 ? cells[col - 1][row] : null;
  const topRight = row > 0 && col < ROW - 1 ? cells[col + 1][row - 1] : null;
  const topLeft = row > 0 && col > 0 ? cells[col - 1][row - 1] : null;
  const bottomRight = row < COLUMN - 1 && col < ROW - 1 ? cells[col + 1][row + 1] : null;
  const bottomLeft = row < COLUMN - 1 && col > 0 ? cells[col - 1][row + 1] : null;
  return {
    top,
    right,
    bottom,
    left,
    topRight,
    topLeft,
    bottomRight,
    bottomLeft,
  };
};

//  Create all the cell items with initial value and state

export const createCells = (): Cell[][] => {
  const cells: Cell[][] = [];
  for (let row = 0; row < ROW; row++) {
    cells.push([]);
    for (let column = 0; column < COLUMN; column++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.hide,
      });
    }
  }

  // Create bombs inside cell items
  let bombCount = 0;
  while (bombCount < BOMBS) {
    const x = Math.floor(Math.random() * ROW);
    const y = Math.floor(Math.random() * COLUMN);
    const crtCell = cells[x][y];
    if (crtCell.value !== CellValue.bomb) {
      crtCell.value = CellValue.bomb;
      bombCount++;
    }

    if (bombCount === BOMBS) {
      break;
    }
  }

  // Calculate number inside cell items

  for (let x = 0; x < ROW; x++) {
    for (let y = 0; y < COLUMN; y++) {
      const crtCell = cells[x][y];

      let displayNumber = 0;

      if (crtCell.value !== CellValue.bomb) {
        //  get each cells aound crtcell if exist
        const {
          top,
          right,
          bottom,
          left,
          topRight,
          topLeft,
          bottomRight,
          bottomLeft,
        } = getCellsAround(cells, x, y);

        //  Check if has bomb around
        if (top && top.value === CellValue.bomb) {
          displayNumber++;
        }
        if (right && right.value === CellValue.bomb) {
          displayNumber++;
        }
        if (bottom && bottom.value === CellValue.bomb) {
          displayNumber++;
        }
        if (left && left.value === CellValue.bomb) {
          displayNumber++;
        }
        if (topRight && topRight.value === CellValue.bomb) {
          displayNumber++;
        }
        if (topLeft && topLeft.value === CellValue.bomb) {
          displayNumber++;
        }
        if (bottomRight && bottomRight.value === CellValue.bomb) {
          displayNumber++;
        }
        if (bottomLeft && bottomLeft.value === CellValue.bomb) {
          displayNumber++;
        }
        if (displayNumber > 0) {
          cells[x][y] = { ...crtCell, value: displayNumber };
        }
      }
    }
  }

  return cells;
};

export const openMultipleCellsOnClick = (cells: Cell[][], col: number, row: number): Cell[][] => {
  let newCells = cells.slice();

  newCells[col][row].state = CellState.open;

  const { top, right, bottom, left, topRight, topLeft, bottomRight, bottomLeft } = getCellsAround(
    cells,
    col,
    row,
  );

  if (top?.state === CellState.hide && top.value !== CellValue.bomb) {
    if (top.value === CellValue.none) {
      newCells = openMultipleCellsOnClick(newCells, col, row - 1);
    } else {
      newCells[col][row - 1].state = CellState.open;
    }
  }
  if (right?.state === CellState.hide && right.value !== CellValue.bomb) {
    if (right.value === CellValue.none) {
      newCells = openMultipleCellsOnClick(newCells, col + 1, row);
    } else {
      newCells[col + 1][row].state = CellState.open;
    }
  }
  if (bottom?.state === CellState.hide && bottom.value !== CellValue.bomb) {
    if (bottom.value === CellValue.none) {
      newCells = openMultipleCellsOnClick(newCells, col, row + 1);
    } else {
      newCells[col][row + 1].state = CellState.open;
    }
  }
  if (left?.state === CellState.hide && left.value !== CellValue.bomb) {
    if (left.value === CellValue.none) {
      newCells = openMultipleCellsOnClick(newCells, col - 1, row);
    } else {
      newCells[col - 1][row].state = CellState.open;
    }
  }
  if (topLeft?.state === CellState.hide && topLeft.value !== CellValue.bomb) {
    if (topLeft.value === CellValue.none) {
      newCells = openMultipleCellsOnClick(newCells, col - 1, row - 1);
    } else {
      newCells[col - 1][row - 1].state = CellState.open;
    }
  }
  if (topRight?.state === CellState.hide && topRight.value !== CellValue.bomb) {
    if (topRight.value === CellValue.none) {
      newCells = openMultipleCellsOnClick(newCells, col + 1, row - 1);
    } else {
      newCells[col + 1][row - 1].state = CellState.open;
    }
  }
  if (bottomLeft?.state === CellState.hide && bottomLeft.value !== CellValue.bomb) {
    if (bottomLeft.value === CellValue.none) {
      newCells = openMultipleCellsOnClick(newCells, col - 1, row + 1);
    } else {
      newCells[col - 1][row + 1].state = CellState.open;
    }
  }
  if (bottomRight?.state === CellState.hide && bottomRight.value !== CellValue.bomb) {
    if (bottomRight.value === CellValue.none) {
      newCells = openMultipleCellsOnClick(newCells, col + 1, row + 1);
    } else {
      newCells[col + 1][row + 1].state = CellState.open;
    }
  }
  return newCells;
};
