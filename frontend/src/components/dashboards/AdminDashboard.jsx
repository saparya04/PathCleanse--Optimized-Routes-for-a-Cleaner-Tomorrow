
export default function AdminDashboard() {
return (
  <div>
    <h2>Admin Dashboard</h2>
    <form>
      <label>
        <input type="radio" name="adminAction" value="riskList" />
        Show Risk List
      </label>
      <br />
      <label>
        <input type="radio" name="adminAction" value="contactParents" />
        Contact Parents
      </label>
      <br />
      <label>
        <input type="radio" name="adminAction" value="messageParents" />
        Message Parents
      </label>
    </form>
  </div>
  );
}
