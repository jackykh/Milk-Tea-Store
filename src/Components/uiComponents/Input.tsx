import React from "react";

const Input: React.FC<{ [props: string]: any }> = (props) => {
  return <input className="input" type="text" {...props} />;
};

export default Input;
