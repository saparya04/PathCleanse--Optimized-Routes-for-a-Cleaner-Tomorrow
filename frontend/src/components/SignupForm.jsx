import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function SignupForm() {
  const { role } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const fields = {
    admin: ['name', 'teacherId', 'password'],
    teacher: ['name', 'subject', 'teacherId', 'password'],
    parent: ['name', 'studentId', 'address', 'phone', 'password'],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/api/auth/signup/${role}`, form);
    navigate(`/login/${role}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{role.toUpperCase()} Sign Up</h2>
      {fields[role].map((f) => (
        <input key={f} placeholder={f} onChange={(e) => setForm({ ...form, [f]: e.target.value })} />
      ))}
      <button type="submit">Sign Up</button>
    </form>
  );
}
