import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const addressSchema = new mongoose.Schema({
  locality: String,
  street: String
}, { _id: false });

const studentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  password: String,
  messages: [messageSchema],
  totalRiskScore: {
    type: Number,
    default: 0
  },
  phone : String,
  address: addressSchema
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
