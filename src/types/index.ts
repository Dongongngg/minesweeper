export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb,
}

export enum CellState {
  hide,
  open,
  flag,
}

export type Cell = { value: CellValue; state: CellState; red?: boolean };
