import React from "react";

const NavButton = ({ buttonName, href }) => {
  return (
    <button className="nav-button" href={href}>
      {buttonName}
    </button>
  );
};

export default NavButton;
