import React, { useState } from "react";
import "./App.scss";
import Number from "../Number";
//
import createCells from "../../util";

const App: React.FC = () => {
  const [cells, setCells] = useState(createCells());
  return (
    <div className="App">
      <div className="Header">
        <Number value={0}></Number>
        <div className="face">
          <i className="fa fa-smile-o" aria-hidden="true"></i>
        </div>
        <Number value={11}></Number>
      </div>
      <div className="Body">ssssds</div>
    </div>
  );
};
export default App;
