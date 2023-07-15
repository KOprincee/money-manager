import React, { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import getCookie from "../../context/getCookie";

import axios from "axios";

const ExpenseItem = (props) => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const token = getCookie("token");

  const deleteExpenseHandler = () => {
    axios
      .delete("http://localhost:3000/money-manager/expense/" + props.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        dispatch({
          type: "DELETE_EXPENSE",
          payload: props.id,
        });
      })
      .catch((error) => {
        const message = error.response.data.message;
        console.error(message);
        if (message.includes("jwt expired")) {
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          navigate("/");
        }
        if (message.includes("not Logged")) {
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          navigate("/");
        }
      });
  };

  return (
    <li
      id={props.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
      {props.name}
      <div>
        <span className="badge bg-primary badge-pill mr-3">{props.cost}</span>
        <TiDelete size="1.5em" onClick={deleteExpenseHandler}></TiDelete>
      </div>
    </li>
  );
};

export default ExpenseItem;
