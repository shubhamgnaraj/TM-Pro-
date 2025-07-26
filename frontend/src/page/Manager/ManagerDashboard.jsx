import { BiMessageRounded } from "react-icons/bi";
import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
// import { getUsersfromServer } from "../../service/service";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployees } from "../../service/service";
import HeadingComp from "../../components/HeadingComp";

function ManagerDashboard() {
  const [users, setUsers] = useState(null);

  const { employeeInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#c6ffe0] via-[#f6e6ff] to-[#d1e3ff] p-8">
      <Navbar />

      <HeadingComp headingName={"Manager-Dashboard"} />
      <div className="flex px-6 py-4 flex-wrap gap-6 mt-5">
        {employeeInfo && employeeInfo.length > 0 ? (
          employeeInfo.map((employee) => {
            if (employee.position === "employee") {
              return (
                <div
                  key={employee._id}
                  className="bg-white rounded-xl shadow-lg p-6 w-80 flex flex-col gap-4 hover:shadow-2xl transition-shadow duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/messages/${employee._id}`}
                      className="bg-blue-100 p-2 rounded-full"
                    >
                      <BiMessageRounded className="text-blue-500 text-2xl" />
                    </Link>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 capitalize">
                        {employee.firstname + " " + employee.lastname}
                      </h2>
                      <p className="text-sm text-gray-500">{employee.email}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="flex flex-col items-center">
                      <span className="text-gray-500 text-xs">Total</span>
                      <span className="font-bold text-green-500 text-2xl p-2">
                        {employee.totalTask}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-gray-500 text-xs">Accepted</span>
                      <span className="font-bold text-yellow-500 text-2xl p-2">
                        {employee.acceptedTask}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-gray-500 text-xs">Pending</span>
                      <span className="font-bold text-red-500 text-2xl p-2">
                        {employee.pendingTask}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/view-details/${employee._id}`}
                    className="mt-4 text-blue-600 hover:underline text-sm font-medium self-end"
                  >
                    View Details
                  </Link>
                </div>
              );
            }
          })
        ) : (
          <div className="relative w-24 h-24">
            {/* Infinity loop path */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 96 48">
              <path
                d="M8,24 Q24,0 48,24 Q72,48 88,24"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f5f432" />
                  <stop offset="100%" stopColor="#bc32f5" />
                </linearGradient>
              </defs>
            </svg>
            {/* Glowing orb */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="infinity-orb"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagerDashboard;
