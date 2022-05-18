import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const NewTodo = () => {
  const [user] = useAuthState(auth);
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const email = user.email;

  const handleAddProduct = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    const status = "pending";
    const todo = {
      title,
      description,
      status,
      email,
    };

    const url = `http://localhost:4000/newtodo`;
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast("Todo Insert Successfully");
        }
      });
  };
  return (
    <>
      <h3 className="text-center text-primary mt-3">Add New Todo</h3>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <form onSubmit={handleAddProduct}>
                  <div className="form-floating mb-3">
                    <input
                      required
                      ref={titleRef}
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Enter Product Name"
                    />
                    <label for="floatingPassword">Enter Title Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <textarea
                      ref={descriptionRef}
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Enter Todo Description"
                      required
                    />
                    <label for="floatingPassword">Enter Todo Description</label>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Add New
                    </button>
                  </div>
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTodo;
