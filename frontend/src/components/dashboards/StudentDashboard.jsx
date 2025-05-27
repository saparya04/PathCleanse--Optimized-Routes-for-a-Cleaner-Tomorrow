import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import studentIdMap from "../../utils/studentIdMap";

const StudentDashboard = () => {
  const { studentId } = useParams(); // get /:studentId from route
  const [academicData, setAcademicData] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [flagData, setFlagData] = useState(null);
  const [error, setError] = useState("");

  const actualStudentId = studentIdMap[studentId] || studentId;

  useEffect(() => {
    // Academic Score
    axios
      .get(`http://localhost:5000/api/academic-score/student/${actualStudentId}/dashboard`)
      .then((res) => setAcademicData(res.data))
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch academic score.");
      });

    // Attendance Score
    axios
      .get(`http://localhost:5000/api/attendance/student/${actualStudentId}/risk-score`)
      .then((res) => setAttendanceData(res.data))
      .catch((err) => console.error("Failed to fetch attendance data:", err));

    // Flag Risk Score
    axios
      .get(`http://localhost:5000/api/flag-students/student/${actualStudentId}/flag-score`)
      .then((res) => setFlagData(res.data))
      .catch((err) => console.error("Failed to fetch flag risk data:", err));
  }, [actualStudentId]);

  if (error) return <div><h2>{error}</h2></div>;
  if (!academicData || !attendanceData || !flagData) return <div><h2>Loading...</h2></div>;

  return (
    <div>
      <h2>Welcome, {academicData.name}</h2>

      {/* Academic Risk Section */}
      <h3>Academic Risk Score for {academicData.date}: {academicData.riskScore}</h3>
      <p>Drop in Marks: {academicData.details.dropMarks ? "Yes" : "No"}</p>
      <p>No Assignment: {academicData.details.noAssignment ? "Yes" : "No"}</p>
      <p>No Participation: {academicData.details.noParticipation ? "Yes" : "No"}</p>
      <p>Status: {academicData.details.normal ? "Normal" : "At Risk"}</p>

      {/* Attendance Section */}
      <h3>Attendance Risk Score</h3>
      <p>Attendance Percentage: {attendanceData.attendancePercentage}%</p>
      <p>Daily Risk Score: {attendanceData.riskScore}</p>
      <p>Total Risk Score: {attendanceData.totalRiskScore}</p>

      {/* Flag Score Section */}
      <h3>Flag-Based Risk Score: {flagData.flagRiskScore}</h3>
      {flagData.comments.length > 0 ? (
        <ul>
          {flagData.comments.map((c, idx) => (
            <li key={idx}>
              <strong>{c.date}:</strong> {c.message}
            </li>
          ))}
        </ul>
      ) : (
        <p>No flags or messages found.</p>
      )}
    </div>
  );
};

export default StudentDashboard;
