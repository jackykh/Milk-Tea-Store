import React from "react";

type closeModalFunction = (event: React.MouseEvent) => void;

const Modal: React.FC<{
  children: React.ReactNode;
  close: closeModalFunction;
}> = (props) => {
  return (
    <div className="absCenter rounded flex justify-center items-center bg-white relative p-3">
      <button
        className="text-purple-400 border-none bg-transparent text-5xl absolute top-6 right-8 "
        onClick={props.close}
      >
        <i className="fa-regular fa-circle-xmark"></i>
      </button>
      {props.children}
    </div>
  );
};

export default Modal;
