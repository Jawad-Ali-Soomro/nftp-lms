import React, { useState } from "react";
import "../_styles/header.scss";
import { Login } from "../_pages";

const Header = () => {
  const [showLogin, setShowLogin] = useState(true);
  const onClose = () => setShowLogin(false);
  return (
    <div className="header-container flex">
      <div className="logo flex">
        {" "}
        <img src="/logo.png" alt="" />
      </div>
      <div className="navs flex">
        <button onClick={() => setShowLogin(true)}>LOGIN</button>
      </div>
      {showLogin && <Login onClose={onClose} />}
    </div>
  );
};

export default Header;
