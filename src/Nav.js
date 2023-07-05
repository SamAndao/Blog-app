import React from "react";
import NavButton from "./NavButton";
import { NavLink } from "react-router-dom";

const Nav = ({ search, setSearch }) => {
  return (
    <nav className="nav">
      <input
        type="text"
        className="nav-input"
        placeholder="Search Posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <NavLink to="/Blog-app">
        <NavButton buttonName="Home" />
      </NavLink>
      <NavLink to="newpost">
        <NavButton buttonName="Post" />
      </NavLink>
      <NavLink to="about">
        <NavButton buttonName="About" />
      </NavLink>
    </nav>
  );
};

export default Nav;
