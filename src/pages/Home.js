import React, { useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import getCookie from "../context/getCookie";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header/Header";
import Expense from "../components/Expenses/Expense";

const Home = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const id = getCookie("id");
  const token = getCookie("token");
  const name = getCookie("name");

  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:3000/money-manager/expense/" + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          res.data.data.expense.map((el) =>
            dispatch({
              type: "ADD_EXPENSE",
              payload: {
                name: el.title,
                id: el._id,
                cost: el.amount,
              },
            })
          );
        })
        .catch((error) => {
          const message = error.response.data.message;
          console.error(message);
          if (message.includes("jwt expired")) {
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigate("/");
          }
        });
    }
  }, [id, token, dispatch, navigate]);

  return (
    <div className="container">
      <h1 className="mt-3">
        {name.replace(/\w+/g, function (w) {
          return w[0].toUpperCase() + w.slice(1).toLowerCase();
        })}
        's Budget Planner
      </h1>
      <Header></Header>
      <Expense></Expense>
    </div>
  );
};

export default Home;
