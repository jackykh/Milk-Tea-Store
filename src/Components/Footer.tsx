import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="h-30 w-full py-10 shrink-0 text-3xl text-neutral-500">
      <div className="flex justify-between items-center h-full">
        <ul className="flex [&>*]:mr-4">
          <li>Github @jackiecheunq 2022</li>
          <li>
            <Link to="home"> • Credits</Link>
          </li>
          <li>
            <Link to="home">• Legals</Link>
          </li>
        </ul>
        <Link to="home">
          <i className="fa-brands fa-instagram mr-4 text-purple-900"></i>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
