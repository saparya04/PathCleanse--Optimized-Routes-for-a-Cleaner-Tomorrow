import mongoose from "mongoose";
import express from "express";
const router = express.Router();
import AcademicScore from "../models/AcademicScore.js";
import Student from "../models/Student.js";

// Submit score
// POST /api/academic-score
router.post("/", async (req, res) => {
  const { date, scores, submittedBy } = req.body;
if (!submittedBy || !mongoose.Types.ObjectId.isValid(submittedBy)) {
  return res.status(400).json({ message: "Invalid submittedBy ID" });
}
  try {
    const existing = await AcademicScore.findOne({ date });
    if (existing) return res.status(400).json({ message: "Already submitted" });

    const finalScores = [];

    for (const score of scores) {
      const student = await Student.findOne({ name: score.studentName });
      if (!student) continue;

      finalScores.push({
        studentId: student._id,
        dropMarks: score.dropMarks,
        noAssignment: score.noAssignment,
        noParticipation: score.noParticipation,
        normal: score.normal,
        riskScore: score.riskScore
      });
    }
    
    const submittedByObjectId = new mongoose.Types.ObjectId(submittedBy);

    const newScore = new AcademicScore({ date, scores: finalScores, submittedBy: submittedByObjectId });
    await newScore.save();

    res.status(201).json({ message: "Scores submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Check if already submitted
router.get("/:date", async (req, res) => {
  try {
    const existing = await AcademicScore.findOne({ date: req.params.date });
    res.json({ submitted: !!existing });
  } catch (err) {
    res.status(500).json({ submitted: false });
  }
});

// Get all students (used by frontend)
router.get("/students/list", async (req, res) => {
  try {
    const students = await Student.find({}, "name _id");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students" });
  }
});
router.get("/check-submission", async (req, res) => {
  try {
    const { date } = req.query;
    const existing = await AcademicScore.findOne({ date });
    res.json({ alreadySubmitted: !!existing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ alreadySubmitted: false });
  }
});

// Get latest academic riskScore for a student by studentId
// Get latest academic riskScore for a student by studentId


router.get("/student/:studentId/dashboard", async (req, res) => {
  try {
    const { studentId } = req.params;

    // Validate studentId is a valid Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    // Find student by ID
    const student = await Student.findById(studentId).lean();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find latest AcademicScore document (sort descending by date)
    const latest = await AcademicScore.findOne().sort({ date: -1 }).lean();

    if (!latest || !Array.isArray(latest.scores)) {
      return res.status(404).json({ message: "No academic data found" });
    }

    // Find this student's score inside the scores array
    // Make sure to compare ObjectId strings for safety
    const studentScore = latest.scores.find(score => {
      // score.studentId might be ObjectId or string, convert both to string for comparison
      return String(score.studentId) === String(student._id);
    });

    if (!studentScore) {
      return res.status(404).json({ message: "No score found for this student" });
    }

    // Send response
    res.json({
      name: student.name,
      date: latest.date,
      riskScore: studentScore.riskScore,
      details: {
        dropMarks: studentScore.dropMarks,
        noAssignment: studentScore.noAssignment,
        noParticipation: studentScore.noParticipation,
        normal: studentScore.normal
      }
    });

  } catch (err) {
    console.error("Error fetching student dashboard:", err);
    res.status(500).json({ message: "Error fetching student score" });
  }
});



export default router;
