import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../context/AppContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [loginStatus, setLoginStatus] = useState(false);
  const LoginHandler = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3000/money-manager/users/login", {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      })
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        dispatch({
          type: "ADD_USER_DET",
          payload: {
            name: response.data.name,
            id: response.data.id,
            token: response.data.token,
            budget: response.data.budget,
          },
        });
        //navigate(`/${response.data.name}`);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setLoginStatus(true);
        }
      })
      .finally(navigate("/:prince"));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-5">
            <form
              className="card-body cardbody-color p-lg-5"
              onSubmit={LoginHandler}
            >
              <div className="text-center">
                <h1 className="mb-5">Money Manager</h1>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email Id"
                  required={true}
                ></input>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required={true}
                ></input>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-color px-5 mb-5 w-100">
                  Login
                </button>
              </div>
              {loginStatus && (
                <div className="warning-text form-text text-center px-3 mb-3">
                  Invalid Email or Password
                </div>
              )}
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Not Registered?{"  "}
                <NavLink to="/register" className="text-dark fw-bold">
                  Create an Account
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
