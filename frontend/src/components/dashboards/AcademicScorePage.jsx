import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BackgroundLines } from "../BackgroundLines.jsx";

const studentNames = [
  "acelin nazareth", "aditya rathod", "aishwarya sreejith", "anushka patil",
  "carol lobo", "claven coutinho", "keith zidan", "kevin rozario",
  "lenroy dsouza", "lincy dcosta", "raiyan shaikh", "sarah ger",
  "saparya dey", "shruti shirvatkar", "teresa raj", "vansh kadam"
];

const AcademicScorePage = () => {
  const [scores, setScores] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const initialScores = {};
    studentNames.forEach((name) => {
      initialScores[name] = {
        dropMarks: false,
        noAssignment: false,
        noParticipation: false,
        normal: false,
      };
    });
    setScores(initialScores);

    // Check if already submitted
    axios
      .get(`http://localhost:5000/api/academic-score/check-submission?date=${today}`)
      .then((res) => {
        if (res.data.alreadySubmitted) {
          setSubmitted(true);
          localStorage.setItem("academicScoreSubmitted", "true");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (name, field) => {
    setScores((prev) => {
      const updated = { ...prev[name] };
      if (field === "normal") {
        const wasNormal = updated.normal;
        updated.normal = !wasNormal;
        if (updated.normal) {
          updated.dropMarks = false;
          updated.noAssignment = false;
          updated.noParticipation = false;
        }
      } else {
        if (updated.normal) return prev;
        updated[field] = !updated[field];
      }
      return { ...prev, [name]: updated };
    });
  };

  const validateForm = () => {
    for (const name of studentNames) {
      const s = scores[name];
      if (
        !s.normal &&
        !s.dropMarks &&
        !s.noAssignment &&
        !s.noParticipation
      ) {
        alert(`Please select at least one option for ${name}`);
        return false;
      }
    }
    return true;
  };
const handleSubmitAll = async () => {
  if (!validateForm()) return;
  const teacherId = localStorage.getItem("teacherId");
  console.log("Stored teacherId in localStorage:", teacherId);

  if (!teacherId) {
    alert("Teacher ID not found. Please login again.");
    navigate("/login/teacher");
    return;
  }
  try {
    const submissionData = studentNames.map((name) => {
      const student = scores[name];
      const riskScore = 
        (student.dropMarks ? 20 : 0) +
        (student.noAssignment ? 10 : 0) +
        (student.noParticipation ? 10 : 0);

      return {
        studentName: name,
        dropMarks: student.dropMarks,
        noAssignment: student.noAssignment,
        noParticipation: student.noParticipation,
        normal: student.normal,
        riskScore: riskScore,
      };
    });
    const payload = {
  date: today,
  submittedBy: teacherId, // Replace with actual teacher ID
  scores: submissionData,
};

console.log(payload);
    await axios.post("http://localhost:5000/api/academic-score", payload);

    alert("Academic scores submitted and stored successfully.");
    localStorage.setItem("academicScoreSubmitted", "true");
    setSubmitted(true);
    navigate("/dashboard/teacher");
  } catch (err) {
    console.error(err);
    alert("Submission failed.");
  }
};

  

  const goToMainMenu = () => {
    navigate("/dashboard/teacher");
  };

  if (submitted || localStorage.getItem("academicScoreSubmitted") === "true") {
    return (
      <div>
        <h2>Academic Score Already Submitted for Today</h2>
        <button onClick={goToMainMenu}>Go to Main Menu</button>
      </div>
    );
  }

  return (
  <div className="relative w-full min-h-screen">
    {/* Background lines */}
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      {/* If you want the same background lines */}
      <BackgroundLines />
    </div>

    {/* Foreground content */}
    <div className="relative z-10 p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Academic Score Evaluation</h2>

      <table
        border="1"
        cellPadding="8"
        className="w-full bg-black text-white border border-black shadow-md rounded-md"
      >
        <thead>
          <tr>
            <th className="text-center">Student</th>
            <th className="text-center">Drop in Marks</th>
            <th className="text-center">No Assignment</th>
            <th className="text-center">No Participation</th>
            <th className="text-center">Normal</th>
          </tr>
        </thead>
        <tbody>
          {studentNames.map((name) => (
            <tr key={name}>
              <td className="text-center">{name}</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={scores[name]?.dropMarks || false}
                  onChange={() => handleChange(name, "dropMarks")}
                  disabled={submitted}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={scores[name]?.noAssignment || false}
                  onChange={() => handleChange(name, "noAssignment")}
                  disabled={submitted}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={scores[name]?.noParticipation || false}
                  onChange={() => handleChange(name, "noParticipation")}
                  disabled={submitted}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={scores[name]?.normal || false}
                  onChange={() => handleChange(name, "normal")}
                  disabled={submitted}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Submit Button */}
      <button
        onClick={handleSubmitAll}
        disabled={submitted}
        style={{
          marginTop: "20px",
          backgroundColor: submitted ? "#ccc" : "#4caf50",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "10px 20px",
          fontSize: "18px"
        }}
      >
        Submit Scores
      </button>

      <br /><br />
      <button
        onClick={goToMainMenu}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded block mx-auto"
      >
        Go to Main Menu
      </button>
    </div>
  </div>
);

};

export default AcademicScorePage;
