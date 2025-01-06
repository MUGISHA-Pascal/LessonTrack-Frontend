import React, { useEffect, useState } from "react";
import tubeSpinner from "../assets/tube-spinner.svg";
import notfound from "../assets/search.png";

const Users = () => {
  const [courses, setCourses] = useState<
    { id: string; title: string }[] | null
  >(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Retrieve the user from localStorage
  const localStorageUser = localStorage.getItem("user");
  const parsedUser = localStorageUser ? JSON.parse(localStorageUser) : null;

  useEffect(() => {
    const fetchCourses = async () => {
      if (!parsedUser || !parsedUser.user || !parsedUser.user.id) {
        setError("User not found or invalid format in localStorage.");
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
  }, []);

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
        console.log(data);
        setUsers(data.users || []);
      } catch (error: any) {
        setError(error.message);
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
  };

  return (
    <div className="dashDiv max-md:w-screen flex flex-col h-full overflow-auto">
      <header className="border-b-[1px] mb-[30px] flex items-center justify-between px-[10px] h-[50px] border-gray-300">
        <h2 className="text-2xl font-bold text-blue-500">Users</h2>
      </header>

      {loading && (
        <div className="h-full w-full grid place-items-center">
          <img src={tubeSpinner} alt="Loading spinner" width="50" height="50" />
        </div>
      )}
      {error && <p className="ml-[30px] text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {courses && courses.length > 0 && (
            <>
              <label htmlFor="courses" className="font-bold text-gray-700">
                Choose a course:
              </label>

              <select
                name="courses"
                id="courses"
                onChange={handleCourseChange}
                className="border-dashed ml-[30px] border-[2px] hover:bg-gray-100 rounded w-[200px] text-gray-700 text-[14px] p-[10px] border-gray-300"
              >
                <option value="">Select</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </>
          )}
          {(courses?.length === 0 || selectedCourseId === "") && (
            <>
              <div className="w-full  flex mt-[50px] flex-col space-y-[20px] items-center justify-center">
                <img
                  src={notfound}
                  className="w-auto h-[270px]"
                  alt="not found"
                />

                <h2 className="text-[25px] font-bold text-gray-700">
                  No Courses with users
                </h2>
              </div>
            </>
          )}
          {selectedCourseId && (
            <div className="ml-[30px] mt-[20px]">
              <h3 className="text-xl font-semibold text-gray-700">
                Users for Selected Course:
              </h3>
              {users && users.length > 0 ? (
                <ul className="ml-[20px] text-left">
                  {users.map((user) => (
                    <li
                      key={user.id}
                      className="text-gray-700 py-[10px] flex flex-row pr-[20px] justify-between my-[20px] border-b-[1px] border-gray-300"
                    >
                      <span className="font-semibold">{user.username}</span>
                      <div className="flex flex-row space-x-[10px]">
                        {user.paid === true ? (
                          <span className="text-white bg-green-500 font-bold text-[14px] rounded-[10px] p-[7px]">
                            paid
                          </span>
                        ) : (
                          <span className="text-white bg-red-500 font-bold text-[14px] rounded-[10px] p-[7px]">
                            not paid
                          </span>
                        )}
                      </div>
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
