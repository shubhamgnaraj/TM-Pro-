import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { BiMessageRounded } from "react-icons/bi";

function Navbar({ loggedEmployee }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const decode = jwtDecode(token);

  return (
    <header className="w-full sticky top-0 z-50 bg-white/50 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {decode.position === "manager" ? (
          <div className=" w-[70%] flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/images/taskLogo.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
            </Link>

            {/* Navigation */}
            <nav className="flex gap-5 items-center">
              {[
                { to: "/manager/dashboard", label: "Home" },
                { to: "/employee/profile", label: "Profile" },
                { to: "/manager/send-task-employee", label: "Send Task" },
                { to: "/task/setting", label: "Settings" },
                { to: "/manager/add-user", label: "Add User" },
              ].map((item, i) => (
                <Link
                  key={i}
                  to={item.to}
                  className={`relative px-3 py-1 text-gray-700 font-medium text-sm 
                  transition duration-300 group overflow-hidden
                  before:content-[''] before:absolute before:bottom-0 before:left-1/2 
                  before:w-0 before:h-[2px] before:bg-gradient-to-r before:from-purple-500 before:to-pink-500 
                  before:transition-all before:duration-500 before:ease-in-out 
                  after:content-[''] after:absolute after:bottom-0 after:right-1/2 
                  after:w-0 after:h-[2px] after:bg-gradient-to-l after:from-purple-500 after:to-pink-500 
                  after:transition-all after:duration-500 after:ease-in-out 
                  hover:before:left-0 hover:before:w-1/2 hover:after:right-0 hover:after:w-1/2 
                  hover:text-indigo-600`}
                >
                  <span className="relative z-10 group-hover:tracking-wide transition-all duration-300 delay-100">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto flex items-center justify-between transition-transform duration-300">
            {/* Left - Profile Info */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={`${BASE_URL}/uploads/${loggedEmployee.photo}`}
                  alt="Employee"
                  className="w-20 h-20 rounded-full object-center shadow-lg ring-4 ring-[#93c6bc] transition duration-300 hover:scale-105"
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white tracking-wide flex items-center gap-2">
                  <span className="text-gray-500 text-lg capitalize">
                    {loggedEmployee.firstname + " " + loggedEmployee.lastname}
                  </span>
                </h2>
                <p className="text-sm text-gray-300">Frontend Developer</p>

                <div className="flex items-center gap-2 mt-3">
                  <span className="bg-[#00f5c6]/10 text-[#7a9892] text-xs font-medium px-3 py-1 rounded-lg">
                    Employee ID: {loggedEmployee?._id.slice(0, 8)}...
                  </span>
                  <span className="bg-blue-500/10 text-blue-400 text-xs font-medium px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Message Button */}
            <Link
              to={`/messages/${loggedEmployee?._id}`}
              title="Send Message"
              className="bg-gradient-to-br from-[#7a9892] to-[#93c6bc] hover:from-[#7a9892] hover:to-[#98c4bb] p-3 rounded-full shadow-lg transition duration-300 hover:scale-110"
            >
              <BiMessageRounded className="text-white text-2xl" />
            </Link>
          </div>
        )}

        {/* Auth */}
        <div>
          {token ? (
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/employee/login");
              }}
              className="px-4 py-1.5 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-full text-sm font-medium transition"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/employee/login"
              className="px-4 py-1.5 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-full text-sm font-medium transition"
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
