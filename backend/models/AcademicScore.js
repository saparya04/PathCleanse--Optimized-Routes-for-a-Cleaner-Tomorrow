import mongoose from "mongoose";

const studentScoreSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  dropMarks: Boolean,
  noAssignment: Boolean,
  noParticipation: Boolean,
  normal: Boolean,
  riskScore: Number, // ✅ Add this line
});


const academicScoreSchema = new mongoose.Schema({
  date: String,
  scores: [studentScoreSchema],
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const AcademicScore = mongoose.model("AcademicScore", academicScoreSchema);
export default AcademicScore;
