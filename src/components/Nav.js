import React, { useState } from "react";
import NavButton from "./NavButton";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const navigate = useNavigate();
  const { username, userId } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?value=${search}`);
  };

  return (
    <nav className="nav">
      <form onSubmit={(e) => handleSearch(e)} className="nav-form">
        <input
          type="text"
          className="nav-input"
          placeholder="Search posts or users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="nav-search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
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
