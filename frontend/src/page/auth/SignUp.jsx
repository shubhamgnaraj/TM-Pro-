import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserFromServer } from "../../service/authService";
import Navbar from "../../components/Navbar";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [position, setPosition] = useState("");
  const [employeePhoto, setEmployeePhoto] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnemployeeInfoSubmit = (e) => {
    e.preventDefault();

    const employeeInfo = {
      firstname: firstName,
      lastname: lastName,
      photo: employeePhoto,
      email,
      password,
      confirmPassword,
      position,
    };

    console.log(employeeInfo)
    dispatch(registerUserFromServer(employeeInfo))
      .unwrap()
      .then((data) => {
        console.log("registration successful: ", data);
        navigate("/manager/dashboard");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPosition("")
      })
      .catch((error) => {
        console.log("registration failed: ", error);
      });
  };

  return (
    <div className="w-full h-screen">
      <Navbar />

      <div className="w-full min-h-screen bg-gradient-to-br from-[#c6ffe0] via-[#f6e6ff] to-[#d1e3ff] p-8">
        {/* Decorative Circles */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-400 opacity-30 rounded-full blur-2xl z-0"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-green-300 opacity-30 rounded-full blur-2xl z-0"></div>
        <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-teal-300 opacity-20 rounded-full blur-2xl z-0 transform -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 w-full max-w-md mx-auto bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl py-2 px-8">
          <div className="flex flex-col items-center ">
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
          </div>
          <form
            className="space-y-3"
            action="/manager/add-user"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleOnemployeeInfoSubmit}
          >
            <div>
              <label
                className="block text-sm font-semibold text-white"
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="placeholder:text-[13px] outline-none block w-full rounded-lg bg-white/60 text-gray-800 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-sm py-2 px-4 font-semibold placeholder:text-gray-500 placeholder:opacity-70 transition"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-white"
                htmlFor="lastname"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                className="placeholder:text-[13px] outline-none block w-full rounded-lg bg-white/60 text-gray-800 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-sm py-2 px-4 font-semibold placeholder:text-gray-500 placeholder:opacity-70 transition"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-white"
                htmlFor="lastname"
              >
                Add Photo
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                required
                onChange={(e) => setEmployeePhoto(e.target.files[0])}
                accept="image/*"
                className="placeholder:text-[13px] outline-none block w-full rounded-lg bg-white/60 text-gray-800 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-sm py-2 px-4 font-semibold placeholder:text-gray-500 placeholder:opacity-70 transition"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="placeholder:text-[13px] outline-none block w-full rounded-lg bg-white/60 text-gray-800 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-sm py-2 px-4 font-semibold placeholder:text-gray-500 placeholder:opacity-70 transition"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-white"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="placeholder:text-[13px] outline-none block w-full rounded-lg bg-white/60 text-gray-800 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-sm py-2 px-4 font-semibold placeholder:text-gray-500 placeholder:opacity-70 transition"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold text-white"
                htmlFor="confirmpassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="placeholder:text-[13px] outline-none block w-full rounded-lg bg-white/60 text-gray-800 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-sm py-2 px-4 font-semibold placeholder:text-gray-500 placeholder:opacity-70 transition"
                placeholder="Confirm your password"
              />
            </div>

          <div>
             <label
                className="block text-sm font-semibold text-white"
                htmlFor="confirmpassword"
              >
                Postion
              </label>
              <select
              name="position"
              id="position"
              required
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className=" outline-none placeholder:text-sm placeholder:opacity-75 rounded-lg bg-white/70 text-gray-500 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-8 font-semibold transition"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-white py-3 px-4 rounded-lg font-bold text-lg shadow-md hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
            >
              Sign Up
            </button>
          </form>
          <div className=" text-center">
            <span className="text-white/80 text-sm">
              Already have an account?
            </span>{" "}
            <Link
              to="/auth/login"
              className="text-blue-200 underline font-semibold hover:text-white transition"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
