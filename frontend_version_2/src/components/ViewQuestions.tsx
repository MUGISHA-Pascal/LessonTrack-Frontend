import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import notfound from "../assets/search.png";

const ViewQuestions = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const { quizId, quizTitle } = useParams<{
    quizId: string;
    quizTitle: string;
  }>();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`http://localhost:4000/questions/${quizId}`);
      const data: any = await response.json();
      setQuestions(data.questions);
    };
    fetchQuestions();
  }, [quizId]); // Added dependency to re-fetch questions when quizId changes

  const deleteQuestion = async (questionId: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/questions/delete/${questionId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setQuestions(
          questions.filter((question) => question.id !== questionId)
        ); // Update the questions state
      } else {
        console.error("Failed to delete question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div>
      <header className="border-b-[1px] mb-[30px] flex flex-row items-center justify-start px-[10px] h-[50px] border-gray-300">
        <h2 className="text-2xl font-bold mb-6 mt-[25px] text-blue-500">
          Questions for {quizTitle}
        </h2>
      </header>
      <main className="text-left px-[30px] text-gray-700">
        {questions.length === 0 && (
          <>
            <div className="w-full  flex mt-[50px] flex-col space-y-[20px] items-center justify-center">
              <img
                src={notfound}
                className="w-auto h-[270px]"
                alt="not found"
              />

              <h2 className="text-[25px] font-bold text-gray-700">
                No Questions
              </h2>
            </div>
          </>
        )}
        {questions.map((question, index) => (
          <div key={question.id}>
            <h2 className="text-[15px] font-bold my-[15px]">
              {index + 1} - {question.question} ?
            </h2>
            <div className="flex text-left flex-row px-[25px] items-center space-x-[50px]">
              <div>
                <h2 className="font-semibold text-[14px]">Options</h2>
                <ul className="list-decimal">
                  {question.options.map((option: any, idx: number) => (
                    <li className="text-[13px]" key={idx}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
              <h2 className="text-[13px]">
                <span className="font-semibold text-[14px] text-green-500">
                  Correct answer:{" "}
                </span>
                {question.correct_answer}
              </h2>
            </div>
            <button
              onClick={() => deleteQuestion(question.id)}
              className="mt-4 text-red-500 hover:text-red-700"
            >
              Delete Question
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ViewQuestions;
