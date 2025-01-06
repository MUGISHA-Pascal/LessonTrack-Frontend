import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AppContext } from "../API/AppContext";

const Login = () => {
  function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
  }

  const { jwt, setJwt } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password_hash, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:4000/auth/web_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password_hash }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed.");
        return;
      }

      const data = await response.json();
      let verifyCheck: string;
      verifyCheck = data.user.verified;
      if (verifyCheck.toLowerCase() === "no") {
        alert("you are not verified , please verify");
      }
      let token;
      console.log(data);
      if (data.user.verified === "yes") {
        Cookies.set("jwt", data.user.token, {
          expires: 1,
        });
        token = Cookies.get("jwt");
      }
      if (token && data.user.verified === "yes") {
        const user = data.user;
        localStorage.setItem("user", JSON.stringify({ user }));
        setJwt(token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <div>
        <main className="flex items-center justify-center min-h-screen">
          <section className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
              Login
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <p id="emailError" className="text-blue-400 font-thin"></p>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password_hash}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p id="passwordError" className="text-blue-400 font-thin"></p>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:opacity-90"
              >
                Login
              </button>
            </form>

            <div className="text-center text-[14px] mt-4">
              <p className="text-gray-600">
                Don&apos;t have an account?
                <a
                  href="/auth/signup"
                  className="text-blue-500 ml-2 hover:underline"
                >
                  Signup
                </a>
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Login;
