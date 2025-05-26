import { useNavigate } from 'react-router-dom';

export default function RoleSelection() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Who are you?</h2>
      {['admin', 'teacher', 'parent'].map((role) => (
        <div key={role}>
          <button onClick={() => navigate(`/signup/${role}`)}>{role.toUpperCase()}</button>
        </div>
      ))}
    </div>
  );
}
