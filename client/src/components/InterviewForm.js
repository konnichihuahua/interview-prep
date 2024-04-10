import React, { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa"; // Importing gear icon from FontAwesome

const InterviewForm = ({
  user,
  isAuth,
  jobDescription,
  setJobDescription,
  startInterview,
  setIsInterviewing,
  setIsLoading,
  selectedVoice,
  setSelectedVoice,
  numQuestions,
  setNumQuestions,
}) => {
  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };
  const [text, setText] = useState("");
  const [isBlinking, setIsBlinking] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const originalText = "Ready to ace your interview?";
  let index = 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setText(originalText.substring(0, index));
      index++;
      if (index > originalText.length) {
        clearInterval(timer);
        setIsBlinking(true);
      }
    }, 50); // Adjust typing speed as needed

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setIsBlinking((prevBlink) => !prevBlink);
    }, 500); // Adjust blinking speed as needed

    return () => clearInterval(blinkTimer);
  }, []);
  const handleGearClick = () => {
    setShowSettings((prev) => !prev); // Toggle the visibility of settings form
  };

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
  };

  const handleNumQuestionsChange = (e) => {
    setNumQuestions(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col rounded-md p-5 gap-3">
      <FaCog
        className="text-gray-300 mr-2 self-end"
        size={32}
        onClick={handleGearClick}
      />{" "}
      {showSettings && (
        <form className="flex flex-col gap-5 text-white bg-gray-800 p-10 rounded">
          <label className="text-xl">Select Voice:</label>
          <select
            value={selectedVoice}
            onChange={handleVoiceChange}
            className="p-2 text-gray-700"
          >
            <option value="Alloy">Alloy</option>
            <option value="Echo">Echo</option>
            <option value="Fable">Fable</option>
            <option value="Onyx">Onyx</option>
            <option value="Nova">Nova</option>
            <option value="Shimmer">Shimmer</option>
          </select>
          <label className="text-xl">Number of Questions:</label>
          <input
            type="number"
            value={numQuestions}
            onChange={handleNumQuestionsChange}
            className="p-2 text-gray-700"
          />
        </form>
      )}
      <h1 className="mb-3 text-white">
        <p className="text-4xl font-bold relative overflow-hidden">
          {text}
          {isBlinking && (
            <span className="inline-block w-1 h-5 bg-white mx-1"></span>
          )}
        </p>
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
        <p>
          Please ensure your{" "}
          <span className="underline"> microphone and earphones</span> are ready
          before starting the job interview.
        </p>
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
