import React, { useState, useEffect } from 'react';
import './App.scss';
//  config
import { ROW, COLUMN, BOMBS } from '../../config/const';
//components
import NumberPad from '../NumberPad';
//functions
import { createCells, openMultipleCellsOnClick } from '../../util';
import CellBtn from '../CellBtn';
//types
import { Cell, CellState, CellValue } from '../../types';

const App: React.FC = () => {
  const Face = {
    smile: 'fa fa-smile-o',
    wait: 'fa fa-meh-o',
    lost: 'fa fa-frown-o',
    win: 'fa fa-trophy',
  };

  // all cells displaying
  const [cells, setCells] = useState<Cell[][]>(createCells());
  const [face, setFace] = useState<string>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [counter, setCounter] = useState<number>(BOMBS);
  const [startFlag, setStartFlag] = useState<boolean>(false);
  const [winFlag, setWinFlag] = useState<boolean>(false);
  const [lostFlag, setLostFlag] = useState<boolean>(false);

  //  handle left-click of cells
  useEffect(() => {
    const handleMousedown = () => {
      setFace(Face.wait);
    };
    const handleMouseup = () => {
      setFace(Face.smile);
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
  //  if click on bomb at begining???
  //  if click last none-bomb cell, win the game
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
      setLostFlag(true);
      newCells[row][col].red = true;
      setCells(newCells);
      return;
    } else if (crtCell.value === CellValue.none) {
      openMultipleCellsOnClick(newCells, row, col);
    } else {
      newCells[row][col].state = CellState.open;
      setCells(newCells);
    }

    // check if win
    //  if safe cells equals (all cells - bombs), game wins
    let bombsCount = 0;
    let openedCells = 0;
    for (const x in cells) {
      for (const y in cells[x]) {
        if (cells[x][y].value === CellValue.bomb) {
          // number of bombs
          bombsCount++;
        }
        if (cells[x][y].state === CellState.open) {
          // number of bombs
          openedCells++;
        }
      }
    }
    if (ROW * COLUMN - openedCells === bombsCount) {
      setWinFlag(true);
    }
  };
  //  lost the game
  useEffect(() => {
    if (lostFlag) {
      setFace(Face.lost);
      for (const x in cells) {
        for (const y in cells[x]) {
          if (cells[x][y].state !== CellState.open && cells[x][y].value === CellValue.bomb) {
            cells[x][y].state = CellState.open;
          }
        }
      }
    }
  }, [lostFlag]);
  //  win the game
  useEffect(() => {
    if (winFlag) {
      setStartFlag(false);
      setFace(Face.win);
    }
  }, [winFlag]);

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
  // click the face
  const handleFaceClick = (): void => {
    if (startFlag) {
      setCells(createCells());
      setTime(0);
      setFace(Face.smile);
      setLostFlag(false);
      setWinFlag(false);
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
          red={cell.red}
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
