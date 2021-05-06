import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signup.css';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
      e.preventDefault();
      if (password === repeatPassword) {
          await dispatch(signUp(username, email, password, first_name, last_name));
      }
  };

  const updateUsername = (e) => {
      setUsername(e.target.value);
  };

  const updateEmail = (e) => {
      setEmail(e.target.value);
  };
  const updateFirstname = (e) => {
      setFirstname(e.target.value);
  };
  const updateLastname = (e) => {
      setLastname(e.target.value);
  };

  const updatePassword = (e) => {
      setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
      setRepeatPassword(e.target.value);
  };

  if (user) {
      return <Redirect to="/dashboard" />;
  }

  return (
    <div className="main-body">
      <div className="signup-form-div">
        <form onSubmit={onSignUp} id="signup-form">
          <div className="sign-up-logo">
            {/* <img src={'/images/SignUp.png'} alt="Sign Up" /> */}
          </div>
          <div className="signup-form-div__row">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className="signup-form-div__row">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={updateFirstname}
              value={first_name}
            ></input>
          </div>
          <div className="signup-form-div__row">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={updateLastname}
              value={last_name}
            ></input>
          </div>
          <div className="signup-form-div__row">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className="signup-form-div__row">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className="signup-form-div__row">
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              placeholder="Password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className="buttonDiv">
            <button className="signup-button-submit" type="submit">
              Sign Up
            </button>
          </div>

          <div>
            <a href="/login" className="login-link">
              Have an account? Login here!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
