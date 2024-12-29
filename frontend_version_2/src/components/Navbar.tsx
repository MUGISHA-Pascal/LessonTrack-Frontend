import { Link } from "react-router-dom";
import profileImage from "../assets/profile.png";
import { IoIosArrowDown } from "react-icons/io";
import { useContext } from "react";
import { AppContext } from "../API/AppContext";
import Cookies from "js-cookie";
const Navbar = () => {
  function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
  }

  const { jwt, setJwt } = useAppContext();
  const token = Cookies.get("jwt");
  if (token) {
    setJwt(token);
  }
  const localStorageUser = localStorage.getItem("user");
  let correctLocalStorageUser: any;
  if (localStorageUser) {
    correctLocalStorageUser = JSON.parse(localStorageUser);
  }
  return (
    <header className="flex flex-row w-full  bg-blue-500 text-white justify-between items-center p-[20px]">
      <h5 className="font-semibold max-md:ml-[46px]">Amategeko Admin Portal</h5>
      <div className="flex flex-row items-center justify-center space-x-[20px]">
        {!jwt && (
          <>
            <Link to="/auth/login" className="text-[15px] font-semibold">
              Login
            </Link>
            <Link to="/auth/signup" className="text-[15px] font-semibold">
              Signup
            </Link>
          </>
        )}
        {jwt && (
          <>
            <Link to="/" className="text-[15px] max-md:hidden font-semibold">
              Home
            </Link>
            <Link
              to="/profile"
              className="flex flex-row items-center space-x-[10px]"
            >
              <img
                src={`http://localhost:4000/user/image/${correctLocalStorageUser.user.profilepicture}`}
                className="w-[30px] object-cover h-[30px] rounded-full"
                alt="profile image"
              />
              {/* <p className="text-[13px]">john doe</p> */}
              {/* <IoIosArrowDown /> */}
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
