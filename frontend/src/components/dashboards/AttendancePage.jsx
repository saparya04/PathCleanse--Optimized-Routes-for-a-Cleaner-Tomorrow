import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AttendancePage() {
  const navigate = useNavigate();
  const students = [
    "aishwarya sreejith", "saparya dey", "claven coutinho", "keith zidan",
    "lenroy dsouza", "vansh kadam", "sarah ger", "kevin rozario",
    "aditya rathod", "carol lobo", "acelin nazareth", "raiyan shaikh",
    "anushka patil", "shruti shirvatkar", "lincy dcosta", "teresa raj"
  ].sort();

  const [attendance, setAttendance] = useState({});
  const [submittedToday, setSubmittedToday] = useState(false);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  useEffect(() => {
    // check if already submitted
    axios.get(`/api/attendance/${today}`)
      .then(res => {
        if (res.data.submitted) {
          setSubmittedToday(true);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (name, value) => {
    setAttendance((prev) => ({ ...prev, [name]: value }));
  };

  const allMarked = students.every(name => attendance[name]);

  const handleSubmit = async () => {
    if (!allMarked || submittedToday) return;

    try {
      await axios.post("/api/attendance", {
        date: today,
        records: attendance
      });
      alert("Attendance submitted!");
      setAttendance({});
      setSubmittedToday(true);
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Attendance already submitted today!");
        setSubmittedToday(true);
      } else {
        alert("Submission failed.");
      }
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      {submittedToday && (
        <p style={{ color: "green" }}>Attendance already submitted for today.</p>
      )}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Present</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {students.map((name) => (
            <tr key={name}>
              <td>{name}</td>
              <td>
                <input
                  type="radio"
                  name={name}
                  value="Present"
                  checked={attendance[name] === "Present"}
                  onChange={() => handleChange(name, "Present")}
                  disabled={submittedToday}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={name}
                  value="Absent"
                  checked={attendance[name] === "Absent"}
                  onChange={() => handleChange(name, "Absent")}
                  disabled={submittedToday}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        disabled={!allMarked || submittedToday}
        style={{ marginTop: "20px", backgroundColor: submittedToday ? "#ccc" : "#4caf50" }}
      >
        Submit Attendance
      </button>

      <br /><br />
      <button onClick={() => navigate("/dashboard/teacher")}>Go back to Main Menu</button>
    </div>
  );
}
