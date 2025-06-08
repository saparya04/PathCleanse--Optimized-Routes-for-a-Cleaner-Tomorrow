import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LampContainer } from "../LampContainer.jsx";
import { motion } from "framer-motion";


export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [attendanceDone, setAttendanceDone] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [flagDone, setFlagDone] = useState(false);
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    axios.get(`http://localhost:5000/api/attendance/${today}`)
      .then((res) => {
        if (res.data.submitted) setAttendanceDone(true);
      })
      .catch((err) => console.error("Attendance check error", err));

    axios.get(`http://localhost:5000/api/academic-score/${today}`)
      .then((res) => {
        if (res.data.submitted) setScoreSubmitted(true);
      })
      .catch((err) => console.error("Academic score check error", err));

    axios.get(`http://localhost:5000/api/flag-students/${today}`).then(res => {
      if (res.data.submitted) setFlagDone(true);
    })
      .catch((err) => console.error("Flag check error", err));
  }, []);

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected === "markAttendance" && !attendanceDone) {
      navigate("/attendance");
    } else if (selected === "academicScore" && !scoreSubmitted) {
      navigate("/academic-score");
    } else if (selected === "flagStudents") {
      if (!flagDone) navigate("http://localhost:5173/flag-students");
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Hero Section */}
      <div className="py-10 px-4 bg-gradient-to-b from-black to-gray-800">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Teacher DashBoard <br />
          </motion.h1>


         
          <div className="flex flex-col items-center justify-center py-12 px-6">
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
              <label className="text-black">
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



        </LampContainer>



      </div>



    </div>








  );
}