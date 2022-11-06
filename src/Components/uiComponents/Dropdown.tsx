import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

interface dropdownListType {
  link: { [path: string]: string };
  className?: string;
  onClose: (clickedItem: Node) => void;
}

function useCloseDropdownWhenClickedOutside(
  ref: React.RefObject<HTMLElement>,
  onClose: (clickedItem: Node) => void
) {
  useEffect(() => {
    /**
     * close the dropdown if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      const clickedItem = event.target as Node;
      if (ref.current && !ref.current.contains(clickedItem)) {
        onClose(clickedItem);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose]);
}

const Dropdown: React.FC<dropdownListType> = (props) => {
  const wrapperRef = useRef(null);
  useCloseDropdownWhenClickedOutside(wrapperRef, props.onClose);
  const listItems = Object.entries(props.link).map(([path, title]) => {
    return (
      <li className="mb-3" key={uuidv4()}>
        <Link to={`../${path}`} className="w-full block group">
          <span className="border-b border-transparent group-hover:border-gray-400 ">
            {title}
          </span>
        </Link>
      </li>
    );
  });

  return (
    <motion.ul
      ref={wrapperRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`w-[20rem] p-6 bg-gray-100 absolute rounded-xl before:content-[''] before:absolute before:bottom-[100%] before:w-6 before:h-6 before:bg-gray-100 before:left-[50%] before:translate-x-[-50%] before:triangle ${props.className}`}
    >
      {listItems}
    </motion.ul>
  );
};

export default Dropdown;
