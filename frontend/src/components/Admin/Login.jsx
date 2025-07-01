import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/authService";
import Navbar from "../Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnLoginPage = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    console.log(userData)
    dispatch(loginUser(userData))
      .unwrap()
      .then(() => {
        navigate("/task/add-task");

        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log("User not found please regiseter first");
      });
  };
  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-green-500">
      <Navbar />

      <div className="w-full min-h-screen flex items-center  flex-col mt-10">
        <div className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg text-white w-1/2 py-4 px-5">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Login
          </h1>
          <form
            action="/auth/login"
            method="post"
            onSubmit={(e) => handleOnLoginPage(e)}
          >
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-bold text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white border-none shadow-sm focus:ring-2 sm:text-sm py-2 px-4 font-bold placeholder:text-white placeholder:opacity-75"
                placeholder="Enter your Email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white border-none shadow-sm focus:ring-2 sm:text-sm py-2 px-4 font-bold placeholder:text-white placeholder:opacity-75"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
        <p className="text-white mt-4 ">
          I have not created an account yet?{" "}
          <Link
            to="/auth/sign-up"
            className="text-blue-600 underline font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
