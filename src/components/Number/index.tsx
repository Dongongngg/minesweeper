import React from "react";
import "./Number.scss";
interface NumberProps {
  value: number;
}

const Number: React.FC<NumberProps> = ({ value }) => {
  return <div className="Number">{value.toString().padStart(3, "0")}</div>;
};

export default Number;
