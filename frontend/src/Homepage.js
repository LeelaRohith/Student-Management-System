import React, { useEffect, useState } from "react";
import "./Homepage.css"; // Import the CSS file for styling
import icon from "./icon.png";
import axios from "axios";
import { useSnackbar } from "notistack";
import { TailSpin } from "react-loader-spinner";
const Homepage = () => {
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddStudentPopup, setShowAddStudentPopup] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedEditStudent, setSelectedEditStudent] = useState(null);
  const [currentUserEmail, setCurrrentuseremail] = useState("");
  const [currentUserId, setCurrrentuserid] = useState("");
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNumber: "",
    department: "",
    year: "",
    semester: "",
    phoneNumber: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const handleAddStudent = () => {
    setShowAddStudentPopup(true);
  };
  const fetchData = async () => {
    const res = await axios.get(
      `${process.env.React_App_Backend_Url}/api/v1/faculty/currentuser`,
      { headers }
    );

    //(response.data);
    setCurrrentuseremail(res.data.email);
    setCurrrentuserid(res.data.id);
    const studentsResponse = await axios.get(
      `${process.env.React_App_Backend_Url}/api/v1/faculty/currentuserstudents/` +
        res.data.id,
      {
        headers,
      }
    );
    setStudents(studentsResponse.data);
  };
  useEffect(() => {
    fetchData();
  });

  const handleFormSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    // Add the new student to the list of students
    // Reset the form fields
    axios
      .post(
        `${process.env.React_App_Backend_Url}/api/v1/addstudent/` +
          currentUserId,
        newStudent,
        { headers }
      )
      .then(function (response) {
        //(response.data);
        setLoading(false);
        enqueueSnackbar(response.data.text, {
          variant: "success",
          autoHideDuration: 5000,
        });
      })
      .catch(function (err) {
        setLoading(false);
      });
    setNewStudent({
      name: "",
      rollNumber: "",
      department: "",
      year: "",
      semester: "",
      phoneNumber: "",
    });
    // Close the Add Student popup
    setShowAddStudentPopup(false);
  };
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server or perform validation)
    // You can access the form values using the newStudent state variable
    // Add your logic here

    // Add the new student to the list of students
    // Reset the form fields
    axios
      .put(
        `${process.env.React_App_Backend_Url}/api/v1/editstudent/` +
          currentUserId,
        editStudent,
        { headers }
      )
      .then(function (response) {
        //(response.data);
        enqueueSnackbar(response.data.text, {
          variant: "success",
          autoHideDuration: 5000,
        });
      })
      .catch(function (err) {});
    setEditStudent({
      name: "",
      rollNumber: "",
      department: "",
      year: "",
      semester: "",
      phoneNumber: "",
    });
    // Close the Add Student popup
    setSelectedEditStudent(null);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleDeleteStudent = (student) => {
    axios
      .post(
        `${process.env.React_App_Backend_Url}/api/v1/deletestudent/` +
          currentUserId,
        {
          name: student.name,
          rollNumber: student.rollNumber,
          department: student.department,
          year: student.year,
          semester: student.semester,
          phoneNumber: student.phoneNumber,
        },
        {
          headers,
        }
      )
      .then(function (response) {
        enqueueSnackbar(response.data.text, {
          variant: "success",
          autoHideDuration: 5000,
        });
      })
      .catch(function (err) {});
  };
  const handleEditStudent = (student) => {
    setSelectedEditStudent(student);
    setEditStudent({
      name: student.name,
      rollNumber: student.rollNumber,
      department: student.department,
      year: student.year,
      semester: student.semester,
      phoneNumber: student.phoneNumber,
    });
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <h2>Student Management System</h2>
        </div>
        <br></br>
        <div className="navbar-right">
          <img className="user-icon" src={icon} alt="User icon"></img>
          <span>{currentUserEmail}</span>
        </div>
      </nav>

      <div className="container">
        <button className="add-student-button" onClick={handleAddStudent}>
          Add Student
        </button>

        {showAddStudentPopup && (
          <div className="popup">
            <form className="popup-content" onSubmit={handleFormSubmit}>
              <h2>Add Student</h2>
              <div className="form-group">
                <label htmlFor="name">Student Name:</label>
                <input
                  type="text"
                  id="name"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rollNumber">Roll Number:</label>
                <input
                  type="text"
                  id="rollNumber"
                  value={newStudent.rollNumber}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, rollNumber: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="departmnent">Department:</label>
                <select
                  id="department"
                  value={newStudent.department}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, department: e.target.value })
                  }
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical Engineering">
                    Electrical and Electronics Engineering
                  </option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Electronics and communication Engineering">
                    Electronics and communication Engineering
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="year">Year:</label>
                <input
                  type="text"
                  id="year"
                  value={newStudent.year}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, year: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="semester">Semester:</label>
                <input
                  type="text"
                  id="section"
                  value={newStudent.semester}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, semester: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={newStudent.phoneNumber}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {selectedStudent && (
          <div className="popup">
            <div className="popup-content">
              <h2>Student Details</h2>
              <div className="student-details-popup">
                <p>Name: {selectedStudent.name}</p>
                <p>Roll Number: {selectedStudent.rollNumber}</p>
                <p>Department: {selectedStudent.department}</p>
                <p>Year: {selectedStudent.year}</p>
                <p>Semester: {selectedStudent.semester}</p>
                <p>Phone Number: {selectedStudent.phoneNumber}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button onClick={() => setSelectedStudent(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {selectedEditStudent && (
          <div className="popup">
            <div className="popup-content">
              <form onSubmit={handleEditFormSubmit}>
                <h2>Edit Student</h2>
                <div className="form-group">
                  <label htmlFor="editName">Student Name:</label>
                  <input
                    type="text"
                    id="editName"
                    value={editStudent.name}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editRollNumber">Roll Number:</label>
                  <input
                    type="text"
                    id="editRollNumber"
                    value={editStudent.rollNumber}
                    onChange={(e) =>
                      setEditStudent({
                        ...editStudent,
                        rollNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editDepartment">Department:</label>
                  <select
                    id="editDepartment"
                    value={editStudent.department}
                    onChange={(e) =>
                      setEditStudent({
                        ...editStudent,
                        department: e.target.value,
                      })
                    }
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
                  <label htmlFor="editYear">Year:</label>
                  <input
                    type="text"
                    id="editYear"
                    value={editStudent.year}
                    onChange={(e) =>
                      setEditStudent({ ...editStudent, year: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editSemester">Semester:</label>
                  <input
                    type="text"
                    id="editSemester"
                    value={editStudent.semester}
                    onChange={(e) =>
                      setEditStudent({
                        ...editStudent,
                        semester: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editPhoneNumber">Phone Number:</label>
                  <input
                    type="text"
                    id="editPhoneNumber"
                    value={editStudent.phoneNumber}
                    onChange={(e) =>
                      setEditStudent({
                        ...editStudent,
                        phoneNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button type="submit" style={{ margin: "20px" }}>
                    Save
                  </button>
                  <button onClick={() => setSelectedEditStudent(null)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="student-list">
          {students.map((student) => (
            <div className="student-card" key={student.rollNumber}>
              <div className="student-details">
                <p>Name: {student.name}</p>
                <p>Roll Number: {student.rollNumber}</p>
                <p>Department: {student.department}</p>
              </div>
              <div className="student-actions">
                <button onClick={() => handleViewStudent(student)}>View</button>
                <button onClick={() => handleEditStudent(student)}>Edit</button>
                <button onClick={() => handleDeleteStudent(student)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
