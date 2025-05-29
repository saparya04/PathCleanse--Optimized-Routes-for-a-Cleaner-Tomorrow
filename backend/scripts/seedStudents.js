
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Student from '../models/Student.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const students = [
  {
    name: 'acelin nazareth',
    studentId: '0',
    password: '0',
    phone: '9876543210',
    address: { locality: 'A wing 602 Sai appartments', street: 'Borivali' }
  },
  {
    name: 'aditya rathod',
    studentId: '1',
    password: '1',
    phone: '9876543211',
    address: { locality: 'B wing 1004 Sai heights', street: 'Vasai Road' }
  },
  {
    name: 'aishwarya sreejith',
    studentId: '2',
    password: '2',
    phone: '9876543212',
    address: { locality: 'A wing 1004 Fortune heights', street: 'Goregaon' }
  },
  {
    name: 'anushka patil',
    studentId: '3',
    password: '3',
    phone: '9876543213',
    address: { locality: 'C wing 103 Arizona appartments', street: 'Santacruz' }
  },
  {
    name: 'carol lobo',
    studentId: '4',
    password: '4',
    phone: '9876543214',
    address: { locality: 'C wing 103 Ganga appartments', street: 'Bhayandar' }
  },
  {
    name: 'claven coutinho',
    studentId: '5',
    password: '5',
    phone: '9876543215',
    address: { locality: 'A wing 103 Anasuya appartments', street: 'Mulund' }
  },
  {
    name: 'keith zidan',
    studentId: '6',
    password: '6',
    phone: '9876543216',
    address: { locality: 'B wing 203 Khar appartments', street: 'Khar road' }
  },
  {
    name: 'kevin rozario',
    studentId: '7',
    password: '7',
    phone: '9876543217',
    address: { locality: 'C wing 203 Sai Sugandh appartments', street: 'Vasai Road' }
  },
  {
    name: 'lenroy dsouza',
    studentId: '8',
    password: '8',
    phone: '9876543218',
    address: { locality: 'B wing 203 Sunflower heights', street: 'Churchgate' }
  },
  {
    name: 'lincy dcosta',
    studentId: '9',
    password: '9',
    phone: '9876543219',
    address: { locality: 'C wing 203 Bhoomi heights', street: 'Khopoli' }
  },
  {
    name: 'raiyan shaikh',
    studentId: '10',
    password: '10',
    phone: '9876543220',
    address: { locality: 'A wing 205 Virar appartments', street: 'Virar' }
  },
  {
    name: 'saparya dey',
    studentId: '11',
    password: '11',
    phone: '9876543221',
    address: { locality: 'A wing 1004 Bhoomi legend', street: 'Kurar' }
  },
  {
    name: 'sarah ger',
    studentId: '12',
    password: '12',
    phone: '9876543222',
    address: { locality: 'A wing 103 Anamika appartments', street: 'Vasai Road' }
  },
  {
    name: 'shruti shirvatkar',
    studentId: '13',
    password: '13',
    phone: '9876543223',
    address: { locality: 'A wing 103 Anand appartments', street: 'Andheri' }
  },
  {
    name: 'teresa raj',
    studentId: '14',
    password: '14',
    phone: '9876543224',
    address: { locality: 'A wing 204 Mahalaxmi appartments', street: 'Mahalaxmi' }
  },
  {
    name: 'vansh kadam',
    studentId: '15',
    password: '15',
    phone: '9876543225',
    address: { locality: 'A wing 103 Yamuna appartments', street: 'Andheri' }
  }
];

for (const student of students) {
  const hashedPassword = await bcrypt.hash(student.password, 10);
  const entry = new Student({ ...student, password: hashedPassword });
  await entry.save();
}

console.log('Seeded students!');
mongoose.disconnect();
