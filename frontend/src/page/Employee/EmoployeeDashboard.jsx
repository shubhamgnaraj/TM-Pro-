import { useEffect, useState } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInEmployee } from "../../service/service";
import { BASE_URL } from "../../config";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, loggedEmployee } = useSelector((state) => state.user);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !loggedEmployee) {
      dispatch(getLoggedInEmployee(decode.id));
    }
  }, [dispatch]);

  if (!loggedEmployee) return <p>Loading employee data...</p>;
  const handleOnTaskAceepted = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        return task._id === taskId ? { ...task, Accepted: true } : task;
      });
    });
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-600 via-teal-400 to-green-400 relative overflow-x-hidden">
      <div className=" w-full h-[35%] flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-x-4 ">
          <img
            src={`${BASE_URL}/uploads/${loggedEmployee.photo}`}
            alt="Employee"
            className="w-16 h-16 rounded-full shadow-[0_0_15px_#00f5c6] ring-4 ring-[#00f5c6] hover:scale-105 transition duration-300 object-center"
          />

          <h1 className="text-sm mt-2 font-extrabold text-white mb-8 text-center drop-shadow-lg tracking-wide">
            <span className="bg-gradient-to-r from-blue-300 via-teal-300 to-green-300 bg-clip-text text-transparent">
              {loggedEmployee.firstname + " " + loggedEmployee.lastname}
            </span>
          </h1>
        </div>

        <Link
          to={`/messages/${loggedEmployee?._id}`}
          className="bg-blue-100 p-2 rounded-full"
        >
          <BiMessageRounded className="text-blue-500 text-2xl" />
        </Link>
      </div>
      <div className="flex flex-col items-center min-h-screen py-5 px-4">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg tracking-wide">
          <span className="bg-gradient-to-r from-blue-300 via-teal-300 to-green-300 bg-clip-text text-transparent">
            Accepted Tasks
          </span>
        </h1>
        {isLoading || !loggedEmployee ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="w-16 h-16 border-8 border-t-8 border-t-teal-400 border-blue-500 rounded-full animate-spin shadow-xl"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {!loggedEmployee?.tasks ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <div className="text-6xl mb-4">🎉</div>
                <p className="text-lg text-white/80 font-medium">
                  No tasks assigned yet. Enjoy your day!
                </p>
              </div>
            ) : (
              loggedEmployee?.tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-blue-200  rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-lg font-semibold text-gray-800 capitalize">
                        {task.title}
                      </h2>
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium capitalize ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {task.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div>
                        <span className="font-medium">Tags:</span> {task.tags}
                      </div>
                      <div>
                        <span className="font-medium">Due:</span> {task.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    {task.Accepted ? (
                      <button
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded transition hover:bg-green-700"
                        title="Edit Task"
                      >
                        Complete Task
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOnTaskAceepted(task._id)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition"
                        title="Edit Task"
                      >
                        Accept Task
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="absolute bottom-4 right-4 text-white/80 text-xs">
        <span className="bg-black/30 px-3 py-1 rounded-full shadow">
          Employee Dashboard
        </span>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
