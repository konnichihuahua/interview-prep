import logo from "./logo.svg";
import Home from "./pages/Home";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";

function App() {
  const googleAuthSignIn = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  const googleAuthSignUp = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      fetch("http://localhost:8080/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Authentication failed");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  console.log(user);

  return (
    <div className="App min-h-100 flex flex-col p-5 gap-10">
      <BrowserRouter>
        <header>
          <nav className="App-header flex justify-between items-center">
            <NavLink to="/home">
              <img src={logo} className="App-logo" alt="logo" />{" "}
            </NavLink>
            <div>
              <button
                type="button"
                className="py-3 px-7 text-sm text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Get Free Interview Cheatsheet
              </button>
              <NavLink
                className="py-3 px-7 text-sm text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                to="/login"
              >
                {" "}
                Sign In
              </NavLink>
            </div>
          </nav>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
      <footer className="p-10">
        <nav>
          <a href="mailto:jsargento477@gmail.com underline">
            <span className="">hire me: jsargento477@gmail.com</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}

export default App;
