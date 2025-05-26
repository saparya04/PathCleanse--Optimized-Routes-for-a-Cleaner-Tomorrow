// models/Student.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  password: String,  // hashed password
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
