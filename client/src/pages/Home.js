import React, { useState } from "react";
import InterviewForm from "../components/InterviewForm";
import InterviewStart from "../components/InterviewStart";
import Loading from "../components/Loading";

function Home({
  user,
  isAuth,
  jobDescription,
  setJobDescription,
  startInterview,
  interviewQuestions,
  setInterviewQuestions,
  isInterviewing,
  setIsInterviewing,
  isLoading,
  setIsLoading,
  playAudio,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  audioIsPlaying,
}) {
  return (
    <div className="flex flex-col p-5 gap-10">
      <div className="flex justify-center">
        {isLoading ? (
          <Loading />
        ) : !isInterviewing ? (
          <InterviewForm
            user={user}
            isAuth={isAuth}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            startInterview={startInterview}
            setIsInterviewing={setIsInterviewing}
            setInterviewQuestions={setInterviewQuestions}
            setIsLoading={setIsLoading}
          />
        ) : (
          <InterviewStart
            isInterviewing={isInterviewing}
            interviewQuestions={interviewQuestions}
            audioIsPlaying={audioIsPlaying}
            playAudio={playAudio}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
