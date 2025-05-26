
export default function ParentDashboard() {
  return (
    <div>
  <h2>Parent Dashboard</h2>
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
