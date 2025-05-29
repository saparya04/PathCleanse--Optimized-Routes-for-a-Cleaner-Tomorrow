import mongoose from "mongoose";
import express from "express";
const router = express.Router();
import AcademicScore from "../models/AcademicScore.js";
import Student from "../models/Student.js";


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



router.get("/:date", async (req, res) => {
  try {
    const existing = await AcademicScore.findOne({ date: req.params.date });
    res.json({ submitted: !!existing });
  } catch (err) {
    res.status(500).json({ submitted: false });
  }
});


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


router.get("/student/:studentId/dashboard", async (req, res) => {
  try {
    const { studentId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

  
    const student = await Student.findById(studentId).lean();

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    
    const today = new Date().toISOString().slice(0, 10);

   
    let latest = await AcademicScore.findOne({ date: today }).lean();

   
    if (!latest) {
      latest = await AcademicScore.findOne().sort({ date: -1 }).lean();
    }

    if (!latest || !Array.isArray(latest.scores)) {
      return res.status(404).json({ message: "No academic data found" });
    }

    
    const studentScore = latest.scores.find(score => String(score.studentId) === String(student._id));

    if (!studentScore) {
      return res.status(404).json({ message: "No score found for this student" });
    }

   
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

router.get("/students/latest-risk-scores", async (req, res) => {
  try {
    
    const today = new Date().toISOString().slice(0, 10);

    
    let latest = await AcademicScore.findOne({ date: today }).lean();

   
    if (!latest) {
      latest = await AcademicScore.findOne().sort({ date: -1 }).lean();
    }

    if (!latest || !Array.isArray(latest.scores)) {
      return res.status(404).json({ message: "No academic data found" });
    }

    const students = await Student.find({}, "name _id").lean();

   
    const studentIdToName = {};
    students.forEach(student => {
      studentIdToName[student._id.toString()] = student.name;
    });

   
    const riskScores = latest.scores.map(score => ({
      studentId: score.studentId,
      name: studentIdToName[score.studentId.toString()] || "Unknown",
      riskScore: score.riskScore,
    }));

    res.json(riskScores);
  } catch (err) {
    console.error("Error fetching latest academic risk scores:", err);
    res.status(500).json({ message: "Error fetching academic risk scores" });
  }
});





export default router;
