import React from "react";
import quizImage from "../assets/quiz.png";

const QuizWaiting = () => {
  return (
    <div className="h-full w-full flex flex-row items-center justify-center">
      <img
        src={quizImage}
        className="w-[400px] h-auto"
        alt="quiz waiting image"
      />
    </div>
  );
};

export default QuizWaiting;
