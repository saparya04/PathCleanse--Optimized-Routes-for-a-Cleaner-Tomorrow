import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
  teacherId: String,
  password: String,
});


const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
