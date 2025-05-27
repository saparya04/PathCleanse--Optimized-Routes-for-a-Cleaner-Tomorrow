import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h2>Academic Score Evaluation</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Student</th>
            <th>Drop in Marks</th>
            <th>No Assignment</th>
            <th>No Participation</th>
            <th>Normal</th>
          </tr>
        </thead>
        <tbody>
          {studentNames.map((name) => (
            <tr key={name}>
              <td>{name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={scores[name]?.dropMarks || false}
                  onChange={() => handleChange(name, "dropMarks")}
                  disabled={scores[name]?.normal}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={scores[name]?.noAssignment || false}
                  onChange={() => handleChange(name, "noAssignment")}
                  disabled={scores[name]?.normal}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={scores[name]?.noParticipation || false}
                  onChange={() => handleChange(name, "noParticipation")}
                  disabled={scores[name]?.normal}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={scores[name]?.normal || false}
                  onChange={() => handleChange(name, "normal")}
                  disabled={
                    scores[name]?.dropMarks ||
                    scores[name]?.noAssignment ||
                    scores[name]?.noParticipation
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={handleSubmitAll} disabled={submitted}>
        Submit
      </button>{" "}
      <button onClick={goToMainMenu}>Go to Main Menu</button>
    </div>
  );
};

export default AcademicScorePage;
