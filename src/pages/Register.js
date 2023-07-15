import React, { useState, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Register = () => {
  const [formValidation, setFormValidation] = useState(false);
  const [formValidationError, setFormValidationError] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.current.value.length < 8) {
      setFormValidationError("Password must be at least 8 characters");
    } else if (password.current.value !== confirmPassword.current.value) {
      setFormValidationError("Please enter password correctly twice");
    } else {
      setFormValidation(true);
      axios
        .post("https://money-manager-server-gvda.onrender.com/users/signup", {
          name: document.getElementById("name").value,
          email: email.current.value,
          password: password.current.value,
          passwordConfirm: confirmPassword.current.value,
        })
        .then(function (response) {
          document.cookie = `token= ${response.data.token}  `;
          document.cookie = `id=${response.data.data.user._id}`;
          document.cookie = `name=${response.data.data.user.name}`;
          document.cookie = `budget=0`;
          dispatch({
            type: "RESET_EXPENSE",
          });
          navigate(`/${response.data.name}`);
        })
        .catch(function (error) {
          const message = error.response.data.message;
          console.error(message);
          if (message.includes("Enter a valid email")) {
            setFormValidationError("Please provide a valid email address.");
            setFormValidation(false);
          } else if (message.includes("duplicate")) {
            setFormValidationError("User with the same email already exists.");
            setFormValidation(false);
          }
          console.log(error.response.data.message);
        });
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-5">
            <form
              className="card-body cardbody-color p-lg-5"
              onSubmit={submitHandler}
            >
              <div className="text-center">
                <h1 className="mb-5">Registration Form</h1>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  aria-describedby="name"
                  placeholder="Name"
                  required={true}
                ></input>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email Id"
                  required={true}
                  ref={email}
                ></input>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required={true}
                  ref={password}
                ></input>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="cnf-password"
                  placeholder="Confirm Password"
                  required={true}
                  ref={confirmPassword}
                ></input>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-color px-5 mb-5 w-100">
                  Sign Up
                </button>
              </div>
              {!formValidation && (
                <div className="warning-text form-text text-center px-3 mb-3">
                  {formValidationError}
                </div>
              )}
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Already have an Account?{"  "}
                <NavLink to="/" className="text-dark fw-bold">
                  Click here to Login
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
