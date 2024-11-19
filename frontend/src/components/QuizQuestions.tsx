import React from "react";
import { useParams } from "react-router-dom";
interface childProps {
  quizes: {
    id: number;
    title: string;
    questions: string;
    image: string;
    date: string;
  }[];
}
const QuizQuestions: React.FC<childProps> = ({ quizes }) => {
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id) - 1;
  return (
    <div className="flex flex-col">
      <header className="h-[40px] flex flex-row items-center pl-[30px]">
        <h2 className="text-gray-700">{quizes[quizId].title}</h2>
      </header>
    </div>
  );
};

export default QuizQuestions;
