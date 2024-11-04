import React, { useState } from "react";
import "../_styles/login.scss";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import axios from "axios";

const Login = ({ onClose }) => {
  const [showReg, setShowReg] = useState(true);
  const [formData, setData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const changeData = (e) => {
    setData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {
    const apiReq = await axios.post("http://localhost:8080/v1/user");
  };
  return (
    <div className="login-container flex" onClick={onClose}>
      <div
        className="login-wrapper flex col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="form-container flex col">
          {showReg ? (
            <div className="input-wrap flex">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={changeData}
              />
            </div>
          ) : (
            this
          )}
          {showReg ? (
            <div className="input-wrap flex">
              <label htmlFor="username">Phone</label>
              <input
                type="text"
                value={formData.phone_number}
                name="phone_number"
                onChange={changeData}
              />
            </div>
          ) : (
            this
          )}
          <div className="input-wrap flex">
            <label htmlFor="email">{showReg ? "Email" : "email/phone"}</label>
            <input
              type="text"
              value={formData.email}
              name="email"
              onChange={changeData}
            />
          </div>
          <div className="input-wrap flex">
            <label htmlFor="email">Password</label>
            <input
              type="text"
              value={formData.password}
              name="password"
              onChange={changeData}
            />
          </div>
          {showReg ? (
            <button onClick={() => console.log(formData)}>REGISTER</button>
          ) : (
            <button>LOGIN</button>
          )}
          <div className="text flex">
            <span>OR</span>
          </div>
          <div className="sso-opt flex">
            <div className="icon flex">
              <FaGoogle />
            </div>
            <div className="icon flex">
              <FaFacebook />
            </div>
            <div className="icon flex">
              <BsTwitterX />
            </div>
            {showReg ? (
              <button
                className="btn-reg flex"
                onClick={() => setShowReg(false)}
              >
                LOGIN
              </button>
            ) : (
              <button className="btn-reg flex" onClick={() => setShowReg(true)}>
                register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
