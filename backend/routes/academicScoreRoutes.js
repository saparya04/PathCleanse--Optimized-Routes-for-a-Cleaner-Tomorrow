import express from "express";
const router = express.Router();
import AcademicScore from "../models/AcademicScore.js";

// ✅ Submit academic score
router.post("/", async (req, res) => {
  const { date, dropMarks, noAssignment, noParticipation, normal, submittedBy } = req.body;

  try {
    const already = await AcademicScore.findOne({ date });
    if (already) {
      return res.status(400).json({ message: "Score already submitted for today" });
    }

    const newScore = new AcademicScore({
      date,
      dropMarks,
      noAssignment,
      noParticipation,
      normal,
      submittedBy,
    });

    await newScore.save();
    res.status(201).json({ success: true, message: "Academic score submitted" });
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Check if academic score is already submitted for the day
router.get("/:date", async (req, res) => {
  const { date } = req.params;

  try {
    const found = await AcademicScore.findOne({ date });
    res.json({ submitted: !!found });
  } catch (error) {
    console.error("Error checking score status:", error);
    res.status(500).json({ submitted: false });
  }
});
export default router;
