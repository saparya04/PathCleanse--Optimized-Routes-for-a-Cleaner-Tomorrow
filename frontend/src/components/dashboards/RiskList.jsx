import React, { useEffect, useState } from "react";
import axios from "axios";

const RiskList = () => {
  const [riskScores, setRiskScores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/academic-score/students/latest-risk-scores");
        const students = res.data;

        const studentsWithScores = await Promise.all(
          students.map(async (student) => {
            let attendanceRiskScore = 0;
            let flagRiskScore = 0;

            try {
              const attendanceRes = await axios.get(
                `http://localhost:5000/api/attendance/student/${student.studentId}/risk-score`
              );
              attendanceRiskScore = attendanceRes.data.totalRiskScore || 0;
            } catch (err) {
              attendanceRiskScore = 0;
            }

            try {
              const flagRes = await axios.get(
                `http://localhost:5000/api/flag-students/student/${encodeURIComponent(student.name.trim())}/flag-score`
              );
              flagRiskScore = flagRes.data.flagRiskScore || 0;
            } catch (err) {
              flagRiskScore = 0;
            }

            const totalRiskScore = 
  Number(student.riskScore) + 
  Number(attendanceRiskScore) + 
  Number(flagRiskScore);


            // OPTIONAL: Update student model with totalRiskScore in DB
          try {
  const res = await axios.put(`http://localhost:5000/api/auth/${student.studentId}/total-risk`, {
  totalRiskScore:Number(totalRiskScore),
});

  console.log("Updated in DB:", res.data); // ✅ Add this
} catch (err) {
  console.error("Failed to update totalRiskScore in DB", err.response?.data || err.message);
}

            return {
              ...student,
              attendanceRiskScore,
              flagRiskScore,
              totalRiskScore
            };
          })
        );

        const sortedData = studentsWithScores.sort((a, b) => a.name.localeCompare(b.name));
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
      <h2>Student Academic, Flag, Attendance & Total Risk Scores</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Academic Risk Score</th>
            <th>Flag Risk Score</th>
            <th>Attendance Risk Score</th>
            <th>Total Risk Score</th> {/* New column */}
          </tr>
        </thead>
        <tbody>
          {riskScores.map((student) => (
            <tr key={student.studentId}>
              <td>{student.name}</td>
              <td>{student.riskScore}</td>
              <td>{student.flagRiskScore}</td>
              <td>{student.attendanceRiskScore}</td>
              <td>{student.totalRiskScore}</td> {/* New data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskList;
