import React, { useState } from "react";

interface numberInputType {
  id: string;
  max: number;
}

const NumberInput: React.FC<numberInputType> = (props) => {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue((prevState) => {
      if (prevState >= props.max) {
        return props.max;
      }
      return prevState + 1;
    });
  };
  const decrement = () => {
    setValue((prevState) => {
      if (prevState === 0) {
        return 0;
      }
      return prevState - 1;
    });
  };
  const userInput = (e: React.FormEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.valueAsNumber;
    if (!userInput) {
      return setValue(0);
    } else if (userInput >= props.max) {
      return;
    }
    setValue(userInput);
  };

  return (
    <div className="flex h-16 ">
      <button
        type="button"
        className="border-2 rounded-l-2xl p-3 text-4xl flex items-center justify-center bg-slate-200"
        onClick={increment}
      >
        +
      </button>
      <input
        type="number"
        className="w-20 no-spin-button border-y-2 p-3 text-center text-4xl focus:outline-0"
        id={props.id}
        max={props.max}
        value={value}
        onInput={userInput}
      />
      <button
        type="button"
        className="border-2 rounded-r-2xl p-3 text-4xl flex items-center justify-center bg-slate-200"
        onClick={decrement}
      >
        -
      </button>
    </div>
  );
};

export default NumberInput;
