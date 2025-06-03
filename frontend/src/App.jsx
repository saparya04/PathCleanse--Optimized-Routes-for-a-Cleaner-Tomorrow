import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from './components/RoleSelection';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/dashboards/AdminDashboard';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import ParentDashboard from './components/dashboards/ParentDashboard';
import AttendancePage from './components/dashboards/AttendancePage';
import AcademicScorePage from './components/dashboards/AcademicScorePage';
import FlagStudentsPage from './components/dashboards/FlagStudentsPage';
import DynamicParentDashboard from './components/dashboards/DynamicParentDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';
import RiskList from './components/dashboards/RiskList';
import CommunicateWithTeachers from './components/dashboards/CommunicateWithTeachers';
import MeetParents from './components/dashboards/MeetParents';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/signup/:role" element={<SignupForm />} />
        <Route path="/login/:role" element={<LoginForm />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/parent" element={<ParentDashboard />} />
         <Route path="/:studentId/dashboard" element={<DynamicParentDashboard />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/academic-score" element={<AcademicScorePage />} />
        <Route path="/student-dashboard/:studentId" element={<StudentDashboard />} />
         <Route path="/communicate/:studentId" element={<CommunicateWithTeachers />} />
         <Route path="/risk-list" element={<RiskList />} />
        <Route path="/meet-parents" element={<MeetParents />} />
         <Route path="/flag-students" element={<FlagStudentsPage />} />
      </Routes> 
    </Router>
    
  );
}

export default App;
