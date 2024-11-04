import React, { useState } from "react";
import "../_styles/login.scss";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import axios from "axios";

const Login = ({ onClose }) => {
  const [inp1, setinp1] = useState("");
  const [inp2, setinp2] = useState("");
  const [inp3, setinp3] = useState("");
  const [inp4, setinp4] = useState("");
  const [inp5, setinp5] = useState("");
  const [inp6, setinp6] = useState("");
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
  const [qrCode, setCode] = useState();
  const [errMessage, setMessage] = useState();
  const [SuccessMessage, setSuccess] = useState();

  const registerUser = async () => {
    if (
      !formData.email ||
      !formData.username ||
      !formData.phone_number ||
      !formData.password
    ) {
      setMessage("Please Fill All The Fields!");
      return;
    }
    try {
      const apiReq = await axios.post("http://localhost:8080/v1/user/new", {
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
      });

      if (apiReq.status === 200) {
        setMessage("Account Already Exists!");
      } else if (apiReq.status === 300) {
        setMessage("Error while creating account");
      } else if (apiReq.status == 201) {
        setCode(apiReq.data.qrCodeUrl);
        setMessage(null);
        setSuccess("Account Created. Verify Now!");
      } else {
        setMessage("Error While Account Creation");
      }
    } catch (error) {
      setMessage("An error occurred during registration.");
    }
  };

  return (
    <div className="login-container flex" onClick={onClose}>
      {qrCode ? (
        <div
          className="qr-code-opt flex col"
          onClick={(e) => e.stopPropagation()}
        >
          <h1>Verify Account!</h1>
          <p>
            scan following QR code to get 6 digits passcode on your mobile to
            verify your account!
          </p>
          <img src={qrCode} alt="" />
          <div className="inputs flex">
            <input
              type="text"
              value={inp1}
              onChange={(e) => setinp1(e.target.value)}
            />
            <input
              type="text"
              value={inp2}
              onChange={(e) => setinp2(e.target.value)}
            />
            <input
              type="text"
              value={inp3}
              onChange={(e) => setinp3(e.target.value)}
            />
            <input
              type="text"
              value={inp4}
              onChange={(e) => setinp4(e.target.value)}
            />
            <input
              type="text"
              value={inp5}
              onChange={(e) => setinp5(e.target.value)}
            />
            <input
              type="text"
              value={inp6}
              onChange={(e) => setinp6(e.target.value)}
            />
          </div>
          <div className="btns flex">
            <button>CLEAR</button>
            <button>Submit</button>
          </div>
        </div>
      ) : (
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
            {errMessage ? (
              <div className="err-message">
                <p>{errMessage}</p>
              </div>
            ) : (
              this
            )}
            {SuccessMessage ? (
              <div className="err-message">
                <p style={{ color: "royalblue" }}>{SuccessMessage}</p>
              </div>
            ) : (
              this
            )}
            {showReg ? (
              <button onClick={registerUser}>REGISTER</button>
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
                <button
                  className="btn-reg flex"
                  onClick={() => setShowReg(true)}
                >
                  register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
