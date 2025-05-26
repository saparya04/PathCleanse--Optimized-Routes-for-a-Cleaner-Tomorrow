import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [attendanceDone, setAttendanceDone] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [flagDone, setFlagDone] = useState(false);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    axios.get(`/api/attendance/${today}`)
      .then((res) => {
        if (res.data.submitted) setAttendanceDone(true);
      })
      .catch((err) => console.error("Attendance check error", err));

    axios.get(`/api/academic-score/${today}`)
      .then((res) => {
        if (res.data.submitted) setScoreSubmitted(true);
      })
      .catch((err) => console.error("Academic score check error", err));

      axios.get(`/api/flag-students/${today}`).then(res => {
    if (res.data.submitted) setFlagDone(true);
  })
  .catch((err) => console.error("Flag check error", err));
  }, []);

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected === "markAttendance" && !attendanceDone) {
      navigate("/attendance");
    }else if (selected === "academicScore" && !scoreSubmitted) {
      navigate("/academic-score");
    }else if (selected === "flagStudents") {
      if(!flagDone) navigate("/flag-students");
    }
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <form>
        <label style={{ color: attendanceDone ? "gray" : "black" }}>
          <input
            type="radio"
            name="teacherAction"
            value="markAttendance"
            onChange={handleChange}
            disabled={attendanceDone}
          />
          Mark Attendance {attendanceDone && "(Already submitted today)"}
        </label>
        <br />
        <label style={{ color: scoreSubmitted ? "gray" : "black" }}>
          <input
            type="radio"
            name="teacherAction"
            value="academicScore"
            onChange={handleChange}
            disabled={scoreSubmitted}
          />
          Academic Score {scoreSubmitted && "(Already submitted today)"}
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="teacherAction"
            value="flagStudents"
            onChange={handleChange}
          />
          Flag Students
        </label>
        <br />
       
      </form>
    </div>
  );
}
