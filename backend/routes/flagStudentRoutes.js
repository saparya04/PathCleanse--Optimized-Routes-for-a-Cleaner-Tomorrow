import express from "express";
const router = express.Router();
import FlagStudent from "../models/FlagStudent.js";

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

router.get("/student/:studentName/flag-score", async (req, res) => {
  const { studentName } = req.params;
  const normalizedName = studentName.trim().toLowerCase();

  try {
    const records = await FlagStudent.find({
      "flaggedStudents.name": { $regex: new RegExp(`^${normalizedName}$`, 'i') }
    }).sort({ date: -1 });

    let riskScore = 0;
    let comments = [];

    for (let record of records) {
      const studentFlags = record.flaggedStudents.filter(
        (s) => s.name.trim().toLowerCase() === normalizedName
      );

      riskScore += studentFlags.length * 5;

      comments.push(...studentFlags.map((s) => ({
        date: record.date,
        message: s.message,
      })));
    }

    res.json({
      flagRiskScore: riskScore,
      comments,
    });
  } catch (err) {
    console.error("Error fetching flag risk score:", err);
    res.status(500).json({ flagRiskScore: 0, comments: [] });
  }
});

export default router;