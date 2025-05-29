
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Teacher from '../models/Teacher.js';
import Admin from '../models/Admin.js';
import Parent from '../models/Parent.js';
import Student from '../models/Student.js';

dotenv.config();
const router = express.Router();

const models = { teacher: Teacher, admin: Admin, parent: Parent };


router.post('/signup/:role', async (req, res) => {
  const { role } = req.params;
  const data = req.body;
  const Model = models[role];

  if (!Model) return res.status(400).json({ error: "Invalid role" });

  if (role === 'parent') {
  try {
    const student = await Student.findOne({ studentId: data.studentId });
    if (!student) {
      return res.status(400).json({ error: 'Student ID does not exist' });
    }

   
    
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const newParent = new Parent(data);
    await newParent.save();
    return res.status(201).json({ message: `${role} created` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const newUser = new Model(data);
    await newUser.save();
    res.status(201).json({ message: `${role} created` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/login/:role', async (req, res) => {
  const { role } = req.params;
  const { teacherId, studentId, password } = req.body;
  let user;

  try {
    if (role === 'parent') {
      user = await Parent.findOne({ studentId });
    } else if (role === 'teacher') {
      user = await Teacher.findOne({ teacherId });
    } else if (role === 'admin') {
      user = await Admin.findOne({ teacherId });
    } else {
      return res.status(400).json({ error: 'Invalid role' });
    }

    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);
   res.json({
  token,
  role,
  studentId: user.studentId || null,
  teacher: role === 'teacher' ? { _id: user._id, teacherId: user.teacherId, name: user.name } : null
});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/message/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const { content } = req.body;

  try {
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.messages.push({ sender: 'parent', content });
    await student.save();

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:studentId/total-risk', async (req, res) => {
  const { studentId } = req.params;
  let { totalRiskScore } = req.body;

  totalRiskScore = Number(totalRiskScore); 

  if (isNaN(totalRiskScore)) {
    return res.status(400).json({ message: 'totalRiskScore must be a valid number' });
  }

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { studentId },
      { totalRiskScore },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Total risk score updated', student: updatedStudent });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update total risk score' });
  }
});

router.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});



export default router;
