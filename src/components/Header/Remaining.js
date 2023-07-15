import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Remaining = () => {
  const { expenses, budget } = useContext(AppContext);
  const totalExpenses = expenses.reduce((total, items) => {
    return (total += items.cost);
  }, 0);

  return (
    <div className="alert alert-success">
      <span> Remaining: {budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
