import React, { useState, useEffect } from 'react';
import './App.scss';
//components
import NumberPad from '../NumberPad';
//functions
import { createCells, openMultipleCellsOnClick } from '../../util';
import CellBtn from '../CellBtn';
//types
import { Cell, CellState, CellValue } from '../../types';

const App: React.FC = () => {
  const Face = {
    win: 'fa fa-smile-o',
    oh: 'oh',
    lost: 'sad',
  };
  // all cells displaying
  const [cells, setCells] = useState<Cell[][]>(createCells());
  const [face, setFace] = useState<string>(Face.win);
  const [time, setTime] = useState<number>(0);
  const [counter, setCounter] = useState<number>(10);
  const [startFlag, setStartFlag] = useState<boolean>(false);
  //  handle left-click of cells
  useEffect(() => {
    const handleMousedown = () => {
      setFace(Face.win);
    };
    const handleMouseup = () => {
      setFace(Face.win);
    };
    window.addEventListener('mousedown', handleMousedown);
    window.addEventListener('mouseup', handleMouseup);

    return () => {
      window.removeEventListener('mousedown', handleMousedown);
      window.removeEventListener('mouseup', handleMouseup);
    };
  }, []);
  //  if click on flag, do nothing
  //  if click on none, create new cells by openMultipleCellsOnClick()
  //  if click on bomb at begining,
  const handleCellClick = (col: number, row: number) => (): void => {
    console.log(col, row);
    if (!startFlag) {
      setStartFlag(true);
    }
    const crtCell = cells[row][col];
    const newCells = cells.slice();
    if (crtCell.state === CellState.flag || crtCell.state === CellState.open) {
      return;
    }
    if (crtCell.value === CellValue.bomb) {
    } else if (crtCell.value === CellValue.none) {
      openMultipleCellsOnClick(newCells, row, col);
    } else {
      newCells[row][col].state = CellState.open;
      setCells(newCells);
    }
  };

  const handleCellRightClick = (col: number, row: number) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void => {
    e.preventDefault();
    if (!startFlag) {
      return;
    }
    const crtCell = cells[row][col];
    const newCells = cells.slice();
    if (crtCell.state === CellState.open) {
      return;
    } else if (crtCell.state === CellState.hide) {
      newCells[row][col].state = CellState.flag;
      setCells(newCells);
      setCounter(counter - 1);
    } else {
      newCells[row][col].state = CellState.hide;
      setCells(newCells);
      setCounter(counter + 1);
    }

    console.log('right click');
  };
  const handleFaceClick = (): void => {
    if (startFlag) {
      setStartFlag(false);
      setCells(createCells());
      setTime(0);
      setFace(Face.win);
    }
  };

  useEffect(() => {
    if (startFlag && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [startFlag, time]);

  const renderCells = () => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <CellBtn
          key={`${rowIndex}-${colIndex}`}
          value={cell.value}
          state={cell.state}
          onClick={handleCellClick}
          onContext={handleCellRightClick}
          x={colIndex}
          y={rowIndex}
        />
      )),
    );
  };
  return (
    <main className="App">
      <section className="Header">
        <NumberPad value={counter}></NumberPad>
        <div className="face" onClick={handleFaceClick}>
          <i className={face} aria-hidden="true"></i>
        </div>
        <NumberPad value={time}></NumberPad>
      </section>
      <section className="Body">{renderCells()}</section>
    </main>
  );
};
export default App;
