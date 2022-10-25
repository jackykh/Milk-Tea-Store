import React from "react";
import { Link } from "react-router-dom";

const ProductItem: React.FC<{
  img: string;
  caption: string;
  id: string;
  caption2?: string;
}> = (props) => {
  return (
    <div className="w-[30rem] h-[30rem] rounded-xl overflow-hidden group cursor-pointer relative">
      <Link to={props.id}>
        <img
          src={`${props.img}`}
          alt="product"
          className="group-hover:blur-sm group-hover:brightness-50 transition-all object-contain object-center absolute"
        />
      </Link>
      <div className="text-white text-3xl text-center translate-y-[35rem] font-bold group-hover:translate-y-[13rem] transition-all">
        <figcaption>{props.caption}</figcaption>
        <figcaption>{props.caption2}</figcaption>
      </div>
    </div>
  );
};

export default ProductItem;
