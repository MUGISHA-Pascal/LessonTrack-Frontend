import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDiscourse } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { MdQuiz } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { PiCertificateFill } from "react-icons/pi";
import { FaUserEdit } from "react-icons/fa";
const Home = () => {
  return (
    <div className="flex flex-row h-screen w-full">
      <menu className="flex flex-col space-y-[40px] w-[260px] pt-[30px] text-white bg-blue-500">
        <div className="flex flex-col space-y-[20px] items-left w-full">
          <h2 className="text-[11px] w-[140px]">Main Menu</h2>
          <div className="flex flex-col space-y-[20px] items-left pl-[70px] w-full">
            <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
              <MdSpaceDashboard />
              <p className="text-[14px]">Dashboard</p>
            </div>
            <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
              <AiFillMessage />
              <p className="text-[14px]">Inbox</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-[20px] w-full">
          <h2 className="text-[11px] w-[140px]">WorkSpace</h2>
          <div className="flex flex-col space-y-[20px] items-left pl-[70px]  w-full">
            <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
              <FaDiscourse />
              <p className="text-[14px]">Courses</p>
            </div>
            <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
              <MdQuiz />
              <p className="text-[14px]">Quiz</p>
            </div>
            <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
              <MdFeedback />
              <p className="text-[14px]">Feedback</p>
            </div>
            <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
              <FaLightbulb />
              <p className="text-[14px]">Lesson</p>
            </div>
            <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
              <BsFillQuestionSquareFill />
              <p className="text-[14px]">Questions</p>
            </div>
            <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
              <PiCertificateFill />
              <p className="text-[14px]">Certificates</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col  space-y-[20px]  w-full">
          <h2 className="text-[11px] w-[160px]">Account Settings</h2>
          <div className="flex flex-col space-y-[20px] items-left pl-[70px]  w-full">
            <div className="flex flex-row hover:cursor-pointer space-x-[10px] items-center">
              <FaUserEdit />
              <p className="text-[14px]">Edit Profile</p>
            </div>
          </div>
        </div>
      </menu>
      <main></main>
    </div>
  );
};

export default Home;
