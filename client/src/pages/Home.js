import InterviewForm from "../components/InterviewForm";
import InterviewStart from "../components/InterviewStart";
import { useState } from "react";

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
}) {
  return (
    <div className=" flex flex-col p-5 gap-10">
      <div className=" flex justify-center">
        {!isInterviewing ? (
          <InterviewForm
            user={user}
            isAuth={isAuth}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            startInterview={startInterview}
            setIsInterviewing={setIsInterviewing}
            setInterviewQuestions={setInterviewQuestions}
          />
        ) : (
          <InterviewStart
            isInterviewing={isInterviewing}
            interviewQuestions={interviewQuestions}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
