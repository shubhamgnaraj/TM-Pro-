import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { deleteTask, fetchAllEmployees } from "../../service/service";
import Navbar from "../../components/Navbar";
import MagicLoader from "../../components/MagicLoader";
import { Link } from "react-router";
import HeadingComp from "../../components/HeadingComp";
import CountDownTask from "../../components/CountDownTask";

function ViewDetail() {
  const [employee, setEmployee] = useState([]);
  const { id: employeeId } = useParams();

  const { employeeInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  useEffect(() => {
    if (employeeInfo) {
      const foundEmp = employeeInfo.find((emp) => emp._id === employeeId);

      if (foundEmp) {
        setEmployee(foundEmp);
      }
    }
  }, [employeeInfo]);

  const handleOnDeleteTask = (employeeId, taskId) => {
    deleteTask(employeeId, taskId).then((data) => {
      setEmployee((employee) =>
        employee.tasks.filter((task) => task._id !== taskId)
      );
    });
  };

  if (employee.length === 0) return <MagicLoader />;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#c6ffe0] via-[#f6e6ff] to-[#d1e3ff] p-8">
      <Navbar />

      <HeadingComp headingName={"Employee-Tasks"} />
      <div className="my-12">
        <h1 className="text-3xl text-center font-bold text-gray-700 capitalize mb-6 tracking-wide">
          {employee.firstname + " " + employee.lastname}
        </h1>

        <div className="">
          {employee.tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {employee.tasks.map((task) => {
                return (
                  <div
                    key={task._id}
                    className="bg-[#e2ecea] backdrop-blur-xl border border-indigo-100 shadow-2xl rounded-3xl p-6 flex flex-col justify-between hover:shadow-indigo-300 transition-shadow duration-300"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-semibold text-indigo-900 capitalize">
                          {task.title}
                        </h2>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold shadow-sm ${
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

                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {task.description}
                      </p>

                      <div className="flex flex-col justify-between text-xs text-gray-600 w-full">
                        <div>
                          <span className="font-medium">Tags:</span>{" "}
                          <span className="text-blue-600">{task.tags}</span>
                        </div>
                        <div className="flex w-full items-center">
                          <span className="font-medium w-full">
                            Time-Deadline:{" "}
                          </span>
                          <CountDownTask dueDate={task.date} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <Link
                        to={`/manager/send-task-employee/edit/${employee._id}/${task._id}`}
                        className="text-sm px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg font-medium transition-all"
                      >
                        Edit
                      </Link>
                      <button
                        className="text-sm px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-medium transition-all"
                        onClick={() =>
                          handleOnDeleteTask(employee._id, task._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <HeadingComp headingName={"No Task Assign Yet Enjou Your Day"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewDetail;
