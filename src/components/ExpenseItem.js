import React, { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { AppContext } from "../context/AppContext";

const ExpenseItem = (props) => {
  const { dispatch } = useContext(AppContext);

  const deleteExpenseHandler = () => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: props.key,
    });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.name}
      <div>
        <span className="badge bg-primary badge-pill mr-3">{props.cost}</span>
        <TiDelete size="1.5em" onClick={deleteExpenseHandler}></TiDelete>
      </div>
    </li>
  );
};

export default ExpenseItem;
