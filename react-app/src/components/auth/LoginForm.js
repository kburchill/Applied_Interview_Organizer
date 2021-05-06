import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import './login.css'

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(username, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="main-body">
        <div className="login-form-div">
          <form onSubmit={onLogin} id="login-form">
            <div className="login-logo">
              Put a logo here
              {/* <img src={'/images/LogIn.png'} alt="Log In" /> */}
            </div>
            <div className="login-form-div__row">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={updateUsername}
                autoComplete="off"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              ></input>
            </div>
            <div className="buttonDiv">
              <button className="login-button-submit" type="submit">
                Login
              </button>
            </div>
            <div>
              {errors.map((error) => (
                <div className="error">{error}</div>
              ))}
            </div>
            <div>
              <a href="/sign-up" className="signup-link">
                Need an account? Sign up here!
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
