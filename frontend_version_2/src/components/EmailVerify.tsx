import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmailVerify = () => {
  const [message, setMessage] = useState("");
  const { token } = useParams<{ token: string }>();
  useEffect(() => {
    const verifyEmail = async () => {
      const response = await fetch(
        `http://localhost:4000/auth/verify_email/${token}`
      );
      const data = await response.json();

      setMessage(data.message);
    };
    verifyEmail();
    console.log(message);
  }, [token]);
  return (
    <div className="">
      <h2 className="text-gray-700 text-[20px] font-bold mb-[30px] mt-[30px]">
        {message}
      </h2>
      {(message === "Email successfully verified." ||
        "Email already verified.") && (
        <>
          <Link to="/auth/login" className=" text-blue-500 font-bold">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default EmailVerify;
