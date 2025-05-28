// components/dashboards/DynamicParentDashboard.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function DynamicParentDashboard() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [selectedAction, setSelectedAction] = useState('');

  const handleRadioChange = (e) => {
  const action = e.target.value;
  setSelectedAction(action);

  if (action === 'viewStudentDetails') {
    navigate(`/student-dashboard/${studentId}`);
  } else if (action === 'communicateTeachers') {
    navigate(`/communicate/${studentId}`);
  }
};

  return (
    <div>
      <h2>Dashboard for Student ID: {studentId}</h2>
      <form>
        <label>
          <input
            type="radio"
            name="parentAction"
            value="viewStudentDetails"
            onChange={handleRadioChange}
          />
          View Student Details
        </label>
        <br />
       
        <label>
          <input
            type="radio"
            name="parentAction"
            value="communicateTeachers"
            onChange={handleRadioChange}
          />
          Communicate with Teachers
        </label>
      </form>
    </div>
  );
}
