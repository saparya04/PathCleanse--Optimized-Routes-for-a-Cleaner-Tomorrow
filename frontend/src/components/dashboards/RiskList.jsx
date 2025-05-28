import React, { useEffect, useState } from "react";
import axios from "axios";

const RiskList = () => {
  const [riskScores, setRiskScores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch academic risk scores
        const res = await axios.get("http://localhost:5000/api/academic-score/students/latest-risk-scores");
        const students = res.data;

        // Step 2: For each student, fetch attendance risk score
        // Use Promise.all to fetch all in parallel
        const studentsWithAttendance = await Promise.all(
          students.map(async (student) => {
            try {
              const attendanceRes = await axios.get(
                `http://localhost:5000/api/attendance/student/${student.studentId}/risk-score`
              );

              return {
                ...student,
                attendanceRiskScore: attendanceRes.data.totalRiskScore || 0,
              };
            } catch (err) {
              // If attendance fetch fails, default to 0
              return { ...student, attendanceRiskScore: 0 };
            }
          })
        );

        // Step 3: Sort alphabetically by student name
        const sortedData = studentsWithAttendance.sort((a, b) => a.name.localeCompare(b.name));
        setRiskScores(sortedData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch risk scores.");
      }
    };

    fetchData();
  }, []);

  if (error) return <div><h2>{error}</h2></div>;
  if (riskScores.length === 0) return <div><h2>Loading...</h2></div>;

  return (
    <div>
      <h2>Student Academic & Attendance Risk Scores</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Academic Risk Score</th>
            <th>Attendance Risk Score</th>
          </tr>
        </thead>
        <tbody>
          {riskScores.map((student) => (
            <tr key={student.studentId}>
              <td>{student.name}</td>
              <td>{student.riskScore}</td>
              <td>{student.attendanceRiskScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskList;
