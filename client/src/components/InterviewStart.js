import React, { useState, useEffect } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import "../App.css";
import Loading from "../components/Loading";

const InterviewStart = ({
  user,
  isAuth,
  interviewQuestions,
  playAudio,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setAudioIsPlaying,
  transcription,
  setTranscription,
  addAudioElement,
  audioIsPlaying,
}) => {
  const recorderControls = useAudioRecorder();
  const [interviewData, setInterviewData] = useState([]);
  const [generatingResult, setGeneratingResult] = useState(false);

  const handleNextClick = () => {
    const updatedData = [...interviewData];
    updatedData[currentQuestionIndex] = {
      question: interviewQuestions[currentQuestionIndex],
      transcription: transcription,
    };
    setInterviewData(updatedData);
    setTranscription("");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    playAudio(currentQuestionIndex + 1);
  };

  useEffect(() => {
    console.log(interviewData);

    if (currentQuestionIndex === interviewQuestions.length) {
      // Interview has ended, send interview data
      setGeneratingResult(true);
      const sendInterviewDataToServer = async (interviewData) => {
        try {
          const response = await fetch(
            "http://localhost:8080/process-interview",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ interviewData }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to process interview data");
          }

          const suggestions = await response.json();
          console.log(JSON.parse(suggestions));
          console.log("Suggestions for improvement:", suggestions);
          // Update state or UI to display suggestions
          setGeneratingResult(false);
        } catch (error) {
          console.error("Error processing interview data:", error.message);
        }
      };
      sendInterviewDataToServer(interviewData);
    }
  }, [currentQuestionIndex, interviewData, interviewQuestions.length]);

  return (
    <>
      {generatingResult ? (
        <Loading />
      ) : (
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
              <div
                className={`flex flex-col items-center justify-center gap-10 ${
                  audioIsPlaying ? "hidden" : ""
                }`}
              >
                <AudioRecorder
                  onRecordingComplete={(audioBlob) => {
                    // Call addAudioElement when recording is complete
                    addAudioElement(audioBlob);
                  }}
                  audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                  }}
                  downloadFileExtension="webm"
                  showVisualizer={true}
                  classes="p-6 rounded-lg text-lg"
                  recorderControls={recorderControls}
                />

                <textarea
                  className="border border-gray-300 rounded-lg p-4 w-full text-center text-gray-500 h-40 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  value={transcription}
                  onChange={(e) => setTranscription(e.target.value)}
                  rows={10}
                  cols={50}
                  placeholder="Your Answer Will Be Displayed Here...."
                  // readOnly={true}
                />
              </div>
              {transcription && (
                <button
                  onClick={handleNextClick}
                  className="py-3 px-7 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  {currentQuestionIndex === interviewQuestions.length - 1
                    ? "End Interview"
                    : "Next Question"}
                </button>
              )}
            </div>
          ) : (
            <button className="py-3 px-7 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Download PDF Results
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default InterviewStart;
