import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import logo from "./logo.png";
const Updatepassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    // Handle form submission here (e.g., send data to server or perform validation)
    // You can access the form values using the respective state variables (name, email, password, department, phoneNumber)
    // Add your logic here
    if (password === confirmpassword) {
      axios
        .post(
          `${process.env.React_App_Backend_Url}/api/v1/auth/updatepassword`,
          {
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          enqueueSnackbar("Password updated Successfully", {
            variant: "success",
            autoHideDuration: 5000,
          });
          navigate("/");
        })
        .catch(function (err) {
          setLoading(false);
          // (err.data);
          // enqueueSnackbar("Invalid Credentials", {
          //   variant: "error",
          //   autoHideDuration: 1000,
          // });
        });
    } else {
      setStatus("passwords do not match");
    }
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
        <h2>Update Passowrd</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Enter New passowrd:</label>
            <input
              type="password"
              id="passowrd"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm New password :</label>
            <input
              type="password"
              id="confirmpassword"
              onChange={(e) => setConfirmpassword(e.target.value)}
              required
            />
          </div>
          <div>{status}</div>
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
              "UPDATE PASSWORD"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Updatepassword;
