import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

interface QuizQuestion {
  quiz_id: string;
  question: string;
  options: string[];
  correct_answer: string;
}

const Questions = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const quiz_id = urlParams.get("data") || "0";
  const titles = urlParams.get("title") || "Quiz";

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion>({
    quiz_id,
    question: "",
    options: [""],
    correct_answer: "",
  });

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion({ ...currentQuestion, question: e.target.value });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleAddOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, ""],
    });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = currentQuestion.options.filter((_, i) => i !== index);
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleCorrectAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentQuestion({ ...currentQuestion, correct_answer: e.target.value });
  };

  const handleAddQuestion = () => {
    if (currentQuestion.question && currentQuestion.correct_answer) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        { ...currentQuestion },
      ]);
      setCurrentQuestion({
        quiz_id,
        question: "",
        options: [""],
        correct_answer: "",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null;

      if (!parsedUser) {
        alert("User not logged in!");
        return;
      }

      const response = await fetch(
        `http://localhost:4000/questions/add/${parsedUser.user.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questions }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Error Body:", errorBody);
        throw new Error(`Failed to submit questions: ${response.statusText}`);
      }

      alert("Questions submitted successfully!");
      setQuestions([]);
      navigate("/quiz");
    } catch (error) {
      console.error("Error submitting questions:", error);
      alert("An error occurred while submitting questions.");
    }
  };

  return (
    <div className="dashDiv overflow-auto h-full max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-blue-500">
        Create Quiz Questions For :{" "}
        <span className="text-gray-700">{titles}</span>
      </h1>

      <div className="border border-gray-300 bg-white p-6 rounded-lg mb-6">
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Question:
          </label>
          <input
            type="text"
            id="question"
            value={currentQuestion.question}
            onChange={handleQuestionChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options:
          </label>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleRemoveOption(index)}
                className="ml-3 text-red-500 hover:text-red-700"
              >
                <AiOutlineDelete className="text-[20px] font-bold" />
              </button>
            </div>
          ))}
          <button
            onClick={handleAddOption}
            className="border-dashed ml-[30px] border-[2px] hover:bg-gray-100 rounded w-[200px] text-gray-700 text-[14px] p-[10px] border-gray-300"
          >
            + Add Option
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="correct"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Correct Answer:
          </label>
          <input
            type="text"
            id="correct"
            value={currentQuestion.correct_answer}
            onChange={handleCorrectAnswerChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleAddQuestion}
          className="border-dashed ml-[30px] border-[2px] hover:bg-gray-100 rounded w-[200px] text-gray-700 text-[14px] p-[10px] border-gray-300"
        >
          Add Question
        </button>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Added Questions:
          </h2>
          {questions.length > 0 ? (
            <ul className="space-y-4">
              {questions.map((question, index) => (
                <li
                  key={index}
                  className="p-4 border border-gray-300 bg-gray-100 rounded-lg"
                >
                  <div className="mb-2">
                    <strong>Question:</strong> {question.question}
                  </div>
                  <div className="mb-2">
                    <strong>Options:</strong> {question.options.join(", ")}
                  </div>
                  <div>
                    <strong>Correct Answer:</strong> {question.correct_answer}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No questions added yet.</p>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
