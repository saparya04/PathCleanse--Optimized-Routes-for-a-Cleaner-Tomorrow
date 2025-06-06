import express from "express";
import Attendance from "../models/Attendance.js";
import Student from "../models/Student.js";
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

router.get("/student/:studentId/risk-score", async (req, res) => {
  const { studentId } = req.params;

  try {
    
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

   
    const fullName = student.name.trim().toLowerCase();

    const latestAttendance = await Attendance.findOne().sort({ date: -1 }).lean();
    if (!latestAttendance) {
     
      return res.status(200).json({
        attendancePercentage: 0,
        riskScore: 0,
        totalRiskScore: 0,
      });
    }
    const latestDate = latestAttendance.date;

   
    const attendanceRecords = await Attendance.find({ date: { $lte: latestDate } }).lean();

    let totalDays = 0;
    let presentDays = 0;

    attendanceRecords.forEach(record => {
     
      const studentStatusMap = record.records instanceof Map
        ? Object.fromEntries(record.records)
        : record.records;

      const normalizedRecords = Object.keys(studentStatusMap).reduce((acc, name) => {
        acc[name.trim().toLowerCase()] = studentStatusMap[name];
        return acc;
      }, {});

      const status = normalizedRecords[fullName];
      if (status) {
        totalDays += 1;
        if (status === "Present") presentDays += 1;
      }
    });

    if (totalDays === 0) {
      return res.status(200).json({
        attendancePercentage: 0,
        riskScore: 0,
        totalRiskScore: 0,
      });
    }

    const attendancePercentage = (presentDays / totalDays) * 100;

    let riskScore = 0;
    if (attendancePercentage >= 90) riskScore = 0;
    else if (attendancePercentage >= 75) riskScore = 10;
    else if (attendancePercentage >= 50) riskScore = 20;
    else riskScore = 40;

    return res.status(200).json({
      attendancePercentage: attendancePercentage.toFixed(2),
      riskScore,
      totalRiskScore: riskScore,
      latestDate
    });

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;

