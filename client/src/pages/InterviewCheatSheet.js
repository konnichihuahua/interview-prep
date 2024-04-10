import React, { useState } from "react";

const InterviewCheatsheetPage = () => {
  const [email, setEmail] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to save email");
      }

      setConfirmationMessage("Thank you! Your email has been saved.");
    } catch (error) {
      console.error("Error saving email:", error);
      setConfirmationMessage("Failed to save email. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl mb-4">Get Free Interview Cheatsheet</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
          />
          <br />
          <button
            type="submit"
            className="bg-cyan-400 px-4 py-2 mt-4 rounded-md hover:bg-cyan-500 focus:outline-none focus:ring focus:ring-cyan-400 focus:ring-opacity-50"
          >
            Download PDF
          </button>
        </form>
        {confirmationMessage && <p className="mt-4">{confirmationMessage}</p>}
      </div>
    </div>
  );
};

export default InterviewCheatsheetPage;
