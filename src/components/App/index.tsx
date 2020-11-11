import React, { useState } from "react";
import "./App.scss";
//components
import NumberPad from "../NumberPad";
//functions
import { createCells } from "../../util";
import CellBtn from "../CellBtn";

const App: React.FC = () => {
  const [cells, setCells] = useState(createCells());
  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <CellBtn
          key={`${rowIndex}-${colIndex}`}
          value={cell.value}
          state={cell.state}
        />
      ))
    );
  };
  return (
    <div className="App">
      <div className="Header">
        <NumberPad value={0}></NumberPad>
        <div className="face">
          <i className="fa fa-smile-o" aria-hidden="true"></i>
        </div>
        <NumberPad value={11}></NumberPad>
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};
export default App;
