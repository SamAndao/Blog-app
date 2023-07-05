import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";

const RootLayout = ({ search, setSearch }) => {
  return (
    <div className="rootLayout">
      <Header />
      <Nav search={search} setSearch={setSearch} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
