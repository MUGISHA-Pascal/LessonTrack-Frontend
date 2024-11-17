import React, { useEffect, useRef } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDiscourse } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { MdQuiz } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { PiCertificateFill } from "react-icons/pi";
import { FaUserEdit } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-row h-screen w-full">
      <menu className="flex flex-col space-y-[40px] w-[260px] pt-[30px] text-white bg-blue-500">
        <div className="flex flex-col space-y-[20px] items-left w-full">
          <h2 className="text-[11px] w-[140px]">Main Menu</h2>
          <div className="flex flex-col space-y-[20px] items-left pl-[70px] w-full">
            <Link
              to="/"
              className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
            >
              <MdSpaceDashboard />
              <p className="text-[14px]">Dashboard</p>
            </Link>
            <Link
              to="/inbox"
              className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
            >
              <AiFillMessage />
              <p className="text-[14px]">Inbox</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-[20px] w-full">
          <h2 className="text-[11px] w-[140px]">WorkSpace</h2>
          <div className="flex flex-col space-y-[20px] items-left pl-[70px]  w-full">
            <Link
              to="/courses"
              className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
            >
              <FaDiscourse />
              <p className="text-[14px]">Courses</p>
            </Link>
            <Link
              to="/quiz"
              className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
            >
              <MdQuiz />
              <p className="text-[14px]">Quiz</p>
            </Link>
            <Link
              to="/feedback"
              className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
            >
              <MdFeedback />
              <p className="text-[14px]">Feedback</p>
            </Link>
            <Link
              to="/lesson"
              className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
            >
              <FaLightbulb />
              <p className="text-[14px]">Lesson</p>
            </Link>
            <Link
              to="/questions"
              className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
            >
              <BsFillQuestionSquareFill />
              <p className="text-[14px]">Questions</p>
            </Link>
            <Link
              to="/certificates"
              className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
            >
              <PiCertificateFill />
              <p className="text-[14px]">Certificates</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col  space-y-[20px]  w-full">
          <h2 className="text-[11px] w-[160px]">Account Settings</h2>
          <div className="flex flex-col space-y-[20px] items-left pl-[70px]  w-full">
            <Link
              to="/profile"
              className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
            >
              <FaUserEdit />
              <p className="text-[14px]">Edit Profile</p>
            </Link>
          </div>
        </div>
      </menu>
      <main className="flex-1 px-[5px]">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
