import React from "react";
import { IoSearch } from "react-icons/io5";
import quizImage from "../assets/quiz.png";
const Quiz = () => {
  const quizes = [
    {
      id: 1,
      title: "Mastering UI Design for Impactful Solutions",
      questions: "10",
      image: quizImage,
      date: "02/03/2024",
    },
    {
      id: 2,
      title: "A symphony of colors in UI Design",
      questions: "15",
      image: quizImage,
      date: "02/03/2024",
    },
    {
      id: 3,
      title: "Bridging Users and UI in Design Harmony",
      questions: "25",
      image: quizImage,
      date: "02/03/2024",
    },
    {
      id: 4,
      title: "Mastering UI Design for Impactful Solutions",
      questions: "10",
      image: quizImage,
      date: "02/03/2024",
    },
    {
      id: 5,
      title: "Mastering UI Design for Impactful Solutions",
      questions: "10",
      image: quizImage,
      date: "02/03/2024",
    },
    {
      id: 6,
      title: "Mastering UI Design for Impactful Solutions",
      questions: "10",
      image: quizImage,
      date: "02/03/2024",
    },

    {
      id: 7,
      title: "Mastering UI Design for Impactful Solutions",
      questions: "10",
      image: quizImage,
      date: "02/03/2024",
    },
  ];
  return (
    <div className="flex flex-col">
      <header className="border-b-[1px] flex flex-row items-center justify-start px-[10px] h-[50px] border-gray-300">
        <h2 className="text-gray-700">Quiz</h2>
      </header>
      <div className="flex flex-row">
        <menu className="w-[600px] flex flex-col">
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
          <main className="messageDiv grid grid-cols-3 gap-[20px] pt-[20px] h-[350px] overflow-y-auto place-items-center">
            {quizes.map((quiz) => (
              <div
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
                  <p className="text-gray-500 text-[10px]">{quiz.questions}</p>
                  <p className="text-gray-500 text-[10px]">{quiz.date}</p>
                </div>
              </div>
            ))}
          </main>
        </menu>
      </div>
    </div>
  );
};

export default Quiz;
