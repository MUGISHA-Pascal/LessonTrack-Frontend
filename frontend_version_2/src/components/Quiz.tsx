import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddQuizModal from "./AddQuizModal";
import { MdSystemUpdateAlt } from "react-icons/md";
import { IoPushOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import notfound from "../assets/search.png";
import Cookies from "js-cookie";
import tubeSinner from "../assets/tube-spinner.svg";
interface Quiz {
  id: number;
  course_id: number;
  title: string;
  max_attempts: number;
  type_of: "exam" | "quiz";
}

const Quiz: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalShow, setShowModal] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/quiz/`);
        setQuizzes(response.data.quizzes);
      } catch (err) {
        setError("Failed to fetch quizzes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId: number) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    const user = localStorage.getItem("user");
    let correctUser;
    if (user) {
      correctUser = JSON.parse(user);
    } else {
      alert("User not found in localStorage. Please log in.");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:4000/quiz/delete/${quizId}/${correctUser.user.id}`
      );
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.id !== quizId)
      );
    } catch (err) {
      alert("Failed to delete the quiz. Please try again later.");
    }
  };

  const handleSetQuestions = (quizId: number, title: string) => {
    window.location.href = `questions?data=${quizId}&&title=${title}`;
  };

  if (loading)
    return (
      <div className="h-full w-full grid place-items-center">
        <img
          src={tubeSinner}
          alt="Description of the icon"
          width="50"
          height="50"
        />
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="dashDiv max-md:w-screen flex flex-col h-full overflow-auto">
      <header className="border-b-[1px] mb-[30px] flex items-center justify-between  px-[10px] h-[50px]  border-gray-300">
        <h2 className="text-2xl font-bold  text-blue-500">Tests</h2>
      </header>
      <Link
        to="/QuizForm"
        className="border-dashed border-2 ml-[30px] hover:bg-gray-100 rounded w-[200px] px-6 py-2 text-gray-700 text-sm border-gray-300"
      >
        + Add Test
      </Link>
      <main className="flex flex-col border-t-[1px] mt-[20px] border-gray-300 shadow-md h-[430px] max-md:w-full">
        {quizzes.length === 0 ? (
          <div className="w-full flex mt-[50px] flex-row items-center justify-center">
            <img src={notfound} className="w-auto h-[270px]" alt="not found" />
          </div>
        ) : (
          <table className=" max-md:text-[11px] md:w-[800px] mt-[30px] md:m-[20px] border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2  text-gray-700 text-left">
                  ID
                </th>
                <th className="border border-gray-200 px-4 py-2 text-gray-700 text-left">
                  Title
                </th>
                <th className="border border-gray-200 px-4 py-2 text-gray-700 text-left">
                  Type
                </th>
                <th className="border max-md:text-[10px] border-gray-200 px-4 py-2 text-gray-700 text-left">
                  Max Attempts
                </th>
                <th className="border border-gray-200 px-4 py-2   text-gray-700 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-gray-50 text-[14px]">
                  <td className="border  max-md:text-[11px] border-gray-200  text-gray-700 px-4 py-2">
                    {quiz.id}
                  </td>
                  <td className="border  max-md:text-[11px] border-gray-200 text-gray-700 px-4 py-2">
                    {quiz.title}
                  </td>
                  <td className="border  max-md:text-[11px] border-gray-200 text-gray-700 px-2 py-2">
                    {quiz.type_of}
                  </td>
                  <td className="border  max-md:text-[11px] border-gray-200 text-gray-700 px-2 py-2">
                    {quiz.max_attempts}
                  </td>
                  <td className="border  max-md:text-[11px] border-gray-200 px-4 py-2 flex flex-row align-middle items-center justify-center  space-x-[40px]">
                    <button
                      onClick={() => setShowModal(true)}
                      className="text-blue-500 flex flex-row items-center space-x-[10px] font-semibold justify-center hover:cursor-pointer text-[15px]"
                    >
                      <MdSystemUpdateAlt className="text-[18px] font-bold" />
                      <span>Edit</span>
                    </button>
                    {modalShow && (
                      <AddQuizModal
                        setShowModal={setShowModal}
                        quizId={quiz.id}
                      />
                    )}

                    <button
                      onClick={() => handleSetQuestions(quiz.id, quiz.title)}
                      className="text-green-500 flex flex-row items-center space-x-[10px] font-semibold justify-center hover:cursor-pointer text-[15px]"
                    >
                      <IoPushOutline className="text-[23px] font-bold" />
                      <span>Set Questions</span>
                    </button>
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="text-red-500 flex flex-row items-center space-x-[10px] font-semibold justify-center hover:cursor-pointer text-[15px]"
                    >
                      <AiOutlineDelete className="text-[23px] font-bold" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Quiz;
