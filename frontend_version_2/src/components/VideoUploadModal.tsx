import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface childProps {
  setModalShow3: (state: boolean) => void;
  courseId: string;
}
interface userInterface {
  user: {
    id: number;
    username: string;
    email: string;
    token: string;
    role: string;
  };
}
const VideoUploadModal: React.FC<childProps> = ({
  setModalShow3,
  courseId,
}) => {
  const navigate = useNavigate();
  const userRetrieve = localStorage.getItem("user");

  const [newFile, setFile] = useState<File | null>(null);

  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("courseId", courseId);
    if (newFile) {
      form.append("file", newFile);
    }

    try {
      const response = await axios.put(
        "http://localhost:4000/courses/upload-video",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      if (response.data) {
        navigate("/courses");
      }
      setModalShow3(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="absolute m-0 left-0 right-0 top-0 bottom-0 bg-gray-400 bg-opacity-50 flex flex-row pt-[60px] justify-center">
      <main className="dashDiv overflow-auto pt-[20px] w-[620px] flex flex-col space-y-[20px] relative h-[260px] bg-white opacity-100 rounded-[10px]">
        <IoClose
          className="absolute right-[10px] top-[10px] text-[25px] hover:cursor-pointer hover:opacity-60"
          onClick={() => setModalShow3(false)}
        />
        <h2 className="text-gray-700 text-[19px] font-semibold">
          Upload Course Video
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form
          className="grid grid-cols-1 p-[5px] place-items-center gap-[20px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="file" className="text-gray-700">
              Upload Video
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
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

export default VideoUploadModal;
