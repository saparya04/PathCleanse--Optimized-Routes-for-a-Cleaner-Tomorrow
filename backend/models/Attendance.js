import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, 
  records: {
    type: Map,
    of: String, 
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
