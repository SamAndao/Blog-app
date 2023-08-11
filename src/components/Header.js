import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { username } = useSelector((state) => state.auth);
  return (
    <header className="header">
      <NavLink to="/Blog-app">
        <h1>Blog It</h1>
      </NavLink>
      {username ? <h1 className="header__username">{username}</h1> : null}
    </header>
  );
};

export default Header;
