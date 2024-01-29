import logo from "./logo.svg";
import Home from "./pages/Home";
import { useState } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";

function App() {
  // const googleAuthSignIn = () => {
  //   window.open(
  //     `${process.env.REACT_APP_API_URL}/auth/google/callback`,
  //     "_self"
  //   );
  // };

  // const googleAuthSignUp = () => {
  //   window.open(
  //     `${process.env.REACT_APP_API_URL}/auth/google/callback`,
  //     "_self"
  //   );
  // };

  const [user, setUser] = useState(null);

  const [isAuth, setIsAuth] = useState(false);

  const getUser = async () => {
    try {
      const url = "http://localhost:8080/auth/login/success";
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data.user);
      setUser(data.user);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  const googleSignOut = () => {
    setIsAuth(false);
    window.open("http://localhost:8080/auth/logout", "_self");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App min-h-100 flex flex-col p-5 gap-10">
      <BrowserRouter>
        <header>
          <nav className="App-header flex justify-between items-center">
            <NavLink className="min-w-100" to="/home">
              <img src={logo} className="App-logo" alt="logo" />{" "}
            </NavLink>
            <div className="min-w-100">
              <button
                type="button"
                className="py-3 px-7 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Get Free Interview Cheatsheet
              </button>

              {isAuth ? (
                <NavLink
                  type="button"
                  className="py-3 px-7 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={googleSignOut}
                >
                  {" "}
                  Sign Out
                </NavLink>
              ) : (
                <NavLink
                  type="button"
                  className="py-3 px-7 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  to="/login"
                >
                  {" "}
                  Sign In
                </NavLink>
              )}
            </div>
          </nav>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <Routes>
            <Route index element={<Home user={user} isAuth={isAuth} />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route
              path="/login"
              element={<Login />}
              setIsAuth={setIsAuth}
            ></Route>
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
