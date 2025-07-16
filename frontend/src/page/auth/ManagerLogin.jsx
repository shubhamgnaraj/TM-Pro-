import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ManagerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const managerData = {
    email: "shubham@ganraj.com",
    password: "shubham123",
  };
  const handleOnLoginPage = (e) => {
    e.preventDefault();

    if (email === managerData.email && password === managerData.password) {
      navigate("/manager/dashboard");
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid email or password. Please try again.");
      setEmail(managerData.email);
      setPassword(managerData.password);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-700 via-teal-500 to-green-400 flex items-center justify-center relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-400 opacity-30 rounded-full blur-2xl z-0"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-green-300 opacity-30 rounded-full blur-2xl z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-teal-300 opacity-20 rounded-full blur-2xl z-0 transform -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-md mx-auto bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-tr from-blue-500 to-green-400 rounded-full p-3 shadow-lg mb-2">
            {/* Briefcase Icon for Manager */}
           
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-1 drop-shadow-lg">
            
          </h1>
          <p className="text-white/80 text-sm font-medium">
            Welcome back! Please login to your manager dashboard.
          </p>
        </div>
        <form
          action="/manager/login"
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
              placeholder=""
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
          <span className="text-white/80 text-sm">Not a manager?</span>{" "}
          <Link
            to="/manager/add-user"
            className="text-blue-200 underline font-semibold hover:text-white transition"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ManagerLogin;
