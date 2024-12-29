import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";

interface childProps {
  setShowModal: (state: boolean) => void;
  quizId: number;
}

interface formDataInterface {
  quizId: number;
  title: string;
  description: string;
  max_attempts: number;
}

const AddQuizModal: React.FC<childProps> = ({ setShowModal, quizId }) => {
  const [formData, setFormData] = useState<formDataInterface>({
    quizId,
    title: "",
    description: "",
    max_attempts: 1,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let user = localStorage.getItem("user");
      let correctUser;
      if (user) {
        correctUser = JSON.parse(user);
      }
      const response = await fetch(
        `http://localhost:4000/quiz/update/${correctUser.user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quizId: formData.quizId,
            title: formData.title,
            description: formData.description,
            max_attempts: formData.max_attempts,
          }),
        }
      );
      if (response) {
        setShowModal(false);
      }
    } catch (err) {
      setError("Failed to submit the form.");
    }
  };

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 bg-gray-400 bg-opacity-50 flex flex-row pt-[40px] justify-center">
      <main className="pt-[20px] w-[820px] flex flex-col space-y-[20px] relative h-[500px] bg-white opacity-100 rounded-[10px]">
        <IoClose
          className="absolute right-[10px] top-[10px] text-[25px] hover:cursor-pointer hover:opacity-60"
          onClick={() => setShowModal(false)}
        />
        <h2 className="text-gray-700 text-[19px] font-semibold">Edit Quiz</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form
          className="grid grid-cols-1 p-[5px] place-items-center gap-[20px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="title" className="text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-[350px] text-[13px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
            />
          </div>

          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="description" className="text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-[350px] text-[13px] h-[100px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
            ></textarea>
          </div>

          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="max_attempts" className="text-gray-700">
              Max Attempts
            </label>
            <input
              type="number"
              id="max_attempts"
              value={formData.max_attempts}
              onChange={handleChange}
              className="w-[350px] text-[13px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
            />
          </div>

          <button
            type="submit"
            className="text-[13px] rounded hover:opacity-50 p-[7px] w-[120px] text-white bg-blue-500"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddQuizModal;
