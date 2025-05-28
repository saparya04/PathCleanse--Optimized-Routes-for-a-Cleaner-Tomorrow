import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: String,     // e.g., 'parent'
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  password: String,
  messages: [messageSchema],  // Add this line
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
