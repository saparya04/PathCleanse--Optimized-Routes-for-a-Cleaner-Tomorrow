// seedstudent.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Student from '../models/Student.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const students = [
  { name: 'acelin nazareth', studentId: '0', password: '0' },
  { name: 'aditya rathod', studentId: '1', password: '1' },
  { name: 'aishwarya sreejith', studentId: '2', password: '2' },
  { name: 'anushka patil', studentId: '3', password: '3' },
  { name: 'carol lobo', studentId: '4', password: '4' },
  { name: 'claven coutinho', studentId: '5', password: '5' },
  { name: 'keith zidan', studentId: '6', password: '6' },
  { name: 'kevin rozario', studentId: '7', password: '7' },
  { name: 'lenroy dsouza', studentId: '8', password: '8' },
  { name: 'lincy dcosta', studentId: '9', password: '9' },
  { name: 'raiyan shaikh', studentId: '10', password: '10' },
  { name: 'saparya dey', studentId: '11', password: '11' },
  { name: 'sarah ger', studentId: '12', password: '12' },
  { name: 'shruti shirvatkar', studentId: '13', password: '13' },
  { name: 'teresa raj', studentId: '14', password: '14' },
  { name: 'vansh kadam', studentId: '15', password: '15' },
];

for (const student of students) {
  const hashedPassword = await bcrypt.hash(student.password, 10);
  const entry = new Student({ ...student, password: hashedPassword });
  await entry.save();
}

console.log('Seeded students!');
mongoose.disconnect();
