import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = () => {
  const expenses = [
    {
      id: 1,
      name: "Shopping",
      cost: 50,
    },
    {
      id: 2,
      name: "Holiday",
      cost: 350,
    },
    {
      id: 3,
      name: "Food",
      cost: 150,
    },
  ];
  return (
    <ul className="list-group">
      {expenses.map((expense) => (
        <ExpenseItem id={expense.id} name={expense.name} cost={expense.cost} />
      ))}
    </ul>
  );
};

export default ExpenseList;
