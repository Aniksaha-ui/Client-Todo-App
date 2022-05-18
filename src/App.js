import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Header from "./components/Shared/Header/Header";
import MyTodo from "./components/MyTodo/MyTodo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/todolist"
          element={
            <RequireAuth>
              <MyTodo />
            </RequireAuth>
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
