import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone_number: "",
    image: "",
  });

  const [file, setFile] = useState<File | null>(null);

  // Load user from local storage
  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      const parsedUser = JSON.parse(localStorageUser);
      setUser({
        username: parsedUser.user.username,
        email: parsedUser.user.email,
        phone_number: parsedUser.user.phone_number,
        image: parsedUser.user.profilepicture,
      });
    }
  }, []); // Runs once when the component mounts

  // Handle user input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prevState) => ({ ...prevState, [id]: value }));
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("phone_number", user.phone_number);
    formData.append("email", user.email);
    if (file) formData.append("file", file);

    try {
      const localStorageUser = localStorage.getItem("user");
      if (!localStorageUser) return alert("User not found in local storage");

      const parsedUser = JSON.parse(localStorageUser);
      const response = await axios.put(
        `http://localhost:4000/user/update/${parsedUser.user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Updated user profile");

      // Fetch the updated user data
      const updatedUserResponse = await axios.get(
        `http://localhost:4000/user/get_user/${parsedUser.user.id}`
      );

      const updatedUser = updatedUserResponse.data.user;
      localStorage.setItem(
        "user",
        JSON.stringify({ user: { ...updatedUser } })
      );
      setUser({
        username: updatedUser.username,
        email: updatedUser.email,
        phone_number: updatedUser.phone_number,
        image: updatedUser.profilepicture,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="flex flex-col ">
      <header className="flex flex-row border-b-[1px] border-gray-300 justify-between h-[60px] items-center px-[30px]">
        <h2 className="text-2xl font-bold mb-6 mt-[25px] text-blue-500">
          Edit Profile
        </h2>
      </header>
      <main className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex rounded-[20px] w-[700px] py-[30px] shadow border-[1px] border-gray-300 mt-[20px] items-center space-y-[30px] flex-col"
        >
          <img
            src={`http://localhost:4000/user/image/${user.image}`}
            alt="profile"
            className="w-[100px] h-[100px] object-cover rounded-full"
          />
          <div className="grid gap-[20px] grid-cols-2">
            <div className="flex flex-col items-start space-y-[10px]">
              <label
                htmlFor="username"
                className="text-gray-700 ml-[6px] text-[13px]"
              >
                UserName
              </label>
              <input
                id="username"
                type="text"
                value={user.username}
                onChange={handleInputChange}
                className="w-[250px] text-[13px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
              />
            </div>
            <div className="flex flex-col items-start space-y-[10px]">
              <label
                htmlFor="phone_number"
                className="text-gray-700 ml-[6px] text-[13px]"
              >
                Phone Number
              </label>
              <input
                id="phone_number"
                type="text"
                value={user.phone_number}
                onChange={handleInputChange}
                className="w-[250px] text-[13px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
              />
            </div>
            <div className="flex flex-col items-start space-y-[10px]">
              <label
                htmlFor="email"
                className="text-gray-700 ml-[6px] text-[13px]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={handleInputChange}
                className="w-[250px] text-[13px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
              />
            </div>
            <div className="flex flex-col items-start space-y-[10px]">
              <label
                htmlFor="ProfilePicture"
                className="text-[13px]  text-gray-700"
              >
                Upload an image:
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="ProfilePicture"
                  name="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="bg-blue-500 p-[5px] rounded-[10px] text-white  text-[13px] w-[250px] hover:opacity-50 hover:bg-blue-600 focus:ring focus:ring-blue-300"
                >
                  Choose File
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-[13px] text-white hover:cursor-pointer p-[5px] rounded-[15px] px-[17px] hover:opacity-50"
          >
            Save
          </button>
        </form>
      </main>
    </div>
  );
};

export default Profile;
