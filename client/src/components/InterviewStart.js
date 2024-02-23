import React, { useEffect } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import "../App.css";
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
  addAudioElement,
}) => {
  useEffect(() => {
    // Play audio when currentQuestionIndex changes
    if (currentQuestionIndex < interviewQuestions.length) {
      playAudio(currentQuestionIndex);
      setAudioIsPlaying(true);
    }
  }, [currentQuestionIndex, interviewQuestions, playAudio, setAudioIsPlaying]);
  const recorderControls = useAudioRecorder();

  const handleNextClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setAudioIsPlaying(false); // Stop playing audio when moving to next question
  };

  return (
    <div className="flex flex-col rounded-md p-5 gap-10">
      <h1 className="mb-3 items-center justify-center">
        <span className="text-4xl text-white font-medium tracking-tigh text-center">
          Interview Ongoing...
        </span>
      </h1>

      {currentQuestionIndex < interviewQuestions.length ? (
        <div className="flex flex-col items-center justify-center gap-10">
          <p className="text-center text-2xl">
            Question {currentQuestionIndex + 1}:{" "}
            {interviewQuestions[currentQuestionIndex]}
          </p>

          <textarea
            className="border border-gray-300 rounded-lg p-4 w-full text-center text-gray-500 h-40 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            rows={10}
            cols={50}
            placeholder="Your Answer Will Be Displayed Here...."
          />

          <AudioRecorder
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            downloadFileExtension="webm"
            showVisualizer="true"
            classes="p-6 rounded-lg text-lg"
            recorderControls={recorderControls}
          />
          <button onClick={handleNextClick} className="recorder-btn">
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
