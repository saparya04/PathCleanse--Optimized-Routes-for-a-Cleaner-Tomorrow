import mongoose from 'mongoose';
const adminSchema = new mongoose.Schema({
  name: String,
  teacherId: String,
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
