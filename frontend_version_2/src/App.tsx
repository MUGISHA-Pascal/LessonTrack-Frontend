import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import Quiz from "./components/Quiz";
import Questions from "./components/Questions";
import Profile from "./components/Profile";
import profileImage from "./assets/profile.png";
import myImage from "./assets/me.jpg";
import friendImage from "./assets/friend.jpg";
import Waiting from "./components/Waiting";
import QuizWaiting from "./components/QuizWaiting";
import quizImage from "./assets/quiz.png";
import QuizQuestions from "./components/QuizQuestions";
import Cookies from "js-cookie";
import { AppContext } from "./API/AppContext";
import QuizForm from "./components/QuizForm";
import ModuleUpload from "./components/ModuleUpload";
import Users from "./components/Users";
function App() {
  let parsedUser: any;

  function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
  }

  const { jwt, setJwt } = useAppContext();
  const token = Cookies.get("jwt");
  if (token) {
    setJwt(token);
  }
  const localStorageUser = localStorage.getItem("user");
  if (localStorageUser) {
    parsedUser = JSON.parse(localStorageUser);
  }
  console.log(parsedUser);
  return (
    <div className="App h-screen">
      <BrowserRouter>
        <Navbar />{" "}
        <Routes>
          {jwt ? (
            <>
              <Route path="/" element={<Home />}>
                <Route path="" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/add_module" element={<ModuleUpload />} />
                {parsedUser.user.role === "admin" && (
                  <Route path="/users" element={<Users />} />
                )}
                <Route path="/quiz/" element={<Quiz />}>
                  <Route path="" element={<QuizWaiting />} />
                  <Route path="questions/:id" element={<QuizQuestions />} />
                </Route>

                <Route path="/QuizForm" element={<QuizForm adminId={1} />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </>
          ) : (
            <Route path="" element={<Login />} />
          )}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
