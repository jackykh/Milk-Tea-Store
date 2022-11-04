import React, { ReactElement, useState } from "react";

interface accordionPropsType {
  title: string;
  content: Array<ReactElement>;
  footer: Array<ReactElement>;
  className?: string;
}

const Accordion: React.FC<accordionPropsType> = (props) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className={`w-full rounded-lg bg-purple-50 p-10 flex-col overflow-hidden transition-[max-height] duration-1000 ease-out border border-solid border-gray-600 ${props.className}`}
      style={{ maxHeight: showDetail ? "60rem" : "16rem" }}
    >
      <div className="p-2 border-b border-solid border-gray-600 mb-2 flex justify-between items-center">
        <h1>{props.title}</h1>
        <button
          className="h-[1.5rem] w-[1.5rem] border-solid border-black border-t-2 border-r-2 transition-all"
          style={{
            transform: showDetail ? "rotate(135deg)" : "rotate(-45deg)",
          }}
          onClick={() => setShowDetail((prevState) => !prevState)}
        />
      </div>
      {showDetail && props.content}
      {props.footer}
    </div>
  );
};

export default Accordion;
