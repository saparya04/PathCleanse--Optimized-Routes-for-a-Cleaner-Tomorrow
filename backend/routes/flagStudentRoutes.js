import express from "express";
const router = express.Router();
import FlagStudent from "../models/FlagStudent.js";
// Submit flagged students
router.post("/", async (req, res) => {
  const { date, flaggedStudents } = req.body;

  try {
    const exists = await FlagStudent.findOne({ date });
    if (exists) {
      return res.status(400).json({ message: "Flags already submitted for today" });
    }

    const newFlags = new FlagStudent({ date, flaggedStudents });
    await newFlags.save();

    res.status(201).json({ success: true, message: "Flag data saved" });
  } catch (error) {
    console.error("Error saving flag data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Check if flags already submitted for the day
router.get("/:date", async (req, res) => {
  const { date } = req.params;
  try {
    const found = await FlagStudent.findOne({ date });
    res.json({ submitted: !!found });
  } catch (error) {
    console.error("Error checking flags status:", error);
    res.status(500).json({ submitted: false });
  }
});

export default router;