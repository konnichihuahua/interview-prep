import React, { useState, useEffect } from "react";
import "../App.css";

const Loading = ({ user, isAuth, interviewQuestions }) => {
  const [loadingText, setLoadingText] = useState(
    "Stay positive, even if it's raining cats and dogs"
  );

  useEffect(() => {
    const phrases = [
      "Smile big, nerves small",
      "Eye contact, not staring contests",
      "Sit tall, no slouching allowed",
      "Mirror their vibe, but stay authentic",
      "Silence is golden, think before you speak",
      "Show passion, not desperation",
      "Don't trash talk previous employers",
      "Be early, but not too early",
      "Stay positive, even if it's raining cats and dogs",
      "Follow up, but don't stalk",
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      setLoadingText(phrases[currentIndex]);
      currentIndex = (currentIndex + 1) % phrases.length;
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col rounded-md p-5 gap-3 items-center justify-center text-white">
      <div className="inline-block h-20 text-cyan-400 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <Typewriter text={loadingText} />
    </div>
  );
};

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    let timer;

    const updateText = () => {
      if (currentIndex === text.length) {
        clearInterval(timer);
      } else {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
      }
    };

    timer = setInterval(updateText, 75);

    return () => clearInterval(timer);
  }, [text]);

  return <span className="text-lg">{displayText}</span>;
};

export default Loading;
