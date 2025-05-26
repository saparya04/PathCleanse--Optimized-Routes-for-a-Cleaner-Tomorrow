export default function TeacherDashboard() {
  return (
   <div>
  <h2>Teacher Dashboard</h2>
  <form>
    <label>
      <input type="radio" name="teacherAction" value="markAttendance" />
      Mark Attendance
    </label>
    <br />
    <label>
      <input type="radio" name="teacherAction" value="postAssignment" />
      Post Assignment
    </label>
    <br />
    <label>
      <input type="radio" name="teacherAction" value="flagStudents" />
      Flag Students
    </label>
    <br />
    <label>
      <input type="radio" name="teacherAction" value="parentTeacherInteraction" />
      Parent-Teacher Interaction
    </label>
  </form>
</div>

  );
}
