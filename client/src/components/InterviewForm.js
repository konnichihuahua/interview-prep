import React, { useState } from "react";

const InterviewForm = ({ user, isAuth }) => {
  const [jobDescription, setJobDescription] = useState("");
  const [interviewQuestions, setInterviewQuestions] = useState([]);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const startInterview = async () => {
    try {
      // Make a POST request to the server
      const response = await fetch(
        "http://localhost:8080/server/get/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobDescription }),
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch interview questions");
      }

      // Parse the response as JSON
      const data = await response.json();

      // Update state with the received interview questions
      // setInterviewQuestions(data.questions);
      console.log(data.questions);
      // Additional logic as needed
      console.log("Received Interview Questions:", data.questions);
    } catch (error) {
      console.error("Error fetching interview questions:", error.message);
    }
  };

  return (
    <div className="flex flex-col rounded-md p-5 gap-3">
      <h1 className="mb-3">
        <span className="text-4xl text-white font-medium tracking-tight">
          {isAuth
            ? `Hey ${user.displayName}, ready to ace your interview?`
            : "Ready to ace your interview?"}
        </span>
      </h1>
      <p className="text-gray-400 text-lg">
        {" "}
        A.I. powered interview preparation app
      </p>
      <form className="flex flex-col gap-5">
        <label className="text-xl">Job Description:</label>
        <textarea
          className="h-full p-10 text-gray-700"
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={handleJobDescriptionChange}
        />
        <p>Sign in to get better questions in accordance to your resume.</p>
        <button
          type="button"
          onClick={startInterview}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-7 text-center me-2 mb-2"
        >
          START INTERVIEW
        </button>
      </form>
    </div>
  );
};

export default InterviewForm;
