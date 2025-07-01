import { BiMessageRounded } from "react-icons/bi";
import { Link } from "react-router";
import Navbar from "../Navbar";

function HomeDashboard() {
  return (
    <div className="bg-gradient-to-br from-blue-500 via-teal-400 to-green-500 min-h-screen w-full relative">
      {/* Header */}
      <Navbar />

      {/* Main Card */}
      <div className="flex justify-around items-center min-h-[80vh] px-6 py-4 flex-wrap gap-6 mt-5">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl py-4 px-6 w-full max-w-lg flex flex-col items-center relative">

        {/* Message Icon */}
        <Link to="#" className="absolute top-3 right-3 ">
          <BiMessageRounded className="text-lg text-green-600 mb-4 font-bold" />
        </Link>
          {/* Profile */}
          <div className="w-full flex flex-col items-center mb-2">
            <Link
              to="#"
              className="py-2 px-8 bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-full font-bold text-lg shadow hover:scale-105 transition"
            >
              Aman
            </Link>
          </div>

          {/* Stats */}
          <div className="w-full flex justify-between gap-6 mt-2 mb-2">
            <div className="flex-1 bg-gradient-to-br from-blue-400 to-green-300 border border-white/60 py-6 px-5 rounded-xl shadow flex flex-col items-center">
              <h3 className="font-semibold text-gray-700 text-sm mb-1">Accepted Tasks</h3>
              <h2 className="font-extrabold text-4xl text-blue-700">0</h2>
            </div>
            <div className="flex-1 bg-gradient-to-br from-green-300 to-blue-400 border border-white/60 py-6 px-5 rounded-xl shadow flex flex-col items-center">
              <h3 className="font-semibold text-gray-700 text-sm mb-1">Pending Tasks</h3>
              <h2 className="font-extrabold text-4xl text-green-700">0</h2>
            </div>
          </div>

          {/* Total Tasks */}
          <div className="w-full mt-4 flex flex-col items-center">
            <h3 className="font-semibold text-gray-700 text-base mb-1">Total Tasks</h3>
            <h2 className="font-extrabold text-3xl text-teal-700">0</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDashboard;
