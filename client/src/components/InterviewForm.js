import React, { useState } from "react";

const InterviewForm = ({
  user,
  isAuth,
  jobDescription,
  setJobDescription,
  startInterview,
  setIsInterviewing,
}) => {
  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
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
