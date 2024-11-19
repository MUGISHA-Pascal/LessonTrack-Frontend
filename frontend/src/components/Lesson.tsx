import React, { useState } from "react";
import lessonImage from "../assets/lesson.png";
import { MdSystemUpdateAlt } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import AddLessonModal from "./AddLessonModal";

const Lesson = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <main className="flex flex-col w-full">
      <header className="flex items-center h-[60px] pl-[20px] border-b-[1px] border-gray-300">
        <h2 className="text-gray-700 ">Lesson</h2>
      </header>
      <header className=" h-[100px] flex flex-row items-center pl-[20px] w-full">
        <button
          onClick={() => {
            setModalShow(true);
          }}
          className="border-dashed border-[2px] hover:bg-gray-100 rounded text-gray-700 text-[14px] p-[10px] border-gray-300"
        >
          + add Lesson
        </button>
      </header>
      {modalShow && <AddLessonModal setModalShow={setModalShow} />}
      <main className="messageDiv h-[390px] border-[1px] border-gray-300 place-items-center m-[10px] rounded-[10px] shadow p-[10px] overflow-y-auto gap-[20px] grid grid-cols-4">
        {(() => {
          const itemComponents: JSX.Element[] = [];
          for (let i = 1; i < 10; i++) {
            itemComponents.push(
              <div
                key={i}
                className="w-[200px] hover:cursor-pointer border-gray-300 rounded border-[1px] h-auto pb-[10px] p-[5px] flex flex-col space-y-[15px] items-start shadow"
              >
                <img
                  src={lessonImage}
                  alt="lesson image"
                  className="w-[190px] shadow h-auto"
                />
                <h2 className="text-gray-700 font-semibold text-[14px]">
                  Figma Design Lesson
                </h2>
                <div className="w-[160px] flex flex-row justify-between ">
                  <p className="text-gray-500 text-[10px]">10/20/2024</p>

                  <div className="flex flex-row space-x-[10px]">
                    <MdSystemUpdateAlt
                      title="update"
                      className="text-[20px] text-blue-500"
                    />
                    <MdDeleteForever
                      title="delete"
                      className="text-[20px] text-blue-500"
                    />
                  </div>
                </div>
              </div>
            );
          }
          return itemComponents;
        })()}
      </main>
    </main>
  );
};

export default Lesson;
