import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptedAndPendingTask, getLoggedInEmployee } from "../../service/service";
import { jwtDecode } from "jwt-decode";
import MagicLoader from "../../components/MagicLoader";
import Navbar from "../../components/Navbar";
import HeadingComp from "../../components/HeadingComp";

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

  const handleOnTaskAceepted = (empId) => {
    acceptedAndPendingTask(empId).then((data) => {
    })
  };

  if (!loggedEmployee) return <MagicLoader />;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#c6ffe0] via-[#f6e6ff] to-[#d1e3ff] p-8">
      <Navbar loggedEmployee={loggedEmployee} />
      <div className="flex flex-col items-center min-h-screen py-5 px-4">
        
        <HeadingComp headingName={"Employees-dashboard"}/>
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
                  className="bg-[#e2ecea] backdrop-blur-xl border border-indigo-100 shadow-2xl rounded-3xl p-6 flex flex-col justify-between hover:shadow-indigo-300 transition-shadow duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold text-indigo-900 capitalize">
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
                    
                    <div className="flex justify-between text-xs text-gray-600">
                        <span>
                          <span className="font-medium">Tags:</span> <span className="text-blue-600">{task.tags}</span>
                        </span>
                        <span>
                          <span className="font-medium">Due:</span> {task.date}
                        </span>
                      </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() =>
                          handleOnTaskAceepted(loggedEmployee?._id)
                        }
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition"
                        title="Edit Task"
                      >
                        Accept Task
                      </button>
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
