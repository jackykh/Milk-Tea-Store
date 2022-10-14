import React from "react";

interface checkboxProps {
  options: Array<{ id: string; content: string }>;
  name: string;
}

const CheckBox: React.FC<checkboxProps> = (props) => {
  const checkBoxs = props.options.map((option, index) => {
    let labelClassName =
      "border-2 p-3 bg-white peer-checked:bg-purple-900 peer-checked:text-white border-r-0";
    if (index === 0) {
      labelClassName = labelClassName + " rounded-l-2xl";
    } else if (index === props.options.length - 1) {
      labelClassName = labelClassName + " rounded-r-2xl border-r-2";
    }
    return (
      <div key={option.id}>
        <input
          type="checkbox"
          id={option.id}
          name={props.name}
          value={option.id}
          className="peer hidden"
        />
        <label htmlFor={option.id} className={labelClassName}>
          {option.content}
        </label>
      </div>
    );
  });

  return <div className="flex">{checkBoxs}</div>;
};

export default CheckBox;
