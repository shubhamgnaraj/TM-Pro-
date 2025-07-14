import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  return (
    <header className="w-full bg-gradient-to-br from-blue-700 via-teal-500 to-green-400 py-2 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/taskLogo.png"
            className="w-14 object-contain"
            alt="Task-Logo"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-2 md:gap-4 items-center">
          <Link
            to="/manager/dashboard"
            className="py-1.5 px-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
          >
            Home
          </Link>
          <Link
            to="/employee/profile"
            className="py-1.5 px-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
          >
            Profile
          </Link>
          <Link
            to="/manager/send-task-employee"
            className="py-1.5 px-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
          >
            Send Task
          </Link>
          <Link
            to="/task/setting"
            className="py-1.5 px-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
          >
            Setting
          </Link>
          <Link
            to="/manager/add-user"
            className="py-1.5 px-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
          >
            Add User
          </Link>
        </nav>

        {/* Auth Button */}
        <div>
          {token ? (
            <Link
              to="/employee/logout"
              className="py-1.5 px-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
            >
              Log Out
            </Link>
          ) : (
            <Link
              to="/employee/login"
              className="py-1.5 px-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-semibold text-sm shadow hover:scale-105 transition"
            >
              Log In
            </Link>
          )}
        </div>
      </div> 
    </header>
  );
}

export default Navbar;
