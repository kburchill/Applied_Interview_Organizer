import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import './login.css'

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const loginDemo = async () => {
    setEmail("demo@aa.io")
    setPassword("password")
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <div className="main-body">
        <div className="login-form-div">
          <form onSubmit={onLogin} id="login-form">
            <div className="login-form-div__row">
              <label htmlFor="email">Email</label>
              <input
                id="email_input"
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
                autoComplete="off"
              />
            </div>

            <div className="login-form-div__row">
              <label htmlFor="password">Password</label>
              <input
                id="password_input"
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
            <div className="buttonDiv" onClick={() => loginDemo()}>
              <button className="demo-button-submit" type="submit">
                Demo
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
