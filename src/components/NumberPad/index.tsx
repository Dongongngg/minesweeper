import React from "react";
import "./NumberPad.scss";
interface NumberPadProps {
  value: number;
}

const NumberPad: React.FC<NumberPadProps> = ({ value }) => {
  return <div className="NumberPad">{value.toString().padStart(3, "0")}</div>;
};

export default NumberPad;
