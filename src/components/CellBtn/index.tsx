import React from 'react';
import { CellState, CellValue } from '../../types';
//styles
import './CellBtn.scss';

interface CellBtnProps {
  value: CellValue;
  state: CellState;
  red?: boolean;
  onClick(col: number, row: number): (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onContext(col: number, row: number): (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  x: number;
  y: number;
}

const CellBtn: React.FC<CellBtnProps> = ({
  value,
  state,
  red,
  onClick,
  onContext,
  x,
  y,
}: CellBtnProps) => {
  const renderNumber = (): React.ReactNode => {
    if (state === CellState.open) {
      if (value === CellValue.bomb) {
        return <i className="fa fa-bomb" aria-hidden="true"></i>;
      } else if (value === CellValue.none) {
        return null;
      } else {
        return value;
      }
    } else if (state === CellState.flag) {
      return <i className="fa fa-flag" aria-hidden="true"></i>;
    }
  };
  return (
    <div
      className={
        `CellBtn${state === CellState.open ? ' CellOpen' : ''}` +
        `${state === CellState.flag ? ' color-flag' : ` color-${value}`}` +
        `${red ? ' bg-red' : ''}`
      }
      onClick={onClick(x, y)}
      onContextMenu={onContext(x, y)}
    >
      {renderNumber()}
    </div>
  );
};
export default CellBtn;
