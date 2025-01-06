import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface childProps {
  setModalShow5: (state: boolean) => void;
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
const VideoManageModal: React.FC<childProps> = ({
  setModalShow5,
  courseId,
}) => {
  const navigate = useNavigate();
  const userRetrieve = localStorage.getItem("user");
  const [newFile, setFile] = useState<File | null>(null);
  const [videoShow, setVideoShow] = useState(false);
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
      setModalShow5(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };
  const handleVideoDelete = async () => {
    const response = await axios.delete(
      `http://localhost:4000/courses/delete_video/${courseId}`
    );
    console.log(response.data);
    if (response.data) {
      alert("Video deleted successfully");
    }
  };
  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(
        `http://localhost:4000/courses/CourseById/${courseId}`
      );
      const data: any = await response.json();
      console.log(data);
      if (data.course.video !== null && data.course.video !== "") {
        setVideoShow(true);
      }
    };
    fetchCourse();
  }, []);
  return (
    <div className="absolute m-0 left-0 right-0 top-0 bottom-0 bg-gray-400 bg-opacity-50 flex flex-row pt-[60px] justify-center">
      <main className="dashDiv  overflow-auto px-[20px] pt-[20px] w-[920px] flex flex-col space-y-[20px] items-center relative h-[460px] bg-white opacity-100 rounded-[10px]">
        <IoClose
          className="absolute right-[10px] top-[10px] text-[25px] hover:cursor-pointer hover:opacity-60"
          onClick={() => setModalShow5(false)}
        />
        <h2 className="text-gray-700 text-[19px] font-semibold">
          Manage Course Video
        </h2>
        <h2 className="text-gray-700 text-[19px] font-semibold">
          Current Video
        </h2>
        {videoShow && (
          <video controls className="rounded-[10px] w-[700px]">
            <source
              src={`http://localhost:4000/courses/course_video/${courseId}`}
            />
            course video
          </video>
        )}
        <button
          onClick={handleVideoDelete}
          className="bg-red-500 text-white p-[7px] rounded-[10px]"
        >
          Delete Video
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <form
          className="grid grid-cols-1 p-[5px] place-items-center gap-[20px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="file" className="text-gray-700">
              Upload New Video
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

export default VideoManageModal;
