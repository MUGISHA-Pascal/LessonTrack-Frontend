import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Inbox from "./components/Inbox";
import Courses from "./components/Courses";
import Quiz from "./components/Quiz";
import Feedback from "./components/Feedback";
import Lesson from "./components/Lesson";
import Questions from "./components/Questions";
import Certificates from "./components/Certificates";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="" element={<Dashboard />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/lesson" element={<Lesson />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
