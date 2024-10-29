import React from "react";
import "../_styles/login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container flex">
      <div className="login-wrapper flex col">
        <Link to={"/"}>
          <img src="./logo.png" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
