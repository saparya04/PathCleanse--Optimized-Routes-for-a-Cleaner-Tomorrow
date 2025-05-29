import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [selectedAction, setSelectedAction] = useState("");
  const navigate = useNavigate();

  const handleActionChange = (e) => {
    const action = e.target.value;
    setSelectedAction(action);

    if (action === "riskList") {
      navigate("/risk-list");
    } else if (action === "contactParents") {
      navigate("/meet-parents"); // ✅ New route for "Meet Parents"
    }
    // Add more actions as needed
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form>
        <label>
          <input
            type="radio"
            name="adminAction"
            value="riskList"
            checked={selectedAction === "riskList"}
            onChange={handleActionChange}
          />
          Show Risk List
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="adminAction"
            value="contactParents"
            checked={selectedAction === "contactParents"}
            onChange={handleActionChange}
          />
          Meet Parents
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="adminAction"
            value="messageParents"
            checked={selectedAction === "messageParents"}
            onChange={handleActionChange}
          />
          Message Parents
        </label>
      </form>
    </div>
  );
}
