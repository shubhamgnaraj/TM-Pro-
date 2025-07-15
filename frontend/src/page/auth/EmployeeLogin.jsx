import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/authService";
import { jwtDecode } from "jwt-decode";
import { getLoggedInEmployee } from "../../service/service";

function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnLoginPage = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData))
      .unwrap()
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("position", data.employee.position);

        setError(data.message);
        navigate("/employee/dashboard");

        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log("User not found please regiseter first", err);
      });
  };
  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-700 via-teal-500 to-green-400 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-400 opacity-30 rounded-full blur-2xl z-0"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-green-300 opacity-30 rounded-full blur-2xl z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-teal-300 opacity-20 rounded-full blur-2xl z-0 transform -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-md mx-auto bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-tr from-blue-500 to-green-400 rounded-full p-3 shadow-lg mb-2">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-1 drop-shadow-lg">
            Employee Login
          </h1>
          <p className="text-white/80 text-sm font-medium">
            Welcome back! Please login to your employee dashboard.
          </p>
        </div>
        <form
          action="/employee/login"
          method="post"
          onSubmit={handleOnLoginPage}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              className="placeholder:text-[13px] outline-none block w-full rounded-lg bg-white/60 text-gray-800 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-sm py-2 px-4 font-semibold placeholder:text-gray-500 placeholder:opacity-70 transition"
              placeholder="employee@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="placeholder:text-[13px] outline-none block w-full rounded-lg bg-white/60 text-gray-800 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-sm py-2 px-4 font-semibold placeholder:text-gray-500 placeholder:opacity-70 transition"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-white py-3 px-4 rounded-lg font-bold text-lg shadow-md hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <span className="text-white/80 text-sm">Forgot password?</span>
          <Link
            to="/auth/forgot-password"
            className="text-blue-100 underline font-semibold hover:text-white transition"
          >
            Reset
          </Link>
        </div>
        <div className="mt-6 text-center">
          <span className="text-white/80 text-sm">I'm Not Employee</span>{" "}
          <Link
            to="/auth/sign-up"
            className="text-blue-200 underline font-semibold hover:text-white transition"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLogin;
