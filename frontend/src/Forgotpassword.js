import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { TailSpin } from "react-loader-spinner";
const Forgotpassword = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [email, setEmail] = useState("");
  const [sentotp, setSentotp] = useState(false);
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  // const [otpresponse, setOtpresponse] = useState({
  //   text: " ",
  //   otpAuthentication: " ",
  // });
  const navigate = useNavigate();
  //const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(
        `${process.env.React_App_Backend_Url}/api/v1/auth/resetpassword`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        setLoading(false);
        setMsg(response.data.text);
        setSentotp(response.data.userExists);
      })
      .catch(function (err) {
        setLoading(false);
      });
  };
  const handleSubmit1 = (e) => {
    setLoading1(true);
    e.preventDefault();
    axios
      .post(
        `${process.env.React_App_Backend_Url}/api/v1/auth/validateotp`,
        {
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        if (response.data.otpAuthentication) {
          navigate("/updatepassword");
        }
        setLoading1(false);
      })
      .catch(function (err) {
        setLoading1(false);
      });
  };
  return (
    <div className="body">
      <div className="logo-heading-container">
        <img
          className="logo"
          src={logo}
          alt="User icon"
          style={{ marginRight: "20px" }}
        ></img>
        <h1 style={{ color: "white" }}>Student Management System</h1>
      </div>
      <div className="register-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <p style={{ textAlign: "center" }}>{msg}</p>
          </div>
          <button
            type="submit"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 20px", // Adjust padding as needed
              // Add any other styles you need for the button
            }}
          >
            {loading ? (
              <TailSpin
                visible={loading}
                height="20"
                width="20"
                color="white"
                ariaLabel="tail-spin-loading"
                radius="2"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "SEND OTP"
            )}
          </button>
        </form>
        {sentotp ? (
          <form onSubmit={handleSubmit1}>
            <br></br>
            <div className="form-group">
              <label>Enter OTP:</label>
              <input
                id="email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px 20px", // Adjust padding as needed
                // Add any other styles you need for the button
              }}
            >
              {loading1 ? (
                <TailSpin
                  visible={loading1}
                  height="20"
                  width="20"
                  color="white"
                  ariaLabel="tail-spin-loading"
                  radius="2"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "RESET PASSWORD"
              )}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default Forgotpassword;
