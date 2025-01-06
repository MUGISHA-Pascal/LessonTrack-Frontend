import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface ChildProps {
  setShowModal4: (state: boolean) => void;
  courseId: string;
}

interface UserInterface {
  user: {
    id: number;
    username: string;
    email: string;
    token: string;
    role: string;
  };
}

const UpdateCourseModal: React.FC<ChildProps> = ({
  setShowModal4,
  courseId,
}) => {
  const [course, setCourse] = useState({
    courseId: 0,
    courseTitle: "",
    courseProfileImage: "",
    courseDescription: "",
    courseCategory: "",
  });

  const navigate = useNavigate();
  const userRetrieve = localStorage.getItem("user");
  let user: UserInterface = {
    user: { id: 0, username: "", email: "", token: "", role: "" },
  };
  if (userRetrieve) {
    user = JSON.parse(userRetrieve);
  }

  const [newFile, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    courseTitle: "",
    category: "",
    courseDescription: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/courses/CourseById/${courseId}`
        );
        const data = response.data.course;
        setCourse({
          courseId: data.id,
          courseTitle: data.title,
          courseProfileImage: data.profile_image,
          courseDescription: data.description,
          courseCategory: data.category,
        });
        setFormData({
          courseTitle: data.title,
          category: data.category,
          courseDescription: data.description,
        });
      } catch (err) {
        console.error("Error fetching course details:", err);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("courseTitle", formData.courseTitle);
    form.append("category", formData.category);
    form.append("courseDescription", formData.courseDescription);
    if (newFile) {
      form.append("file", newFile);
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/courses/update/${courseId}`,
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
      setShowModal4(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 bg-gray-400 bg-opacity-50 flex flex-row pt-[40px] justify-center">
      <main className="dashDiv overflow-auto pt-[20px] w-[820px] flex flex-col space-y-[20px] relative h-[490px] bg-white opacity-100 rounded-[10px]">
        <IoClose
          className="absolute right-[10px] top-[10px] text-[25px] hover:cursor-pointer hover:opacity-60"
          onClick={() => setShowModal4(false)}
        />
        <h2 className="text-gray-700 text-[19px] font-semibold">
          Update Course
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form
          className="grid grid-cols-1 p-[5px] place-items-center gap-[20px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="courseTitle" className="text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="courseTitle"
              value={formData.courseTitle}
              onChange={handleChange}
              className="w-[350px] text-[13px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
            />
          </div>
          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="category" className="text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-[350px] text-[13px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
            >
              <option value="">Select</option>
              <option value="Introduction_to_Driving">
                Introduction to Driving
              </option>
              <option value="Vehicle_Familiarization">
                Vehicle Familiarization
              </option>
              <option value="Basic_Driving_Skills">Basic Driving Skills</option>
              <option value="Traffic_Navigation">Traffic Navigation</option>
              <option value="Advanced_Driving_Skills">
                Advanced Driving Skills
              </option>
              <option value="Driving_in_Different_Conditions">
                Driving in Different Conditions
              </option>
              <option value="Emergency_Handling">Emergency Handling</option>
              <option value="Eco-Friendly_Driving">Eco-Friendly Driving</option>
              <option value="Traffic_Navigation">Traffic Navigation</option>
              <option value="Legal_and_Administrative">
                Legal and Administrative
              </option>
              <option value="Specialized_Driving_Training">
                Specialized Driving Training
              </option>
            </select>
          </div>
          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="courseDescription" className="text-gray-700">
              Description
            </label>
            <textarea
              id="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
              className="w-[350px] h-[100px] text-[13px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
            ></textarea>
          </div>
          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="file" className="text-gray-700">
              Upload Course Profile
            </label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="w-[350px] text-[13px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
            />
          </div>
          <Link
            to={`/update_module/${courseId}/${formData.courseTitle}`}
            className="text-[13px] grid place-items-center rounded hover:opacity-50 p-[7px] w-[200px] text-white bg-blue-500"
          >
            Update Modules
          </Link>
          <button
            type="submit"
            className="text-[13px] rounded hover:opacity-50 p-[7px] w-[120px] text-white bg-blue-500"
          >
            Update
          </button>
        </form>
      </main>
    </div>
  );
};

export default UpdateCourseModal;
