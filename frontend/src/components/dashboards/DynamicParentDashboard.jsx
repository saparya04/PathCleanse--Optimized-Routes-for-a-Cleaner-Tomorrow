// components/dashboards/DynamicParentDashboard.jsx
import { useParams } from 'react-router-dom';

export default function DynamicParentDashboard() {
  const { studentId } = useParams();

  return (
    <div>
      <h2>Dashboard for Student ID: {studentId}</h2>
      <form>
        <label>
          <input type="radio" name="parentAction" value="viewStudentDetails" />
          View Student Details
        </label>
        <br />
        <label>
          <input type="radio" name="parentAction" value="checkFlagsMessages" />
          Check Flags or Messages
        </label>
        <br />
        <label>
          <input type="radio" name="parentAction" value="communicateTeachers" />
          Communicate with Teachers
        </label>
      </form>
    </div>
  );
}
