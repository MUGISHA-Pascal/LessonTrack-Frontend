import React from "react";
import { useParams } from "react-router-dom";

const QuizQuestions: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id) - 1;
  return (
    <div className="flex flex-col space-y-[20px] w-full">
      <header className="w-full h-[40px] border-b-[1px] border-gray-300 flex flex-row items-center pl-[10px]">
        <h2 className="text-gray-700 text-[14px] font-semibold">quiz</h2>
      </header>
      <main className="messageDiv overflow-y-auto h-[390px] pl-[10px] flex flex-col space-y-[20px]">
        {(() => {
          const itemComponents: JSX.Element[] = [];
          for (let i = 1; i < 10; i++) {
            itemComponents.push(
              <div key={i} className="flex flex-col space-y-[15px] items-start">
                <p className="text-gray-700 text-[13px]">
                  {i}. What is the capital city of France?
                </p>

                <div className="flex flex-col text-[13px] text-gray-700 items-start space-y-[10px]">
                  {" "}
                  <p>A. Madrid</p>
                  <p>B. Paris</p>
                  <p>C. Berlin</p>
                  <p>D. Rome</p>
                  <select
                    title="choice"
                    className="w-[100px] p-[5px] focus:outline-none bg-gray-200 text-gray-700 text-[13px] rounded"
                  >
                    <option value="">Choose</option>
                    <option value="A">A</option>
                    <option value="A">B</option>
                    <option value="A">C</option>
                    <option value="A">D</option>
                  </select>
                </div>
              </div>
            );
          }
          return itemComponents;
        })()}
        <button className="text-[13px] rounded hover:opacity-50 p-[7px] w-[120px] text-white bg-blue-500">
          Submit Answers
        </button>
      </main>
    </div>
  );
};

export default QuizQuestions;
