import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [sentotp, setSentotp] = useState(false);
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");
  const [otpresponse, setOtpresponse] = useState({
    text: " ",
    otpAuthentication: " ",
  });
  const navigate = useNavigate();
  //const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server or perform validation)
    // You can access the form values using the respective state variables (name, email, password, department, phoneNumber)
    // Add your logic here
    axios
      .post(
        "http://localhost:8080/api/v1/auth/resetpassword",
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
        console.log("response");
        // console.log(email);
        // enqueueSnackbar(response.data.token, {
        //   variant: "success",
        //   autoHideDuration: 1000,
        // });
        setMsg(response.data.text);
        setSentotp(response.data.userExists);
      })
      .catch(function (err) {
        console.log(err.data);
      });
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server or perform validation)
    // You can access the form values using the respective state variables (name, email, password, department, phoneNumber)
    // Add your logic here
    axios
      .post(
        "http://localhost:8080/api/v1/auth/validateotp",
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
        // enqueueSnackbar(response.data.token, {
        //   variant: "success",
        //   autoHideDuration: 1000,
        // });
        console.log(response.data);

        setOtpresponse(response.data);
        if (response.data.otpAuthentication) {
          navigate("/updatepassword");
        }
      })
      .catch(function (err) {
        console.log(err.data);
      });
  };
  return (
    <div className="body">
      <div
        style={{
          marginLeft: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={logo}
          alt="User icon"
          style={{ width: "200px", height: "200px", marginRight: "20px" }}
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
          <button type="submit">Send OTP</button>
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
            <button type="submit">Reset Password</button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default Forgotpassword;
