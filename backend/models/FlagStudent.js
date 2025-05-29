
import mongoose from "mongoose";

const FlagStudentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true, 
  },
  flaggedStudents: [
    {
      studentId: String, 
      name: String,
      message: String,
    },
  ],
});

const FlagStudent = mongoose.model("FlagStudent", FlagStudentSchema);
export default FlagStudent;
