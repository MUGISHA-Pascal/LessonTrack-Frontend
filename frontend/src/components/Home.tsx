import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDiscourse } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
const Home = () => {
  return (
    <div className="flex flex-row h-screen w-full">
      <menu className="flex flex-col space-y-[60px] w-[250px] items-center pt-[100px] text-white bg-blue-500">
        <div className="flex flex-col space-y-[30px] items-left pl-[50px] w-full">
          <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
            <MdSpaceDashboard />
            <p className="text-[14px]">Dashboard</p>
          </div>
          <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
            <FaDiscourse />
            <p className="text-[14px]">Courses</p>
          </div>
          <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
            <MdQuiz />
            <p className="text-[14px]">Quiz</p>
          </div>
        </div>
      </menu>
      <main></main>
    </div>
  );
};

export default Home;
