import React from "react";
import getCookie from "../context/getCookie";

const Budget = () => {
  const budget = getCookie("budget");
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
