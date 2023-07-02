import React, { useContext, useEffect } from "react";
import getCookie from "../context/getCookie";
import { AppContext } from "../context/AppContext";

const Budget = () => {
  const { dispatch } = useContext(AppContext);
  const budget = getCookie("budget");
  useEffect(() => {
    dispatch({
      type: "ADD_BUDGET",
      payload: {
        budget,
      },
    });
  }, [budget, dispatch]);

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
