import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
const Updatepassword = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server or perform validation)
    // You can access the form values using the respective state variables (name, email, password, department, phoneNumber)
    // Add your logic here
    if (password === confirmpassword) {
      console.log(password);
      axios
        .post(
          "http://localhost:8080/api/v1/auth/updatepassword",
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
          console.log(response.data);

          enqueueSnackbar("Password updated Successfully", {
            variant: "success",
            autoHideDuration: 5000,
          });
          navigate("/login");
        })
        .catch(function (err) {
          // console.log(err.data);
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
          <button type="submit">Update password</button>
        </form>
      </div>
    </div>
  );
};

export default Updatepassword;
