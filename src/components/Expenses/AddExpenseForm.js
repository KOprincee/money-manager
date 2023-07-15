import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import getCookie from "../../context/getCookie";

const AddExpenseForm = (props) => {
  const [name, setName] = useState();
  const [cost, setCost] = useState();
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const id = getCookie("id");
  const token = getCookie("token");

  const onSubmit = (event) => {
    event.preventDefault();
    const expense = {
      id: uuidv4(),
      name: name,
      cost: parseInt(cost),
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });

    const data = { title: name, user_id: id, amount: cost };

    axios
      .post("http://localhost:3000/money-manager/expense", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(console.log("ok"))
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

    props.onClose();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row mb-3">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            min={1}
            className="form-control"
            id="cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          ></input>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

export default AddExpenseForm;
