import React from "react";
import { Link } from "react-router-dom";

const CartIcon: React.FC<{ itemNumber: number }> = (props) => {
  const redDotWithNumber = (
    <div className="w-8 h-8 p-3 text-xl rounded-full bg-red-600 text-white flex justify-center items-center absolute right-3 top-6">
      <span>{props.itemNumber}</span>
    </div>
  );
  return (
    <div className="h-full flex justify-center items-center  px-8 text-4xl  ">
      <Link to="cart" className="hover:scale-125 transition-all">
        <i className="fa-solid fa-cart-shopping"></i>
      </Link>
      {props.itemNumber !== 0 && redDotWithNumber}
    </div>
  );
};

export default CartIcon;
