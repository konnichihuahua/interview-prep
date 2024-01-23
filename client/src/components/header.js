import React from "react";
import logo from "../logo.svg";

function Header({ setShowLogin }) {
  return (
    <div className="App-header flex justify-between items-center">
      <img src={logo} className="App-logo" alt="logo" />{" "}
      <div>
        <button
          type="button"
          className="py-7 px-12 text-2xl text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          GET FREE INTERVIEW CHEATSHEET
        </button>
        <button
          type="button"
          className="py-7 px-12 text-2xl text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => setShowLogin(true)}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default Header;
