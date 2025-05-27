// models/FlagStudent.js
import mongoose from "mongoose";

const FlagStudentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true, // one submission per day
  },
  flaggedStudents: [
    {
      studentId: String, // NEW FIELD
      name: String,
      message: String,
    },
  ],
});

const FlagStudent = mongoose.model("FlagStudent", FlagStudentSchema);
export default FlagStudent;
