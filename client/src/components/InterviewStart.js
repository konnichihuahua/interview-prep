import React, { useState, useEffect } from "react";

const InterviewStart = ({
  user,
  isAuth,
  interviewQuestions,
  playAudio,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  audioIsPlaying,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Play audio when currentQuestionIndex changes
    if (currentQuestionIndex < interviewQuestions.length) {
      playAudio(currentQuestionIndex);
      setIsPlaying(true);
    }
  }, [currentQuestionIndex, interviewQuestions, playAudio]);

  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setIsPlaying(false); // Stop playing audio when moving to next question
  };

  const [transcription, setTranscription] = useState("");
  const [listening, setListening] = useState(false);
  const recognition = new window.webkitSpeechRecognition();

  recognition.continuous = true;

  recognition.onstart = () => {
    setListening(true);
  };
  recognition.onerror = (event) => {
    if (event.error === "no-speech") {
      console.log("No speech detected. Please try again.");
      // Optionally, you can provide feedback to the user here
    } else {
      console.error("Speech recognition error:", event.error);
    }
    setListening(false);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    setTranscription((prevTranscription) => prevTranscription + transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setListening(false);
  };

  const toggleListening = () => {
    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
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
      {/* <ul>
        {interviewQuestions.questions.map((question, index) => (
          <li key={index}>
            <strong>Question:</strong> {question.question} <br />
            <strong>Category:</strong> {question.category} <br />
            <strong>Difficulty:</strong> {question.difficulty} <br />
            <br />
          </li>
        ))}
      </ul> */}
      {!audioIsPlaying && (
        <div>
          <button onClick={toggleListening}>
            {listening ? "Stop Listening" : "Start Listening"}
          </button>
          <textarea
            className="text-gray-300"
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            rows={10}
            cols={50}
            placeholder="Speech to Text..."
          />
        </div>
      )}
      {currentQuestionIndex < interviewQuestions.length ? (
        <div>
          <p>
            Question {currentQuestionIndex + 1}:{" "}
            {interviewQuestions[currentQuestionIndex]}
          </p>
          <button onClick={handleNextClick}>
            {currentQuestionIndex === interviewQuestions.length - 1
              ? "End Interview"
              : "Next"}
          </button>
        </div>
      ) : (
        <button
          onClick={() =>
            console.log(currentQuestionIndex, interviewQuestions.length)
          }
        >
          {" "}
          Download PDF Results
        </button>
      )}
    </div>
  );
};

export default InterviewStart;
