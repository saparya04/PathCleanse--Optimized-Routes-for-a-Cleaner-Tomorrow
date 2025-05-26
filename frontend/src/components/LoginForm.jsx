import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
  const { role } = useParams();
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:5000/api/auth/login/${role}`, form);
    if (res.data.token) navigate(`/dashboard/${role}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{role.toUpperCase()} Login</h2>
      <input placeholder={role === 'parent' ? 'studentId' : 'teacherId'} onChange={(e) => setForm({ ...form, [role === 'parent' ? 'studentId' : 'teacherId']: e.target.value })} />
      <input type="password" placeholder="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}
