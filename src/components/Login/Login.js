import React, { useRef } from "react";
import "./Login.css";
const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  //for login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    // signInWithEmailAndPassword(email, password);
  };

  const handleToggleRegister = () => {};
  return (
    <div className="registration-form">
      <form onSubmit={handleLogin}>
        <div className="form-icon">
          <span>
            <i className="icon icon-user"></i>
          </span>
        </div>

        <div className="form-group">
          <input
            ref={emailRef}
            type="text"
            className="form-control item"
            id="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <input
            ref={passwordRef}
            type="password"
            className="form-control item"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Login"
            className="btn btn-block create-account"
          />
        </div>
        <br />
      </form>

      <div className="d-flex align-items-center justify-content-center">
        <p className="text-primary">
          New in optica?
          <span>
            <button
              onClick={handleToggleRegister}
              className="btn btn-danger border-0 ms-3 my-2"
            >
              Register Now
            </button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
