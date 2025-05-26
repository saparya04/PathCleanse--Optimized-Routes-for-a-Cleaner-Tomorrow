import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from './components/RoleSelection';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import AdminDashboard from './components/dashboards/AdminDashboard';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import ParentDashboard from './components/dashboards/ParentDashboard';

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
      </Routes> 
    </Router>
  );
}

export default App;
