import React from "react";

import { useSendLogoutMutation } from "../features/api/apiSlice";
import { useNavigate } from "react-router-dom";

const NavButton = ({ buttonName }) => {
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await sendLogout();
    navigate("/");
  };

  const logout = buttonName === "Logout" ? () => handleLogout() : null;
  return (
    <button className="nav-button" onClick={logout}>
      {buttonName}
    </button>
  );
};

export default NavButton;
