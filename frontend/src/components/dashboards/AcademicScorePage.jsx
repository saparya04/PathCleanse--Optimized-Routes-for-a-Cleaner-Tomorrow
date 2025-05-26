import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AcademicScorePage() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState({
    dropMarks: false,
    noAssignment: false,
    noParticipation: false,
    normal: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (e) => {
    const { name, checked } = e.target;

    if (name === "normal") {
      setSelection({
        dropMarks: false,
        noAssignment: false,
        noParticipation: false,
        normal: checked,
      });
    } else {
      if (selection.normal) return;
      setSelection((prev) => ({ ...prev, [name]: checked }));
    }
  };

  const isValid =
    selection.normal ||
    selection.dropMarks ||
    selection.noAssignment ||
    selection.noParticipation;

  const handleSubmit = async () => {
    if (!isValid || submitted) return;

    const today = new Date().toISOString().split("T")[0];
    try {
      await axios.post("/api/academic-score", {
        date: today,
        dropMarks: selection.dropMarks,
        noAssignment: selection.noAssignment,
        noParticipation: selection.noParticipation,
        normal: selection.normal,
      });
      setSubmitted(true);
      alert("Academic Score Submitted!");
    } catch (error) {
      console.error("Error submitting score", error);
    }
  };

  const handleBack = () => navigate("/dashboard/teacher");

  return (
    <div>
      <h2>Academic Score Evaluation</h2>
      <form>
        <label>
          <input
            type="checkbox"
            name="dropMarks"
            checked={selection.dropMarks}
            onChange={handleOptionChange}
            disabled={selection.normal}
          />
          Drop in Marks
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="noAssignment"
            checked={selection.noAssignment}
            onChange={handleOptionChange}
            disabled={selection.normal}
          />
          No Submission of Assignment
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="noParticipation"
            checked={selection.noParticipation}
            onChange={handleOptionChange}
            disabled={selection.normal}
          />
          No Participation in Class
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="normal"
            checked={selection.normal}
            onChange={handleOptionChange}
            disabled={
              selection.dropMarks || selection.noAssignment || selection.noParticipation
            }
          />
          Performing Normally
        </label>
        <br />
        <button type="button" onClick={handleSubmit} disabled={!isValid || submitted}>
          Submit
        </button>{" "}
        <button type="button" onClick={handleBack}>
          Go Back to Main Menu
        </button>
      </form>
    </div>
  );
}
