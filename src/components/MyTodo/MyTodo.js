import axios from "axios";
import React, { useEffect, useState } from "react";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

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
        console.log("data is not loading");
        console.log(data);
      } catch (err) {
        console.log(err.response.status);
        console.log(err.message);
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
          console.log("data deleted", data);
          const remaining = todo.filter((product) => product._id !== id);
          setTodo(remaining);
          if (data.acknowledged) {
            alert("Data Deleted Successfully");
          }
        });
    } else {
    }
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
                  <td>{todo.name}</td>
                  <td>{todo.description}</td>
                  <td>{todo.status}</td>

                  <td>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="btn-danger"
                    >
                      Delete
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
