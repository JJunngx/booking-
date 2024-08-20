import React from "react";
const FooterList = (props) => {
  return (
    <ul className="list-unstyled col">
      {props.col_values.map((link, index) => (
        <li className="mb-2" key={index}>
          <a href="#" className="text-decoration-none">
            {link}
          </a>
        </li>
      ))}
    </ul>
  );
};
export default FooterList;
