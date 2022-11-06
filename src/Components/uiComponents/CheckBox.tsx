import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface checkboxProps {
  options: Array<{ id: string; content: string }>;
  checked?: string[];
  sendValueToFather?: (value: string) => void;
  name: string;
}

const CheckBox: React.FC<checkboxProps> = (props) => {
  const [checkedItems, setCheckedItems] = useState([""]);

  useEffect(() => {
    if (props.checked) {
      setCheckedItems([...props.checked]);
    }
  }, [props.checked]);

  const onChangeHandler = (id: string) => {
    if (props.sendValueToFather) {
      props.sendValueToFather(id);
    }
    setCheckedItems((prevState) => {
      const index = prevState.findIndex((item) => {
        return item === id;
      });
      const adjustedCheckedItems = [...prevState];
      if (index >= 0) {
        adjustedCheckedItems.splice(index, 1);
        return adjustedCheckedItems;
      } else {
        adjustedCheckedItems.push(id);
        return adjustedCheckedItems;
      }
    });
  };

  const checkBoxs = props.options.map((option, index) => {
    let labelClassName =
      "border-2 p-3 bg-white peer-checked:bg-purple-900 peer-checked:text-white cursor-pointer";
    if (index === 0) {
      labelClassName = labelClassName + " rounded-l-2xl";
    } else if (index === props.options.length - 1) {
      labelClassName = labelClassName + " rounded-r-2xl";
    }

    return (
      <div key={uuidv4()}>
        <input
          type="checkbox"
          id={`${props.name}_${option.id}`}
          name={props.name}
          value={option.id}
          className="peer hidden"
          onChange={onChangeHandler.bind(null, option.id)}
          checked={
            checkedItems.findIndex((item) => {
              return item === option.id;
            }) >= 0
              ? true
              : false
          }
        />
        <label
          htmlFor={`${props.name}_${option.id}`}
          className={labelClassName}
        >
          {option.content}
        </label>
      </div>
    );
  });

  return <div className="flex">{checkBoxs}</div>;
};

export default CheckBox;
