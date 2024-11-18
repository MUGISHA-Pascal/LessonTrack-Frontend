import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";
interface childProps {
  users: { id: number; name: string; image: string; message: string }[];
}
const Inbox: React.FC<childProps> = ({ users }) => {
  return (
    <main className="flex flex-col">
      <header className="flex items-center h-[60px] pl-[20px] border-b-[1px] border-gray-300">
        <h2 className="text-gray-700 ">Inbox</h2>
      </header>
      <main className="flex-row flex w-full">
        <div className="flex flex-col w-[440px] border-r-[1px] border-gray-300">
          <div className="p-[10px] border-b-[1px] border-gray-300 w-full ">
            <div className="flex flex-row items-center h-[40px] bg-gray-100 px-[10px] space-x-[5px] w-[400px] rounded-[10px]">
              <IoSearch className="text-gray-500" />
              <input
                type="text"
                className="w-[200px] h-[40px] focus:outline-none bg-gray-100 text-gray-500 text-[13px] placeholder:text-[13px] placeholder:text-gray-500 "
                placeholder="search by person"
              />
            </div>
          </div>
          <div className="border-[1px] w-[420px] border-gray-300 mt-[30px] p-[5px] rounded-[10px]">
            <div className="messageDiv  h-[340px] grid grid-cols-1 gap-[10px] px-[5px] py-[10px] overflow-y-auto">
              {users.map((user) => (
                <Link
                  to={`/inbox/conversation/${user.id}`}
                  className="shadow-sm w-[390px] border-gray-300 border-[1px] h-[70px] rounded-[10px] flex flex-row space-x-[20px] items-center justify-start pl-[10px]"
                >
                  <div className="h-[50px] flex flex-col justify-start space-y-[10px]">
                    <div className="flex flex-row items-start space-x-[10px]">
                      <img
                        src={user.image}
                        alt="profile image"
                        className="h-[25px] w-[25px] rounded-full"
                      />
                      <h2 className="text-gray-700 font-semibold text-[13px] pt-[2px]">
                        {user.name}
                      </h2>
                    </div>
                    <p className="text-gray-500 text-[10px]">02/03/2023</p>
                  </div>
                  <div className="messageDiv flex items-start h-[40px]  overflow-auto">
                    <p className="text-[10px] text-gray-500">{user.message}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </main>
  );
};

export default Inbox;
