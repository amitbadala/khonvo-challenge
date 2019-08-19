import React from "react";
import { Button } from "antd";

const AddForm = ({ candidate, addCandidate, handleCandidateOnChange }) => {
  return (
    <div className="addCandidateForm">
      <h4 style={{ color: "white", textAlign: "center" }}>Add candidate</h4>
      <form className="customForm">
        <div className="group">
          <input
            type="text"
            placeholder=" "
            required
            name="name"
            value={candidate.name}
            onChange={handleCandidateOnChange}
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Name</label>
        </div>
        <div className="group">
          <input
            type="text"
            placeholder=" "
            name="email"
            value={candidate.email}
            onChange={handleCandidateOnChange}
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Email</label>
        </div>
        <div className="jobActions">
          <Button
            type="default"
            shape="round"
            size="default"
            onClick={() => addCandidate()}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
