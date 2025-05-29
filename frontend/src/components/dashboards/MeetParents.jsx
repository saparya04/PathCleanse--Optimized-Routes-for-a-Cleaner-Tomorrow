// MeetParents.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MeetParents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/students");
        const studentsWithNoMessages = res.data.filter(
          (student) => student.messages.length === 0
        );
        setStudents(studentsWithNoMessages);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);
    
  return (
    <div>
      <h2>Meet Parents</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address (Locality, Street)</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.address?.locality}, {student.address?.street}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
