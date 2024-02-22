import React, { useEffect } from "react";

const InterviewStart = ({
  user,
  isAuth,
  interviewQuestions,
  playAudio,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  audioIsPlaying,
  setAudioIsPlaying,

  transcription,

  setTranscription,
}) => {
  useEffect(() => {
    // Play audio when currentQuestionIndex changes
    if (currentQuestionIndex < interviewQuestions.length) {
      playAudio(currentQuestionIndex);
      setAudioIsPlaying(true);
    }
  }, [currentQuestionIndex, interviewQuestions, playAudio, setAudioIsPlaying]);

  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setAudioIsPlaying(false); // Stop playing audio when moving to next question
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
      {/* {audioIsPlaying && ( */}
      <div className="flex items-center justify-center">
        <textarea
          className="text-gray-300 bg-transparent"
          value={transcription}
          onChange={(e) => setTranscription(e.target.value)}
          rows={10}
          cols={50}
          placeholder="Your Answer Will Be Displayed Here...."
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default InterviewStart;
