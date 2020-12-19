import React from 'react';
import './NumberPad.scss';
interface NumberPadProps {
  value: number;
}

const NumberPad: React.FC<NumberPadProps> = ({ value }: NumberPadProps) => {
  return (
    <div className="NumberPad">
      {value < 0
        ? `-${Math.abs(value).toString().padStart(2, '0')}`
        : value.toString().padStart(3, '0')}
    </div>
  );
};

export default NumberPad;
