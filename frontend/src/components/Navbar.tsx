import profileImage from "../assets/profile.png";
import { IoIosArrowDown } from "react-icons/io";
const Navbar = () => {
  return (
    <header className="flex flex-row w-full  bg-blue-500 text-white justify-between items-center p-[20px]">
      <h5 className="font-semibold">Lesson Tracking</h5>
      <div className="flex flex-row items-center space-x-[10px]">
        <img
          src={profileImage}
          className="w-[30px] h-[30px] rounded-full"
          alt="profile image"
        />
        <p className="text-[13px]">john doe</p>
        <IoIosArrowDown />
      </div>
    </header>
  );
};

export default Navbar;
