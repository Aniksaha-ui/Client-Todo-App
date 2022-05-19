import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import CustomLink from "../../CustomLink/CustomLink";

const Header = () => {
  const [user] = useAuthState(auth);
  const handleLogout = (e) => {
    signOut(auth);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <>
                  <li className="nav-item">
                    <CustomLink className="nav-link" to="/newtodo">
                      Add New
                    </CustomLink>
                  </li>
                  <li className="nav-item">
                    <CustomLink className="nav-link" to="/todolist">
                      Todo
                    </CustomLink>
                  </li>

                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <CustomLink className="nav-link" to="/login">
                      login
                    </CustomLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- nav section  --> */}
    </div>
  );
};

export default Header;
