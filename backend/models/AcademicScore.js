
import mongoose from "mongoose";

const AcademicScoreSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true, // one submission per day
  },
  dropMarks: Boolean,
  noAssignment: Boolean,
  noParticipation: Boolean,
  normal: Boolean,
  submittedBy: {
    type: String, // teacher ID or name if needed
    required: false,
  }
});

const AcademicScore = mongoose.model('AcademicScore', AcademicScoreSchema);
export default AcademicScore;
