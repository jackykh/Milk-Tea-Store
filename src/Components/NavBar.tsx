import React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC<{ link: { [path: string]: string } }> = (props) => {
  const nonActiveClass = "h-full flex justify-center items-center";
  const activeClassName =
    nonActiveClass + " border-solid border-b-4 border-b-purple-900";

  const navItems = Object.entries(props.link).map(([path, title], index) => {
    return (
      <li
        className="h-full text-3xl text-purple-900 mr-28 last:mr-0"
        key={index}
      >
        <NavLink
          className={({ isActive }) =>
            isActive ? activeClassName : nonActiveClass
          }
          to={path}
        >
          {title}
        </NavLink>
      </li>
    );
  });
  return (
    <nav className="h-32 w-full  shrink-0 ">
      <ul className="flex justify-center items-center h-full">{navItems}</ul>
    </nav>
  );
};

export default NavBar;
