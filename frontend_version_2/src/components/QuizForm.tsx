// QuizForm.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Course {
  id: number;
  name: string;
  title: string;
}

interface QuizFormProps {
  adminId: number;
}

const QuizForm: React.FC<QuizFormProps> = ({ adminId }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [course_id, setCourseId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [maxAttempts, setMaxAttempts] = useState<number>(3);
  const [type_of, setQuizType] = useState<"exam" | "quiz">("quiz");
  const [owners, setOweners] = useState<number>(89);

  useEffect(() => {
    // Fetch courses when the component is mounted
    axios
      .get("http://localhost:4000/courses")
      .then((response) => {
        setCourses(response.data.courses);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching courses", error));
  }, []);
  const user = localStorage.getItem("user");
  let correctUser: any;
  if (user) {
    correctUser = JSON.parse(user);
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/quiz/add/${correctUser.id}`,
        {
          owners,
          course_id,
          title,
          maxAttempts,
          type_of,
          description,
        }
      );
      if (response.status === 200) {
        navigate("/quiz");
      }
    } catch (error: any) {
      console.error("Error adding quiz:", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="dashDiv  max-w-lg mx-auto mt-[10px] border-[1px] border-gray-100  p-4  bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-blue-500 mb-6">
        Add Test
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Course selection */}
        <div className="mb-4">
          <label
            htmlFor="course"
            className="block text-sm font-medium text-gray-600"
          >
            Course
          </label>
          <select
            id="course"
            value={course_id}
            onChange={(e) => setCourseId(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-[14px]"
            required
          >
            <option value="" className="text-gray-700 text-[14px]">
              Select Course
            </option>
            {courses.map((course) => (
              <option
                key={course.id}
                value={course.id}
                className="text-gray-700 text-[14px]"
              >
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Title input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border text-gray-700 text-[14px] border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <input
            type="text"
            id="title"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 text-gray-700 text-[14px] py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Max Attempts input */}
        <div className="mb-4">
          <label
            htmlFor="maxAttempts"
            className="block text-sm font-medium text-gray-600"
          >
            Max Attempts
          </label>
          <input
            type="number"
            id="maxAttempts"
            value={maxAttempts}
            onChange={(e) => setMaxAttempts(Number(e.target.value))}
            className="mt-1 block text-gray-700 text-[14px] w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
            min={1}
          />
        </div>

        {/* Quiz Type selection */}
        <div className="mb-6">
          <label
            htmlFor="quizType"
            className="block text-sm font-medium text-gray-600"
          >
            Test Type
          </label>
          <select
            id="quizType"
            value={type_of}
            onChange={(e) => setQuizType(e.target.value as "exam" | "quiz")}
            className="mt-1 block text-gray-700 text-[14px] w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="quiz" className="text-gray-700 text-[14px]">
              Quiz
            </option>
            <option value="exam" className="text-gray-700 text-[14px]">
              Exam
            </option>
          </select>
        </div>

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
