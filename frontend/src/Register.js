import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import logo from "./logo.png";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server or perform validation)
    // You can access the form values using the respective state variables (name, email, password, department, phoneNumber)
    // Add your logic here
    axios
      .post("http://localhost:8080/api/v1/auth/register", {
        name: name,
        email: email,
        password: password,
        department: department,
        phoneno: phoneno,
      })
      .then(function (response) {
        console.log(response.data);
        enqueueSnackbar(response.data.token, {
          variant: "success",
          autoHideDuration: 1000,
        });
        navigate("/login");
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
