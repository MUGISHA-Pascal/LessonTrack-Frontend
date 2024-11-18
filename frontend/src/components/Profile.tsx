import React from "react";
import profileImage from "../assets/profile.png";

const Profile = () => {
  const user = {
    username: "pascal",
    email: "mugisha@gmail.com",
    phone_number: "0786493844",
    image: profileImage,
  };
  return (
    <div className="flex flex-col">
      <header className="flex flex-row border-b-[1px] border-gray-300 justify-between h-[60px] items-center px-[30px]">
        <h2 className="text-gray-700">Edit Profile</h2>
      </header>
      <main className="flex mt-[20px] items-center space-y-[30px] flex-col ">
        <img
          src={user.image}
          alt="profile image"
          className="w-[100px] h-[100px] rounded-full"
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
              className="w-[250px] text-[13px] text-gray-700 focus:outline-none border-[1px] border-gray-300 p-[5px] rounded-[10px]"
            />
          </div>
          <div className="flex flex-col items-start space-y-[10px]">
            <label htmlFor="fileInput" className="text-[13px]  text-gray-700">
              Upload an image:
            </label>
            <div className="relative">
              <input
                type="file"
                id="fileInput"
                name="file"
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
          className="bg-blue-500 text-white hover:cursor-pointer p-[5px] rounded-[15px] px-[17px] hover:opacity-50"
        >
          Save
        </button>
      </main>
    </div>
  );
};

export default Profile;
