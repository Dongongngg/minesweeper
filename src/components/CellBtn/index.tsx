import React from "react";
import { CellState, CellValue } from "../../types";
//styles
import "./CellBtn.scss";

interface CellBtnProps {
  value: CellValue;
  state: CellState;
}

const CellBtn: React.FC<CellBtnProps> = ({ value, state }) => {
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
        `CellBtn${state === CellState.open ? " CellOpen" : ""}` +
        ` color-${value}`
      }
    >
      {renderNumber()}
    </div>
  );
};
export default CellBtn;
