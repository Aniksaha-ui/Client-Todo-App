import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const NewTodo = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <h3 className="text-center text-primary mt-3">Add New Product</h3>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <form onSubmit={handleAddProduct}>
                  <div className="form-floating mb-3">
                    <input
                      ref={nameRef}
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Enter Product Name"
                    />
                    <label for="floatingPassword">Enter Product Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <textarea
                      ref={descriptionRef}
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Enter Product Description"
                    />
                    <label for="floatingPassword">
                      Enter Product Description
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      ref={priceRef}
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Enter Product Price"
                    />
                    <label for="floatingPassword">Enter Product Price</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      ref={quantityRef}
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Enter Product Quantity"
                    />
                    <label for="floatingPassword">Enter Product Quantity</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      ref={supplierNameRef}
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Enter Supplier Name"
                    />
                    <label for="floatingPassword">Enter Supplier Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      ref={imageRef}
                      type="text"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Enter Image Url"
                    />
                    <label for="floatingPassword">Enter Image Url</label>
                  </div>

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Add New Product
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
