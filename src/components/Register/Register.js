import React, { useRef } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import axios from "axios";

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);

  const navigate = useNavigate();

  const displayNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const handleToggleToLogin = () => {};

  const handleRegister = async (e) => {
    e.preventDefault();
    const displayName = displayNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName });
    const getJwtToken = async () => {
      const { data } = await axios.post("http://localhost:4000/register", {
        email,
      });
      localStorage.setItem("accessToken", data.accessToken);
    };
    await getJwtToken();
  };

  if (user) {
    console.log(user);
    navigate("/todo");
  }

  if (error) {
    alert(error);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="registration-form">
      <form onSubmit={handleRegister}>
        <div className="form-icon">
          <span>
            <i className="icon icon-user"></i>
          </span>
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control item"
            id="username"
            ref={displayNameRef}
            placeholder="Enter User Name"
            required
          />
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

        {/* conditional rendering */}

        <div className="form-group">
          <input
            type="submit"
            value="Register"
            className="btn btn-block create-account"
          />
        </div>
        <br />
      </form>

      <div className="d-flex align-item-center justify-content-center">
        <p className="text-primary">
          Already registered in Genius car service?
          <span>
            <button
              onClick={handleToggleToLogin}
              className="btn btn-danger border-0 ms-3 my-2"
            >
              Login Now
            </button>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
