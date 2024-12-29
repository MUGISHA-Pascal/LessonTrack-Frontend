import React, { useEffect, useState } from "react";
import figmaImage from "../assets/Figma.jpeg";
import backgroundImage from "../assets/background.png";
import htmlImage from "../assets/htmlAndCss.jpeg";
import courseImage from "../assets/course.png";
import AddLessonModal from "./AddLessonModal";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import AddQuizModal from "./AddQuizModal";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import notfound from "../assets/search.png";
import Cookies from "js-cookie";
import { TiVideo } from "react-icons/ti";
import VideoUploadModal from "./VideoUploadModal";
interface courseResponseInterface {
  message: Text;
  courses: [
    {
      id?: string;
      title: string;
      description: string;
      content_type?: "text" | "video" | "image";
      category: string;
      created_by: number;
      file?: string;
      is_active?: boolean;
      profile_image?: string;
    }
  ];
}
interface courseInterface {
  id?: string;
  title: string;
  description: string;
  content_type?: "text" | "video" | "image";
  category: string;
  created_by: number;
  file?: string;
  is_active?: boolean;
  profile_image?: string;
}

const Courses = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [courses, setCourses] = useState<courseInterface[]>([]);
  const user = localStorage.getItem("user");
  let correctUser: any;
  if (user) {
    correctUser = JSON.parse(user);
  }

  useEffect(() => {
    const coursesRetrieving = async () => {
      const coursesRetrieved = await axios.get(
        `http://localhost:4000/courses/userCourses/${correctUser.user.id}`
      );
      const Courses: courseResponseInterface = coursesRetrieved.data;
      const CourseArray: courseInterface[] = Courses.courses;
      setCourses(CourseArray);
    };
    coursesRetrieving();
    console.log(courses);
  }, [courses, setModalShow]);
  const handleDelete = async (courseId: string) => {
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
        `http://localhost:4000/courses/delete/${courseId}/${correctUser.user.id}`
      );
      setCourses((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.id !== courseId)
      );
    } catch (err) {
      alert("Failed to delete the course. Please try again later.");
    }
  };
  // const handleVideoUpload = async (courseId: string) => {
  //   const response= await ;
  // };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <header className="border-b-[1px] mb-[30px] flex flex-row items-center justify-start px-[10px] h-[50px] border-gray-300">
        <h2 className="text-2xl font-bold mb-6 mt-[25px] text-blue-500">
          Courses
        </h2>
      </header>
      <button
        onClick={() => {
          setModalShow(true);
        }}
        className="border-dashed ml-[30px] border-[2px] hover:bg-gray-100 rounded w-[200px] text-gray-700 text-[14px] p-[10px] border-gray-300"
      >
        + add Course
      </button>
      <main className="messageDiv flex flex-col border-t-[1px] mt-[30px] border-gray-300 shadow-md  h-[430px] overflow-y-auto">
        <h2 className="text-[20px] font-bold my-[15px] text-blue-500">
          CURRENT COURSES
        </h2>

        {modalShow && <AddLessonModal setModalShow={setModalShow} />}
        {courses &&
          courses.map((course) => (
            <div
              key={course.id}
              className="border-gray-300 hover:shadow-sm  border-t-[1px] flex hover:cursor-pointer flex-row p-[20px] space-x-[40px]"
            >
              <img
                src={`http://localhost:4000/courses/image/${course.profile_image}`}
                alt="course image"
                className="h-[130px] rounded-md w-[160px] object-cover"
              />
              <div className="flex items-start space-y-[20px] text-left flex-col w-[300px]">
                <h2 className="text-gray-700 text-[17px] leading-6 text-left font-semibold">
                  {course.title}
                </h2>
                <div className="flex flex-col space-y-[7px]">
                  <p className="text-[11px] text-gray-500">
                    Category : {course.category}
                  </p>
                  {course.content_type && (
                    <p className="text-[11px] text-gray-500">
                      Content Type : {course.content_type}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col flex-1 h-[100px] space-y-[10px] items-start">
                <div className="messageDiv flex-col text-left space-y-[11px] flex-1 border-l-[4px] w-[430px] border-blue-500 shadow rounded-[10px] h-[50px] overflow-auto p-[10px] ">
                  <h2 className="text-gray-700 text-[13px]">Description : </h2>
                  <p className="text-[11px] text-gray-500">
                    {course.description}
                  </p>
                </div>
                <div className="flex flex-row space-x-[20px] items-center justify-center">
                  <Link
                    to={`/add_module?module=${course.id}&&title=${course.title}`}
                    className="flex flex-row items-center space-x-[7px] justify-center"
                    onClick={() => {
                      setModalShow2(true);
                    }}
                  >
                    <IoIosAddCircle className="text-blue-500 text-[20px]" />
                    <span className="text-[14px] font-semibold text-blue-500">
                      Add Modules
                    </span>
                  </Link>
                  <button
                    className="flex flex-row items-center space-x-[7px] justify-center"
                    onClick={() => handleDelete(course.id ? course.id : "")}
                  >
                    <MdDelete className="text-red-500 text-[20px]" />
                    <span className="text-[14px] font-semibold text-red-500">
                      Delete Modules
                    </span>
                  </button>
                  {modalShow3 && (
                    <VideoUploadModal
                      setModalShow3={setModalShow3}
                      courseId={course.id ? course.id : ""}
                    />
                  )}
                  <button
                    className="flex flex-row items-center space-x-[7px] justify-center"
                    // onClick={() =>
                    //   handleVideoUpload(course.id ? course.id : "")
                    // }
                    onClick={() => {
                      setModalShow3(true);
                    }}
                  >
                    <TiVideo className="text-green-500 text-[20px]" />
                    <span className="text-[14px] font-semibold text-green-500">
                      Upload Video
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        {courses.length === 0 && (
          <>
            <div className="w-full flex mt-[50px] flex-row items-center justify-center">
              <img
                src={notfound}
                className="w-auto h-[270px]"
                alt="not found"
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Courses;
