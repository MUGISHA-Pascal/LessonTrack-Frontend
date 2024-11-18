import React from "react";
import { useParams } from "react-router-dom";
import { IoMdSend } from "react-icons/io";

interface childProps {
  users: { id: number; name: string; image: string; message: string }[];
}
const Conversation: React.FC<childProps> = ({ users }) => {
  const { id } = useParams<{ id: string }>();
  const numberId = Number(id) - 1;
  return (
    <div className="flex flex-col relative h-full">
      <head className="flex absolute top-0 right-0 left-0 flex-row pl-[20px] h-[50px] shadow-sm items-center">
        <div className="flex flex-row  items-center space-x-[10px]">
          <img
            src={users[numberId].image}
            alt="profile image"
            className="w-[30px] h-[30px] rounded-full"
          />
          <h2 className="text-gray-700 text-[13px] font-semibold">
            {users[numberId].name}
          </h2>
        </div>
      </head>
      <main className="messageDiv flex-1 mt-[50px] p-[10px] overflow-y-auto">
        <div className="float-left flex flex-col items-start space-y-[10px] space-x-[10px]">
          <div className=" flex items-start flex-col bg-blue-500 p-[10px] rounded-tr-[10px] rounded-bl-[10px] text-white">
            <p className="text-[12px]">{users[numberId].message}</p>
          </div>
          <p className="text-[7px] text-gray-500">/02/03/2023</p>
        </div>
      </main>
      <div className="absolute items-start bottom-[0px] flex space-x-[20px] justify-center flex-row right-0 left-0">
        <textarea
          placeholder="send message"
          className="focus:outline-none h-[40px] w-[500px] border-[1px] placeholder:text-[13px] text-gray-700 text-[14px] p-[7px] rounded-md border-gray-300"
        ></textarea>
        <IoMdSend
          className="text-blue-500 hover:opacity-50 text-[20px] hover:cursor-pointer"
          type="submit"
        />
      </div>
    </div>
  );
};

export default Conversation;
