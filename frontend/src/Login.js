import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import axios from "axios";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server or perform validation)
    // You can access the form values using the respective state variables (name, email, password, department, phoneNumber)
    // Add your logic here
    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        enqueueSnackbar("Login Success", {
          variant: "success",
          autoHideDuration: 5000,
        });
        navigate("/homepage");
      })
      .catch(function (err) {
        console.log(err.data);
        enqueueSnackbar("Invalid Credentials", {
          variant: "error",
          autoHideDuration: 1000,
        });
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
        <h2>Faculty Login</h2>
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
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <a
            // onClick={() => {
            //   navigate("/forgotpassword");
            // }}
            href="/forgotpassword"
          >
            Forgot password
          </a>
          <br></br>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
