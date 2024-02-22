import React from "react";
import { FiCommand } from "react-icons/fi";
import "../App.css";
const Loading = ({ user, isAuth, interviewQuestions }) => {
  return (
    <div className="flex flex-col rounded-md p-5 gap-3 items-center justify-center">
      <FiCommand className="loading-icon" />
      Loading...
    </div>
  );
};

export default Loading;
