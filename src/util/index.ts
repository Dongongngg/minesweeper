import { COLUMN, ROW } from "../config/const";
import { Cell, CellValue, CellState } from "../types";

const createCells = () => {
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
  return cells;
};

export default createCells;
