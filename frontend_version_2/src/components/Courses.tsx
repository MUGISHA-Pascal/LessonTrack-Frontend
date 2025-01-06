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
import {
  MdDelete,
  MdOutlineVideoSettings,
  MdSystemSecurityUpdate,
} from "react-icons/md";
import notfound from "../assets/search.png";
import Cookies from "js-cookie";
import { TiVideo } from "react-icons/ti";
import VideoUploadModal from "./VideoUploadModal";
import { IoEye } from "react-icons/io5";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import UpdateCourseModal from "./UpdateCourseModal";
import VideoManageModal from "./VideoManageModal";

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
  const [modalShow4, setShowModal4] = useState(false);
  const [modalShow5, setModalShow5] = useState(false);
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
  }, [correctUser.user.id]);

  const handleDelete = async (courseId: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(
        `http://localhost:4000/courses/delete/${courseId}/${correctUser.user.id}`
      );
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
    } catch (err) {
      alert("Failed to delete the course. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <header className="border-b-[1px] mb-[30px] flex flex-row items-center justify-start px-[10px] h-[50px] border-gray-300">
        <h2 className="text-2xl font-bold mb-6 mt-[25px] text-blue-500">
          Courses
        </h2>
      </header>
      <button
        onClick={() => setModalShow(true)}
        className="border-dashed ml-[30px] border-[2px] hover:bg-gray-100 rounded w-[200px] text-gray-700 text-[14px] p-[10px] border-gray-300"
      >
        + Add Course
      </button>
      <main className="messageDiv flex flex-col border-t-[1px] mt-[30px] border-gray-300 h-[430px] overflow-y-auto">
        <h2 className="text-[20px] font-bold my-[15px] text-blue-500">
          CURRENT COURSES
        </h2>

        {modalShow && <AddLessonModal setModalShow={setModalShow} />}

        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="border-gray-300 hover:shadow-sm border-t-[1px] flex hover:cursor-pointer flex-row p-[20px] space-x-[40px]"
            >
              <img
                src={`http://localhost:4000/courses/image/${course.profile_image}`}
                alt="course"
                className="h-[130px] rounded-md w-[160px] object-cover"
              />
              <div className="flex items-start space-y-[20px] text-left flex-col w-[170px]">
                <h2 className="text-gray-700 text-[17px] leading-6 font-semibold">
                  {course.title}
                </h2>
                <div className="flex flex-col space-y-[7px]">
                  <p className="text-[11px] text-gray-500">
                    Category: {course.category}
                  </p>
                  {course.content_type && (
                    <p className="text-[11px] text-gray-500">
                      Content Type: {course.content_type}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col flex-1 h-[100px] space-y-[10px] items-start">
                <div className="messageDiv flex-col text-left space-y-[11px] flex-1 border-l-[4px] w-[547px] border-blue-500 shadow rounded-[10px] h-[50px] overflow-auto p-[10px] ">
                  <h2 className="text-gray-700 text-[13px]">Description : </h2>
                  <p className="text-[11px] text-gray-500">
                    {course.description}
                  </p>
                  {modalShow3 && (
                    <VideoUploadModal
                      setModalShow3={setModalShow3}
                      courseId={course.id ? course.id : ""}
                    />
                  )}
                  {modalShow5 && (
                    <VideoManageModal
                      setModalShow5={setModalShow5}
                      courseId={course.id ? course.id : ""}
                    />
                  )}
                  {modalShow4 && (
                    <UpdateCourseModal
                      setShowModal4={setShowModal4}
                      courseId={course.id ? course.id : ""}
                    />
                  )}
                </div>
                <Menu
                  menuButton={
                    <MenuButton className="border border-gray-300 text-gray-700 text-[14px] font-bold rounded-md px-3 py-1 hover:bg-gray-100">
                      Actions
                    </MenuButton>
                  }
                >
                  <MenuItem>
                    <Link
                      to={`/add_module?module=${course.id}&&title=${course.title}`}
                      className="flex items-center space-x-2"
                    >
                      <IoIosAddCircle className="text-blue-500" />
                      <span>Add Modules</span>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to={`/view_module/${course.id}/${course.title}`}
                      className="flex items-center space-x-2"
                    >
                      <IoEye className="text-blue-500" />
                      <span>View Modules</span>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDelete(course.id ? course.id : "")}
                    className="flex items-center space-x-2"
                  >
                    <MdDelete className="text-red-500" />
                    <span>Delete Course</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setModalShow3(true)}
                    className="flex items-center space-x-2"
                  >
                    <TiVideo className="text-green-500" />
                    <span>Upload Video</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setShowModal4(true)}
                    className="flex items-center space-x-2"
                  >
                    <MdSystemSecurityUpdate className="text-blue-500" />
                    <span>Update Course</span>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setModalShow5(true)}
                    className="flex items-center space-x-2"
                  >
                    <MdOutlineVideoSettings className="text-blue-500" />
                    <span>Manage Video</span>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full flex mt-[50px] flex-row items-center justify-center">
            <img src={notfound} className="w-auto h-[270px]" alt="not found" />
          </div>
        )}
      </main>
    </div>
  );
};

export default Courses;
