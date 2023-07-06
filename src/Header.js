import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <NavLink to="/Blog-app">
        <h1>My Blog</h1>
      </NavLink>
    </header>
  );
};

export default Header;
