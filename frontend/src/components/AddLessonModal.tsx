import React from "react";
import { IoClose } from "react-icons/io5";

interface childProps {
  setModalShow: (state: boolean) => void;
}
const AddLessonModal: React.FC<childProps> = ({ setModalShow }) => {
  return (
    <div className="absolute  left-0 right-0 top-0 bottom-0 bg-gray-400 bg-opacity-50 flex flex-row pt-[70px] justify-center">
      <main className="pt-[40px] w-[500px]  flex flex-col space-y-[20px] relative h-[450px] bg-white opacity-100 rounded-[10px]">
        <IoClose
          className="absolute right-[10px] top-[10px] text-[25px] hover:cursor-pointer hover:opacity-60"
          onClick={() => {
            setModalShow(false);
          }}
        />
        <h2 className="text-gray-700 text-[19px] font-semibold">
          Add New Lesson
        </h2>
        <form className="grid grid-cols-1 p-[5px] place-items-center gap-[20px]">
          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="title" className="text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-[350px] text-[13px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
            />
          </div>
          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="content" className="text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              className="w-[350px] text-[13px] h-[150px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
            ></textarea>
          </div>
          <button className="text-[13px] rounded hover:opacity-50 p-[7px] w-[120px] text-white bg-blue-500">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddLessonModal;
