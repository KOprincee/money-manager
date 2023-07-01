import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Budget = () => {
  const { budget } = useContext(AppContext);
  return (
    <div className="alert alert-secondary">
      <span> Budget: {budget}</span>
      <button type="submit" className="btn btn-primary btn-sm">
        Edit
      </button>
    </div>
  );
};

export default Budget;
