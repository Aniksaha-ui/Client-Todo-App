import axios from "axios";
import React, { useEffect, useState } from "react";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const MyTodo = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const getTodo = async () => {
      const email = user.email;
      const url = `http://localhost:4000/mytodolist?email=${email}`;
      try {
        const { data } = await axios.get(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setTodo(data);
      } catch (err) {
        if (err.response.status === 401 || err.response.status === 403) {
          signOut(auth);
          console.log("Signout");
          navigate("/login");
        }
      }
    };
    getTodo();
  }, [user]);

  const handleDelete = (id) => {
    const url = `http://localhost:4000/todolist/${id}`;
    const confirm = window.confirm("Are You Sure?");
    if (confirm) {
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("data deleted", data);
          const remaining = todo.filter((product) => product._id !== id);
          setTodo(remaining);
          if (data.acknowledged) {
            toast("Data Deleted Successfully");
          }
        });
    } else {
    }
  };

  const handleUpdate = (id) => {
    const url = `http://localhost:4000/todo/${id}`;
    const status = "completed";
    const updatedStatus = { status };
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedStatus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          console.log(data);
          toast("Todo Status Updated");
          // setStatus(data.status);
        }
      });
  };

  return (
    <div>
      <div className="container">
        <h3 className="mt-3 text-primary">You Added -{todo.length} product</h3>
        <div className="d-flex align-items-center justify-content-center mt-3">
          <table className="table table-dark" style={{ width: "1080px" }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todo.map((todo) => (
                <tr key={todo._id}>
                  {todo.status === "pending" ? (
                    <td>{todo.title}</td>
                  ) : (
                    <td>
                      <s>{todo.title}</s>
                    </td>
                  )}
                  <td>{todo.description}</td>
                  <td>{todo.status}</td>

                  <td>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="btn-danger"
                    >
                      Delete
                    </button>
                    &nbsp; &nbsp;
                    <button
                      onClick={() => handleUpdate(todo._id)}
                      className="btn-danger"
                    >
                      complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyTodo;
