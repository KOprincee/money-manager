import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import getCookie from "../../context/getCookie";

const BudgetForm = (props) => {
  const [budget, setBudget] = useState(0);
  const navigate = useNavigate();

  const id = getCookie("id");
  const token = getCookie("token");

  const onSubmit = (event) => {
    event.preventDefault();

    const data = {
      budget,
    };

    axios
      .patch("http://localhost:3000/money-manager/users/" + id, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((document.cookie = `budget=${budget}`))
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
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            min={1}
            className="form-control"
            id="budget"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
          ></input>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Change
      </button>
    </form>
  );
};

export default BudgetForm;
