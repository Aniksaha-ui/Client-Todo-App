import React, { useRef } from "react";
import "./Login.css";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  if (user) {
    navigate("/todolist");
  }
  if (loading) {
    return <Loading />;
  }

  if (error) {
    alert(error.message.slice(15, 40));
  }

  //for login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(email, password);
    const getJwtToken = async () => {
      const { data } = await axios.post("http://localhost:4000/login", {
        email,
      });
      localStorage.setItem("accessToken", data.accessToken);
    };
    getJwtToken();
  };

  const handleToggleRegister = () => {
    navigate("/login");
  };
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
