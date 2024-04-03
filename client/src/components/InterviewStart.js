import React, { useState, useEffect } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "../App.css";
import LoadingResults from "../components/LoadingResults";

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
  setIsInterviewing,
  restartInterview,
}) => {
  const recorderControls = useAudioRecorder();
  const [interviewData, setInterviewData] = useState([]);
  const [generatingResult, setGeneratingResult] = useState(false);
  const [interviewResults, setInterviewResults] = useState([]);
  const [interviewComplete, setInterviewComplete] = useState(false);

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
  const handleDownloadPDF = () => {
    // Initialize a new jspdf instance
    const pdf = new jsPDF("p", "mm", "a4");

    interviewResults.forEach((item, index) => {
      const interviewResultElement = document.getElementById(
        `question-${index}`
      );

      html2canvas(interviewResultElement).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = 210;
        let pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // A4 size in mm
        if (index < interviewResults.length - 1) {
          pdf.addPage();
        } else {
          pdf.save("interview_results.pdf");
        }
      });
    });
  };

  // const handleDownloadPDF = () => {
  //   // Select the element containing interview results
  //   const interviewResultsElement =
  //     document.getElementById("interview-results");

  //   // Use html2canvas to capture the element as an image
  //   html2canvas(interviewResultsElement).then((canvas) => {
  //     // Initialize a new jspdf instance
  //     const pdf = new jsPDF("p", "mm", "a4");

  //     // Set initial values
  //     let pdfWidth = 210; // A4 size in mm
  //     let pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  //     let position = 0;

  //     // Function to add a new page
  //     const addNewPage = () => {
  //       pdf.addPage();
  //       position = 0;
  //     };

  //     // Function to add content to the PDF
  //     const addContentToPdf = () => {
  //       const imgData = canvas.toDataURL("image/png");
  //       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
  //       position += pdfHeight;

  //       // Check if content exceeds the page height
  //       if (position >= pdf.internal.pageSize.height) {
  //         addNewPage();
  //       }
  //     };

  //     // Add initial content to the PDF
  //     addContentToPdf();

  //     // Download the PDF
  //     pdf.save("interview_results.pdf");
  //   });
  // };

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
          console.log(typeof suggestions[0].suggestedImprovements);

          const mappedSuggestions = suggestions.map((suggestion) => {
            // Parse the JSON string
            const parsedSuggestion = JSON.parse(suggestion);
            // You can access and manipulate the properties of the parsedQuestion object here as needed
            return parsedSuggestion;
          });

          console.log(mappedSuggestions);
          setInterviewResults(mappedSuggestions);
          setGeneratingResult(false);
          setInterviewComplete(true);
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
        <LoadingResults />
      ) : (
        <div className="flex flex-col rounded-md p-5 gap-10 justify-center items-center">
          <h1 className="mb-3 items-center justify-center">
            <span className="text-3xl text-white font-medium tracking-tight">
              {interviewComplete ? (
                <div>
                  {" "}
                  Great Job! You can now{" "}
                  <span
                    className="underline text-cyan-400"
                    onClick={() => handleDownloadPDF()}
                  >
                    download the pdf results,
                  </span>{" "}
                  or
                  <span
                    className="underline text-cyan-400"
                    onClick={() => restartInterview()}
                  >
                    {" "}
                    start another interview."
                  </span>
                </div>
              ) : (
                "Interview Ongoing..."
              )}
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
                <div>
                  <p className="text-xs text-center mx-5">
                    {" "}
                    Note: Please remember to click the microphone icon below to
                    start recording your answer, and then click the save icon to
                    save it.{" "}
                  </p>
                </div>

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
                  classNamees="p-6 rounded-lg text-lg"
                  recorderControls={recorderControls}
                />
                <textarea
                  className="border border-gray-300 rounded-lg p-4 w-full text-center text-gray-500 h-40 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  value={transcription}
                  onChange={(e) => setTranscription(e.target.value)}
                  rows={10}
                  cols={50}
                  style={{ wordWrap: "break-word" }} // Add this line
                  placeholder="Your Answer Will Be Displayed Here...."
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
            <div
              className="bg-gray-800 text-white p-8 rounded-lg shadow-lg "
              id="interview-results"
            >
              <h2 className="text-3xl mb-8">Interview Results</h2>

              {interviewResults.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-600 pb-8 mb-8 flex flex-col gap-5 bg-gray-800 text-white p-8 rounded-lg shadow-lg question-results"
                  id={`question-${index}`}
                >
                  <h2 className="text-xl mb-4 text-cyan-400 font-bold">
                    Question #{index + 1}:{" "}
                    <span className="text-white font-normal">
                      {""} {item.interviewQuestion}{" "}
                    </span>
                  </h2>

                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-1">
                      <span className="font-bold text-cyan-400">
                        Your Answer:
                      </span>
                    </h3>
                    {item.interviewAnswer}
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-1 text-cyan-400">
                      Your answer is{" "}
                      <span className="underline font-bold">
                        {item.improvementSuggestions.Rating},
                      </span>{" "}
                      Why?
                    </h3>
                    <ul className="list-disc list-inside mb-2">
                      <li className="mb-1">
                        {item.improvementSuggestions.Clarity}
                      </li>
                      <li className="mb-1">
                        {item.improvementSuggestions.Relevance}
                      </li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-bold text-cyan-400">
                      What you can do for improvements?:
                    </h3>
                    <ul className="list-disc list-inside">
                      {item.improvementSuggestions.Effectiveness.map(
                        (effectiveness, idx) => (
                          <li key={idx}>{effectiveness}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ))}

              <button
                onClick={handleDownloadPDF}
                className="py-3 px-7 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Download PDF Results
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InterviewStart;
