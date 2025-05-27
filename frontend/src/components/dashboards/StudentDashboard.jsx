import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
  const { studentId } = useParams(); // get /:studentId from route
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/academic-score/student/${studentId}/dashboard`)
      .then((res) => setData(res.data))
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch score.");
      });
  }, [studentId]);

  if (error) return <div><h2>{error}</h2></div>;

  if (!data) return <div><h2>Loading...</h2></div>;

  return (
    <div>
      <h2>Welcome, {data.name}</h2>
      <h3>Risk Score for {data.date}: {data.riskScore}</h3>
      <p>Drop in Marks: {data.details.dropMarks ? "Yes" : "No"}</p>
      <p>No Assignment: {data.details.noAssignment ? "Yes" : "No"}</p>
      <p>No Participation: {data.details.noParticipation ? "Yes" : "No"}</p>
      <p>Status: {data.details.normal ? "Normal" : "At Risk"}</p>
    </div>
  );
};

export default StudentDashboard;
