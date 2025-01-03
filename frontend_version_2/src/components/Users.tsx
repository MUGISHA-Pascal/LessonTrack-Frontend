import React, { useEffect, useState } from "react";
import tubeSinner from "../assets/tube-spinner.svg";

const Users = () => {
  const [courses, setCourses] = useState<
    { id: string; title: string }[] | null
  >(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [users, setUsers] = useState<{ id: string; name: string }[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Retrieve the user from localStorage
  const localStorageUser = localStorage.getItem("user");
  const parsedUser = localStorageUser ? JSON.parse(localStorageUser) : null;

  useEffect(() => {
    const fetchCourses = async () => {
      if (!parsedUser || !parsedUser.user?.id) {
        setError("User not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:4000/courses/userCourses/${parsedUser.user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses.");
        }
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [parsedUser]);

  // Fetch users when a course is selected
  useEffect(() => {
    const fetchUsers = async (courseId: string) => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:4000/courses/get_users/${courseId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users for the selected course.");
        }
        const data = await response.json();
        setUsers(data.users || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCourseId) {
      fetchUsers(selectedCourseId);
    }
  }, [selectedCourseId]);

  const handleCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourseId(event.target.value);
    setUsers(null); // Reset users list when a new course is selected
  };

  return (
    <div className="dashDiv max-md:w-screen flex flex-col h-full overflow-auto">
      <header className="border-b-[1px] mb-[30px] flex items-center justify-between px-[10px] h-[50px] border-gray-300">
        <h2 className="text-2xl font-bold text-blue-500">Users</h2>
      </header>

      {loading && (
        <div className="h-full w-full grid place-items-center">
          <img
            src={tubeSinner}
            alt="Description of the icon"
            width="50"
            height="50"
          />
        </div>
      )}
      {error && <p className="ml-[30px] text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <select
            name="courses"
            id="courses"
            onChange={handleCourseChange}
            className="border-dashed ml-[30px] border-[2px] hover:bg-gray-100 rounded w-[200px] text-gray-700 text-[14px] p-[10px] border-gray-300"
          >
            <option value="">Select a course</option>
            {courses &&
              courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
          </select>

          {selectedCourseId && (
            <div className="ml-[30px] mt-[20px]">
              <h3 className="text-xl font-semibold text-gray-700">
                Users for Selected Course:
              </h3>
              {users && users.length > 0 ? (
                <ul className="list-disc ml-[20px]">
                  {users.map((user) => (
                    <li key={user.id} className="text-gray-600">
                      {user.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No users found for this course.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;
