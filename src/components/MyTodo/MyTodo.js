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
    const getTodoList = async () => {
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
        // console.log(err.response.status);
        console.log(err.message);
        if (err.response.status === 401 || err.response.status === 403) {
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getTodoList();
  }, [user]);

  return (
    <div>
      <h3>{todo.length}</h3>
    </div>
  );
};

export default MyTodo;
