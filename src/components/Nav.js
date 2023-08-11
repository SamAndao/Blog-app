import React from "react";
import NavButton from "./NavButton";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = ({ search, setSearch }) => {
  const { username, userId } = useSelector((state) => state.auth);

  return (
    <nav className="nav">
      <input
        type="text"
        className="nav-input"
        placeholder="Search Posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <NavLink to="">
        <NavButton buttonName="Home" />
      </NavLink>
      <NavLink to="new-post">
        <NavButton buttonName="New Post" />
      </NavLink>
      <NavLink to="about">
        <NavButton buttonName="About" />
      </NavLink>
      {!username && !userId ? (
        <>
          <NavLink to="register">
            <NavButton buttonName="Register" />
          </NavLink>
          <NavLink to="login">
            <NavButton buttonName="Login" />
          </NavLink>{" "}
        </>
      ) : (
        <>
          <NavLink to={`user/${userId}`}>
            <NavButton buttonName="Profile" />
          </NavLink>
          <NavButton buttonName="Logout" />
        </>
      )}
    </nav>
  );
};

export default Nav;
