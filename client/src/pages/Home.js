import InterviewForm from "../components/InterviewForm";
import { useState } from "react";

function Home({ user, isAuth }) {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className=" flex flex-col p-5 gap-10">
      <div className=" flex justify-center">
        <InterviewForm user={user} isAuth={isAuth} />
      </div>
    </div>
  );
}

export default Home;
