import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Todo from "./components/Todo/Todo";
import Header from "./components/Shared/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/todo"
          element={
            <RequireAuth>
              <Todo />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
