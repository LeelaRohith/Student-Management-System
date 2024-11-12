import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import axios from "axios";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { TailSpin } from "react-loader-spinner";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // Handle form submission here (e.g., send data to server or perform validation)
    // You can access the form values using the respective state variables (name, email, password, department, phoneNumber)
    // Add your logic here
    axios
      .post(`${process.env.React_App_Backend_Url}/api/v1/auth/authenticate`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        enqueueSnackbar("Login Success", {
          variant: "success",
          autoHideDuration: 5000,
        });
        navigate("/homepage");
      })
      .catch(function (err) {
        setLoading(false);

        enqueueSnackbar("Invalid Credentials", {
          variant: "error",
          autoHideDuration: 1000,
        });
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
        <h1 style={{ color: "white" }}>
          Student Management <br></br>System
        </h1>
      </div>
      <div className="login-container">
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
          <a href="/register">
            Don't have an account ?<br></br>Click Here to Register
          </a>
          <br></br>
          <a href="/forgotpassword">Forgot password</a>
          <br></br>
          <button
            type="submit"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 20px",
            }}
          >
            {loading ? (
              <div>
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
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
