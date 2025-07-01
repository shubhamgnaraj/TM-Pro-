import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const { isAuthentication } = useSelector((state) => state.tasks);
  // console.log(isAuthentication)

  return (
    <header className="w-full py-1 px-5">
      <div className="w-full flex justify-between items-center">
        <div>
          <Link to="/">
            <img src="/images/taskLogo.png" className="w-20 " alt="Task-Logo" />
          </Link>
        </div>

        <div className="flex gap-x-3 items-center">
          <Link
            to="/task/home"
            className=" py-1 px-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
          >
            Home
          </Link>
          <Link
            to="/task/profile"
            className=" py-1 px-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
          >
            Profile
          </Link>
          <Link
            to="/task/add-task"
            className=" py-1 px-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
          >
            Add-Task
          </Link>
          <Link
            to="/task/setting"
            className=" py-1 px-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
          >
            Setting
          </Link>
        </div>


        <div className="flex gap-x-3 items-center">
          <Link
            to="/auth/login"
           className=" py-1 px-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
          >
            Log-In
          </Link>
          <Link
            to="/auth/sign-up"
            className=" py-1 px-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
          >
            Sign-Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
