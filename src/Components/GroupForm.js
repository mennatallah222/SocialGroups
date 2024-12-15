import React, { useState } from "react";
import { database, ref, push } from "../firebase";
import "../App.css";

const GroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const groupRef = ref(database, "groups"); //creates a (pointer) to the 'groups' node in the db
    const group = {
      name: groupName,
      type: groupType,
    };
    push(groupRef, group);
    setGroupName("");
    setGroupType("");
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add a group</h1>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-group">
          <label className="form-label">Group Name</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Group Type</label>
          <input
            type="text"
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default GroupForm;
