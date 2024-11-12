import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import logo from "./logo.png";
import { TailSpin } from "react-loader-spinner";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    //console.log(`${process.env.React_App_Backend_Url}`);
    setLoading(true);
    e.preventDefault();
    // Handle form submission here (e.g., send data to server or perform validation)
    // You can access the form values using the respective state variables (name, email, password, department, phoneNumber)
    // Add your logic here
    axios
      .post(`${process.env.React_App_Backend_Url}/api/v1/auth/register`, {
        name: name,
        email: email,
        password: password,
        department: department,
        phoneno: phoneno,
      })
      .then(function (response) {
        enqueueSnackbar(response.data.token, {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/");
      })
      .catch(function (err) {
        setLoading(false);
      });
  };

  return (
    <div className="body">
      <div className="logo-heading-container">
        <img
          src={logo}
          alt="User icon"
          className="logo"
          style={{ marginRight: "20px" }}
        ></img>
        <h1 style={{ color: "white" }}>Student Management System</h1>
      </div>
      <div className="register-container">
        <h2>Faculty Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical and Electronics Engineering">
                Electrical and Electronics Engineering
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Electronics and Communications Engineering">
                Electronics and Communications Engineering
              </option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
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
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
