import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface childProps {
  setModalShow: (state: boolean) => void;
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
const AddLessonModal: React.FC<childProps> = ({ setModalShow }) => {
  const navigate = useNavigate();
  const userRetrieve = localStorage.getItem("user");
  let user: userInterface = {
    user: { id: 0, username: "", email: "", token: "", role: "" },
  };
  if (userRetrieve) {
    user = JSON.parse(userRetrieve);
  }
  const [newFile, setFile] = useState<File | null>(null);
  const [userId, setUserID] = useState(0);

  useEffect(() => {
    if (user && user.user.id) {
      setUserID(user.user.id);
    }
  }, [user]);

  interface FormDataType {
    courseTitle: string;
    category: string;
    courseDescription: string;
  }
  const [formData, setFormData] = useState<FormDataType>({
    courseTitle: "",
    category: "",
    courseDescription: "",
  });

  const [error, setError] = useState("");

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
    form.append("userId", userId.toString());
    if (newFile) {
      form.append("file", newFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/courses/add_file",
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
      setModalShow(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 bg-gray-400 bg-opacity-50 flex flex-row pt-[40px] justify-center">
      <main className="dashDiv overflow-auto pt-[20px] w-[820px] flex flex-col space-y-[20px] relative h-[490px] bg-white opacity-100 rounded-[10px]">
        <IoClose
          className="absolute right-[10px] top-[10px] text-[25px] hover:cursor-pointer hover:opacity-60"
          onClick={() => setModalShow(false)}
        />
        <h2 className="text-gray-700 text-[19px] font-semibold">
          Add New Course
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
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 text-gray-700 block w-[350px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              className="w-[350px] text-[13px] h-[100px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
            ></textarea>
          </div>
          <div className="flex flex-col space-y-[10px] items-start">
            <label htmlFor="file" className="text-gray-700">
              Upload File
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

export default AddLessonModal;
