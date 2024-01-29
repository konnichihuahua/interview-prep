// LoginForm.js
import GoogleButton from "react-google-button";
import React, { useState } from "react";

const LoginForm = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    console.log("Signing in with:", email, password);
  };

  const googleSignIn = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    <div className="flex justify-center items-center">
      <form className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full border rounded-md p-2"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border rounded-md p-2"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <div className="text-black text-center p-1"> or</div>
        <GoogleButton className="min-w-full" onClick={googleSignIn} />
      </form>
    </div>
  );
};

export default LoginForm;
