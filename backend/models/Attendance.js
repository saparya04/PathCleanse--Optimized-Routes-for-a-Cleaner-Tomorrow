import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // YYYY-MM-DD
  records: {
    type: Map,
    of: String, // "Present" or "Absent"
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
