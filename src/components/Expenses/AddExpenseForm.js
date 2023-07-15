import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
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

    const data = { title: name, user_id: id, amount: cost };

    axios
      .post("https://money-manager-server-gvda.onrender.com/expense", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        const expense = {
          id: response.data.id,
          name: name,
          cost: parseInt(cost),
        };

        dispatch({
          type: "ADD_EXPENSE",
          payload: expense,
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
