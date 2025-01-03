import React, { useContext, useState } from "react";
import { MdSpaceDashboard, MdMenu } from "react-icons/md";
import { FaDiscourse } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { MdQuiz } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { PiCertificateFill } from "react-icons/pi";
import { FaUserEdit } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoEnter } from "react-icons/io5";
import { AppContext } from "../API/AppContext";
import { IoPeople } from "react-icons/io5";
import Cookies from "js-cookie";

const Home = () => {
  let parsedUser: any;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the sidebar visibility
  function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
  }
  const localStorageUser = localStorage.getItem("user");
  if (localStorageUser) {
    parsedUser = JSON.parse(localStorageUser);
  }
  const { jwt, setJwt } = useAppContext();
  const logout = () => {
    Cookies.remove("jwt");
    setJwt("");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <div className="flex flex-row h-full w-full">
      {/* Sidebar - Hidden on small screens and toggled with the burger icon */}
      <menu
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`flex flex-col space-y-[40px] w-[260px] pt-[30px]  max-md:absolute max-md:left-0 z-20  max-md:top-[60px] max-md:bottom-0 text-white bg-blue-500 ${
          isMenuOpen ? "block" : "hidden"
        } lg:block`}
      >
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
          </div>
        </div>
        <div className="flex flex-col space-y-[20px] w-full">
          <h2 className="text-[11px] w-[140px]">WorkSpace</h2>
          <div className="flex flex-col space-y-[20px] items-left pl-[70px] w-full">
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
              <p className="text-[14px]">Tests</p>
            </Link>
            {parsedUser.user.role === "admin" && (
              <Link
                to="/users"
                className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
              >
                <IoPeople />
                <p className="text-[14px]">Users</p>
              </Link>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-[20px] w-full">
          <h2 className="text-[11px] w-[160px]">Account Settings</h2>
          <div className="flex flex-col space-y-[20px] items-left pl-[70px] w-full">
            <Link
              to="/profile"
              className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
            >
              <FaUserEdit />
              <p className="text-[14px]">Edit Profile</p>
            </Link>
            <button
              className="flex flex-row hover:cursor-pointer space-x-[10px] items-center"
              onClick={logout}
            >
              <IoEnter />
              <p className="text-[14px]">Logout</p>
            </button>
          </div>
        </div>
      </menu>

      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden flex absolute top-0 items-center p-4">
        <MdMenu
          size={30}
          className="text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle the sidebar visibility
        />
      </div>

      {/* Main content area */}
      <main className="relative flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
