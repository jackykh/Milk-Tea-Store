import { forwardRef } from "react";

interface searchType {
  placeholder: string;
  onClick?: () => void;
}

const Search = forwardRef<HTMLInputElement, searchType>((props, ref) => {
  return (
    <div className="w-[35rem] flex">
      <input
        type="search"
        ref={ref}
        placeholder={props.placeholder}
        className="w-[90%] p-8 mr-[-3rem] rounded-[100px] h-[3.5rem] bg-gray-200 transition-all focus:outline focus:outline-2 focus:outline-purple-200 focus:bg-white focus:w-[100%]"
      />
      <button onClick={props.onClick}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
});

export default Search;
