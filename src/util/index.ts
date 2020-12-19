import { COLUMN, ROW, BOMBS } from '../config/const';
import { Cell, CellValue, CellState } from '../types';

export const createCells = () => {
  //  Create all the cell items with initial value and state
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
      cells[x][y] = { ...cells[x][y], value: CellValue.bomb };
    }

    bombCount++;
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
        const top = y > 0 ? cells[x][y - 1] : null;
        const right = x < ROW - 1 ? cells[x + 1][y] : null;
        const bottom = y < COLUMN - 1 ? cells[x][y + 1] : null;
        const left = x > 0 ? cells[x - 1][y] : null;
        const topRight = y > 0 && x < ROW - 1 ? cells[x + 1][y - 1] : null;
        const topLeft = y > 0 && x > 0 ? cells[x - 1][y - 1] : null;
        const bottomRight = y < COLUMN - 1 && x < ROW - 1 ? cells[x + 1][y + 1] : null;
        const bottomLeft = y < COLUMN - 1 && x > 0 ? cells[x - 1][y + 1] : null;

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
