import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Gallery: React.FC<{ size: number; imgs: string[] }> = (props) => {
  const { size, imgs } = props;
  const [indexOfCurrentImg, setIndexOfCurrentImg] = useState(0);
  let imgTransition = {
    transform: `translateX(-${indexOfCurrentImg}00%`,
  };

  const imgList = imgs.map((img, index) => {
    return (
      <div
        key={uuidv4()}
        className="w-full h-full p-8 bg-slate-50 shrink-0 flex justify-center items-center"
      >
        <img src={img} alt="tea" className="object-contain" />
      </div>
    );
  });

  const indexDots = imgs.map((img, index) => {
    return (
      <button
        key={uuidv4()}
        className={`w-3 h-3 rounded-full border-none cursor-pointer mr-2 last:mr-0 ${
          indexOfCurrentImg === index ? "bg-slate-200" : "bg-slate-400"
        }`}
        onClick={() => setIndexOfCurrentImg(index)}
      >
        &nbsp;
      </button>
    );
  });

  const rightMoveHandler = () => {
    if (indexOfCurrentImg === imgs.length - 1) {
      return;
    }
    setIndexOfCurrentImg((prevState) => {
      return prevState + 1;
    });
  };

  const leftMoveHandler = () => {
    if (indexOfCurrentImg === 0) {
      return;
    }
    setIndexOfCurrentImg((prevState) => {
      return prevState - 1;
    });
  };

  return (
    <div
      className={`w-[${size}rem] h-[${size}rem] relative shrink-0 border border-slate-500`}
    >
      <button
        className="absolute left-0 top-1/2 z-10 p-3 translate-y-[-50%] text-white bg-black"
        onClick={leftMoveHandler}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <div className=" w-full h-full overflow-hidden absolute top-0">
        <div
          className="w-full h-full flex flex-row transition-all"
          style={imgTransition}
        >
          {imgList}
        </div>
        <div className="sticky inline-block bottom-0 left-1/2 translate-x-[-50%]">
          {indexDots}
        </div>
      </div>
      <button
        className="absolute right-0 top-1/2 z-10 p-3 translate-y-[-50%] text-white bg-black"
        onClick={rightMoveHandler}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default Gallery;
