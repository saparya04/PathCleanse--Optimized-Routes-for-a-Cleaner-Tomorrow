import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import attendanceRoutes from './routes/attendance.js';
import academicScoreRoutes from './routes/academicScoreRoutes.js';
import flagStudentRoutes from './routes/flagStudentRoutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/academic-score", academicScoreRoutes);
app.use("/api/flag-students", flagStudentRoutes);



app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});

