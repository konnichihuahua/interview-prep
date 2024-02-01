import React, { useState } from "react";

const InterviewStart = ({ user, isAuth, interviewQuestions }) => {
  return (
    <div className="flex flex-col rounded-md p-5 gap-3">
      <h1 className="mb-3">
        <span className="text-4xl text-white font-medium tracking-tight">
          {isAuth
            ? `Hey ${user.displayName}, ready to ace your interview?`
            : "Ready to ace your interview?"}
        </span>
      </h1>
      {interviewQuestions}
      <button
        type="button"
        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-7 text-center me-2 mb-2"
      >
        START INTERVIEW
      </button>
    </div>
  );
};

export default InterviewStart;
