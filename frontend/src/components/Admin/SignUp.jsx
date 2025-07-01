import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserFromServer } from "../../service/authService";
import Navbar from "../Navbar";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOnUserInfoSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      confirmPassword,
    };

    dispatch(registerUserFromServer(userInfo))
    .unwrap()
    .then(() => {
      navigate('/auth/login')
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    })
    .catch((error) => {
      console.log('registration failed: ', error)
    })


  };
  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-green-500"> 
    <Navbar />
    <div className=" w-full min-h-screen flex items-center  flex-col">
      <form
        className="bg-white/30 backdrop-blur-md rounded-lg shadow-lg text-white w-1/2 py-4 px-6"
        action="/auth/sign-up"
        method="post"
        onSubmit={(e) => handleOnUserInfoSubmit(e)}
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Sign Up
        </h1>
        <div className="mb-4">
          <label
            className="block text-sm font-bold text-white"
            htmlFor="firstName"
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
            className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border-none shadow-sm focus:ring-2 sm:text-sm py-2 px-4 font-bold placeholder:text-white placeholder:opacity-75"
            placeholder="Enter your first name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold text-white"
            htmlFor="lastName"
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
            className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border-none shadow-sm focus:ring-2 sm:text-sm py-2 px-4 font-bold placeholder:text-white placeholder:opacity-75"
            placeholder="Enter your last name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-white" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border-none shadow-sm focus:ring-2 sm:text-sm py-2 px-4 font-bold placeholder:text-white placeholder:opacity-75"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-bold text-white"
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
            className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border-none shadow-sm focus:ring-2 sm:text-sm py-2 px-4 font-bold placeholder:text-white placeholder:opacity-75"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-bold text-white"
            htmlFor="confirmPassword"
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
            className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border-none shadow-sm focus:ring-2 sm:text-sm py-2 px-4 font-bold placeholder:text-white placeholder:opacity-75"
            placeholder="Confirm your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>
      <p className="text-white mt-4 ">
        I Already Created an account?{" "}
        <Link to="/auth/login" className="text-blue-600 underline font-semibold">
          LogIn here
        </Link>
      </p>
    </div>
    </div>
  );
}

export default SignUp;
