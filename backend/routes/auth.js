import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Teacher from '../models/Teacher.js';
import Admin from '../models/Admin.js';
import Parent from '../models/Parent.js';

const router = express.Router();

const models = { teacher: Teacher, admin: Admin, parent: Parent };

// Signup
router.post('/signup/:role', async (req, res) => {
  const { role } = req.params;
  const data = req.body;
  const Model = models[role];

  if (!Model) return res.status(400).json({ error: "Invalid role" });

  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;

  try {
    const newUser = new Model(data);
    await newUser.save();
    res.status(201).json({ message: `${role} created` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login/:role', async (req, res) => {
  const { role } = req.params;
  const { teacherId, studentId, password } = req.body;
  const Model = models[role];

  const idKey = role === 'parent' ? 'studentId' : 'teacherId';
  const user = await Model.findOne({ [idKey]: role === 'parent' ? studentId : teacherId });

  if (!user) return res.status(404).json({ error: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);
  res.json({ token, role });
});
export default router;
