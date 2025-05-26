import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
  const { role } = useParams(); // 'teacher', 'admin', or 'parent'
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/login/${role}`, form);

      // ✅ Successful login:
      if (res.data.token) {
        if (role === 'parent') {
          navigate(`/${res.data.studentId}/dashboard`);
        } else {
          navigate(`/dashboard/${role}`);
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      
      if (errorMsg === 'User not found') {
        alert("No such student");
        if (role === 'parent') {
          navigate('/signup/parent');
        }
      } else {
        alert(errorMsg);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{role.toUpperCase()} Login</h2>
      <input
        placeholder={role === 'parent' ? 'studentId' : 'teacherId'}
        onChange={(e) =>
          setForm({ ...form, [role === 'parent' ? 'studentId' : 'teacherId']: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
    </form>
  );
}
