import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema({
  name: String,
  studentId: String,
  address: String,
  phone: String,
  password: String,
});

const Parent = mongoose.model('Parent', parentSchema);
export default Parent;
