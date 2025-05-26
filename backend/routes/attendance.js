import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { date, records } = req.body;

  try {
    const existing = await Attendance.findOne({ date });
    if (existing) {
      return res.status(409).json({ message: "Attendance already submitted for today" });
    }

    const attendance = new Attendance({ date, records });
    await attendance.save();
    res.status(200).json({ message: "Attendance submitted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/:date", async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ date: req.params.date });
    if (attendance) {
      return res.status(200).json({ submitted: true });
    } else {
      return res.status(200).json({ submitted: false });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;

