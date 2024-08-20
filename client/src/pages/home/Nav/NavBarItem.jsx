import React from "react";

const NavBarItem = (props) => {
  return (
    <li>
      <a
        href="#"
        className={`${
          props.active ? "active border border-white rounded-pill" : ""
        }  text-white text-decoration-none p-2`}
        onClick={props.onClick}
      >
        <span className={`fa ${props.icon} me-1`}></span> {props.type}
      </a>
    </li>
  );
};

export default NavBarItem;
