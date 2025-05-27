import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const students = [
  "aishwarya sreejith",
  "saparya dey",
  "claven coutinho",
  "keith zidan",
  "lenroy dsouza",
  "vansh kadam",
  "sarah ger",
  "kevin rozario",
  "aditya rathod",
  "carol lobo",
  "acelin nazareth",
  "raiyan shaikh",
  "anushka patil",
  "shruti shirvatkar",
  "lincy dcosta",
  "teresa raj",
].sort();

export default function FlagStudentsPage() {
  const navigate = useNavigate();
  const [flags, setFlags] = useState(() => {
    // Initialize with no flag, no message
    return students.map(() => ({ flagged: false, message: "" }));
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Check if already submitted today
    axios
      .get(`http://localhost:5000/api/flag-students/${today}`)
      .then((res) => {
        if (res.data.submitted) {
          setSubmitted(true);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [today]);

  const handleFlagChange = (index, flagged) => {
    setFlags((prev) => {
      const copy = [...prev];
      copy[index].flagged = flagged;
      // Clear message if unflagged
      if (!flagged) copy[index].message = "";
      return copy;
    });
  };

  const handleMessageChange = (index, message) => {
    setFlags((prev) => {
      const copy = [...prev];
      copy[index].message = message;
      return copy;
    });
  };

  const handleSubmit = async () => {
    const flaggedData = students.map((name, idx) => ({
      name,
      flagged: flags[idx].flagged,
      message: flags[idx].flagged ? flags[idx].message : "",
    }));

    try {
      await axios.post("http://localhost:5000/api/flag-students", {
        date: today,
        flaggedStudents: flaggedData.filter((f) => f.flagged),
      });
      setSubmitted(true);
      alert("Flag data submitted successfully!");
      navigate("/dashboard/teacher");
    } catch (error) {
      alert("Error submitting flag data");
      console.error(error);
    }
  };

  const handleBackToMenu = () => {
    navigate("/dashboard/teacher");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 700, margin: "auto" }}>
      <h2>Flag Students</h2>
      {submitted && (
        <p style={{ color: "red" }}>
          You have already submitted flags today. You cannot submit again.
        </p>
      )}
      <table border="1" cellPadding={10} style={{ width: "100%", marginBottom: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Do you want to flag the student?</th>
            <th>Message</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={student}>
              <td>{student}</td>
              <td style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  disabled={submitted}
                  checked={flags[idx].flagged}
                  onChange={(e) => handleFlagChange(idx, e.target.checked)}
                />
              </td>
              <td>
                {flags[idx].flagged ? (
                  <input
                    type="text"
                    disabled={submitted}
                    value={flags[idx].message}
                    onChange={(e) => handleMessageChange(idx, e.target.value)}
                    placeholder="Write message..."
                  />
                ) : (
                  <em style={{ color: "#999" }}>N/A</em>
                )}
              </td>
              <td>
                {flags[idx].flagged ? (
                  <button
                    disabled={submitted}
                    onClick={() => alert(`Message for ${student}: ${flags[idx].message || "No message"}`)}
                  >
                    Done
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        disabled={submitted}
        style={{ marginRight: 10 }}
      >
        Submit
      </button>

      <button onClick={handleBackToMenu}>Go Back to Main Menu</button>
    </div>
  );
}
