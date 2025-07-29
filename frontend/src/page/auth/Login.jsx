import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/authService";
import InputField from "../../components/InputField";
import ButtonField from "../../components/ButtonField";
import BackgroundPage from "../../components/BackgroundPage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [manager, setManager] = useState(false);

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

        setError(data.message);

        if (data.employee.position === "employee") {
          navigate("/employee/dashboard");
        } else if (data.employee.position === "manager") {
          navigate("/manager/dashboard");
        }

        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log("User not found please regiseter first", err);
      });
  };
  return (
    <BackgroundPage>
      <div className="relative z-10 w-full max-w-md mx-auto bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-tr from-blue-500 to-green-400 rounded-full p-3 shadow-lg mb-2">
            {!manager ? (
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
            ) : (
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect
                  x="3"
                  y="7"
                  width="18"
                  height="13"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M16 7V5a4 4 0 0 0-8 0v2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            )}
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-1 drop-shadow-lg">
            {manager ? "Manager Login" : "Employee Login"}
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
          <InputField
            type="email"
            id="email"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              manager ? "manager@company.com" : "employee@company.com"
            }
          />
          <InputField
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          {/* <ButtonField /> */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-white py-3 px-4 rounded-lg font-bold text-lg shadow-md hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
          >
            {manager ? "Manager-Login" : "Login"}
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

        {manager ? (
          <div className="mt-6 text-center">
            <span className="text-white/80 text-sm">Log-In As A Employee</span>{" "}
            <div
              onClick={() => setManager(false)}
              className="text-blue-200 underline font-semibold hover:text-white transition"
            >
              Log-In
            </div>
          </div>
        ) : (
          <div className="mt-6 text-center">
            <span className="text-white/80 text-sm">Log-In As A Manager</span>{" "}
            <div
              onClick={() => setManager(true)}
              className="text-blue-200 underline font-semibold hover:text-white transition"
            >
              Log-In
            </div>
          </div>
        )}
      </div>
    </BackgroundPage>
  );
}

export default Login;
