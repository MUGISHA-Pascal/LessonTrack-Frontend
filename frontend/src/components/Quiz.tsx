import React from "react";
import { IoSearch } from "react-icons/io5";
import quizImage from "../assets/quiz.png";
import { Link, Outlet } from "react-router-dom";
interface childProps {
  quizes: {
    id: number;
    title: string;
    questions: string;
    image: string;
    date: string;
  }[];
}
const Quiz: React.FC<childProps> = ({ quizes }) => {
  return (
    <div className="flex flex-col">
      <header className="border-b-[1px] flex flex-row items-center justify-start px-[10px] h-[50px] border-gray-300">
        <h2 className="text-gray-700">Quiz</h2>
      </header>
      <div className="flex flex-row">
        <menu className="w-[580px] flex flex-col">
          <div className="p-[10px] border-b-[1px] border-gray-300 w-full ">
            <div className="flex flex-row items-center h-[40px] bg-gray-100 px-[10px] space-x-[5px] w-[400px] rounded-[10px]">
              <IoSearch className="text-gray-500" />
              <input
                type="text"
                className="w-[200px] h-[40px] focus:outline-none bg-gray-100 text-gray-500 text-[13px] placeholder:text-[13px] placeholder:text-gray-500 "
                placeholder="search by course"
              />
            </div>
          </div>
          <main className="messageDiv mt-[20px] grid grid-cols-3 shadow gap-[20px] pt-[20px] h-[390px] rounded-[10px] p-[10px] overflow-y-auto place-items-center">
            {quizes.map((quiz) => (
              <Link
                to={`/quiz/questions/${quiz.id}`}
                key={quiz.id}
                className="w-[170px] rounded-[10px] flex flex-col space-y-[10px] items-center justify-center cursor-pointer h-auto shadow"
              >
                <img
                  src={quiz.image}
                  alt="quiz image"
                  className="w-[160px] h-auto"
                />
                <h2 className="text-gray-700 text-[13px] text-left font-semibold w-[160px]">
                  {quiz.title}
                </h2>
                <div className="w-[160px] flex flex-row justify-between p-[7px]">
                  <p className="text-gray-500 text-[10px]">
                    {quiz.questions} questions
                  </p>
                  <p className="text-gray-500 text-[10px]">{quiz.date}</p>
                </div>
              </Link>
            ))}
          </main>
        </menu>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Quiz;
