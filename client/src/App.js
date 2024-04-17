import logo from "./logo.svg";
import Home from "./pages/Home";
import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import InterviewCheatsheetPage from "./pages/InterviewCheatSheet";

function App() {
  const [jobDescription, setJobDescription] = useState(`Job Description:
  We are seeking a talented Junior React Developer to join our growing team. As a Junior React Developer, you will work closely with our experienced development team to build and maintain web applications using React.js. This is an excellent opportunity for an individual who is passionate about web development, eager to learn, and ready to contribute to exciting projects.
  
  Responsibilities:
  
  Collaborate with cross-functional teams to analyze, design, and ship new features.
  Develop and maintain web applications using React.js.
  Write clean, efficient, and maintainable code.
  Troubleshoot, debug, and optimize code for performance.
  Stay up-to-date with the latest industry trends and technologies.
  Qualifications:
  
  Bachelor's degree in Computer Science, related field, or equivalent work experience.
  Strong understanding of JavaScript, HTML5, and CSS3.
  Experience with React.js and its core principles.
  Knowledge of RESTful APIs and asynchronous request handling.
  Familiarity with version control systems such as Git.
  Strong problem-solving and communication skills.
  Eagerness to learn and stay current with emerging technologies.
  Bonus Skills:
  
  Experience with state management libraries such as Redux.
  Familiarity with front-end build tools, such as Webpack.
  Knowledge of responsive design principles.
  Understanding of software development best practices.
  What We Offer:
  
  Competitive salary commensurate with experience.
  Comprehensive benefits package, including health, dental, and vision.
  Opportunities for professional growth and career development.
  A collaborative and inclusive work environment.
  Regular team-building activities and events.
  `);
  // const googleAuthSignIn = () => {
  //   window.open(
  //     `${process.env.REACT_APP_API_URL}/auth/google/callback`,
  //     "_self"
  //   );
  // };

  // const googleAuthSignUp = () => {
  //   window.open(
  //     `${process.env.REACT_APP_API_URL}/auth/google/callback`,
  //     "_self"
  //   );
  // };
  const baseURL = "https://interview-prep-production.up.railway.app";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [isInterviewing, setIsInterviewing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("alloy");
  const [numQuestions, setNumQuestions] = useState(3); // Default number of questions
  const audioRef = useRef(null);

  const playAudio = async (index) => {
    console.log("Playing audio for question index:", index);
    console.log(currentQuestionIndex);
    console.log(interviewQuestions.length);
    if (index < interviewQuestions.length) {
      const audio = new Audio(`${baseURL}/audio/question_${index}.mp3`);
      audioRef.current = audio;

      audio.onloadedmetadata = () => {
        console.log("Duration of audio:", audio.duration); // Log the duration of the audio
        setAudioDuration(audio.duration);
        setTimeout(() => {
          console.log("Timeout finished for question index:", index);
        }, audio.duration * 1000); // Convert duration to milliseconds
      };

      audio.onended = () => {
        console.log("Audio playback ended for question index:", index);
        setAudioIsPlaying(false);
      };
      setAudioIsPlaying(true); // Set audioIsPlaying state to true before playing audio
      audio.play();
    }
  };

  const getUser = async () => {
    try {
      const url = "/auth/login/success";
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data.user);
      setUser(data.user);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (interviewQuestions.length > 0) {
      playAudio(0);
    }
  }, [interviewQuestions]); // Watch for changes in interviewQuestions
  const restartInterview = () => {
    setTranscription("");
    setCurrentQuestionIndex(0);
    setAudioDuration(0);
    setIsInterviewing(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setAudioIsPlaying(false);
  };
  const startInterview = async () => {
    try {
      // Make a POST request to the server
      setIsLoading(true);
      const response = await fetch(`${baseURL}/server/get/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription, selectedVoice, numQuestions }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch interview questions");
      }

      // Parse the response as JSON
      const data = await response.json();

      // Update state with the received interview questions
      const questionsArray = JSON.parse(data.questions).questions;
      const questionTexts = questionsArray.map(
        (questionObj) => questionObj.question
      );

      setInterviewQuestions(questionTexts);

      console.log(interviewQuestions);
    } catch (error) {
      console.error("Error fetching interview questions:", error.message);
    } finally {
      // Always set isLoading to false after completing the fetch operation
      setIsInterviewing(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Live Recording code ---------
  const addAudioElement = async (audioBlob) => {
    const url = URL.createObjectURL(audioBlob);
    console.log(audioBlob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;

    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const formData = new FormData();
      formData.append(
        "file",
        new Blob([arrayBuffer], { type: "audio/webm" }),
        "input.webm"
      );

      const response = await fetch(`${baseURL}/transcribe/stt`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setTranscription(data.transcriptionText);
      console.log("fetching...");
      if (!response.ok) {
        throw new Error("Failed to transcribe audio");
      }

      // Handle successful response here
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App min-h-100 flex flex-col p-5 gap-10">
      <BrowserRouter>
        <header>
          <nav className="App-header flex justify-between items-center">
            <NavLink onClick={restartInterview} to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </NavLink>

            <div className="min-w-100">
              <NavLink
                type="button"
                to="/interview-cheatsheet"
                className="py-3 px-7 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-00 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Get Free Interview Cheatsheet
              </NavLink>

              {/* {isAuth ? (
                <NavLink
                  type="button"
                  className="py-3 px-7 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={googleSignOut}
                >
                  {" "}
                  Sign Out
                </NavLink>
              ) : (
                <NavLink
                  type="button"
                  className="py-3 px-7 text-xs text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  to="/login"
                >
                  {" "}
                  Sign In
                </NavLink>
              )} */}
            </div>
          </nav>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <Routes>
            <Route
              index
              path="/"
              element={
                <Home
                  user={user}
                  isAuth={isAuth}
                  jobDescription={jobDescription}
                  setJobDescription={setJobDescription}
                  startInterview={startInterview}
                  isInterviewing={isInterviewing}
                  setIsInterviewing={setIsInterviewing}
                  interviewQuestions={interviewQuestions}
                  setInterviewQuestions={setInterviewQuestions}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  playAudio={playAudio}
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                  audioIsPlaying={audioIsPlaying}
                  setAudioIsPlaying={setAudioIsPlaying}
                  transcription={transcription}
                  setTranscription={setTranscription}
                  addAudioElement={addAudioElement}
                  audioDuration={audioDuration}
                  restartInterview={restartInterview}
                  selectedVoice={selectedVoice}
                  setSelectedVoice={setSelectedVoice}
                  numQuestions={numQuestions}
                  setNumQuestions={setNumQuestions}
                  baseURL={baseURL}
                />
              }
            ></Route>
            <Route
              path="/login"
              element={<Login />}
              setIsAuth={setIsAuth}
            ></Route>
            <Route
              path="/interview-cheatsheet"
              element={<InterviewCheatsheetPage />}
            />{" "}
          </Routes>
        </main>
      </BrowserRouter>

      <footer className="p-10">
        <nav>
          <a href="mailto:jsargento477@gmail.com underline">
            <span className="">hire me: jsargento477@gmail.com</span>
          </a>
        </nav>
      </footer>
    </div>
  );
}

export default App;
