import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchAllEmployees } from "../service/service";

function ViewDetail() {
  const [tasks, setTasks] = useState([]);
  const { id: employeeId } = useParams();
  const [loading, setLoading] = useState(false);

  const { employeeInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const employees = employeeInfo?.filter((emp) => emp._id === employeeId);

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  if (!employees) return <p>Loading...</p>;

  return (
   <div className="w-full min-h-screen bg-gradient-to-br from-[#c6ffe0] via-[#f6e6ff] to-[#d1e3ff] p-8">
  {employees?.map((emp) => {
    return (
      <div key={emp._id} className="mb-12">
        <h1 className="text-3xl text-center font-bold text-gray-700 capitalize mb-6 tracking-wide">
          {emp.firstname + " " + emp.lastname}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {emp.tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white/60 backdrop-blur-xl border border-indigo-100 shadow-2xl rounded-3xl p-6 flex flex-col justify-between hover:shadow-indigo-300 transition-shadow duration-300"
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

                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {task.description}
                </p>

                <div className="flex justify-between text-xs text-gray-600">
                  <span>
                    <span className="font-medium">Tags:</span> {task.tags}
                  </span>
                  <span>
                    <span className="font-medium">Due:</span> {task.date}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button className="text-sm px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg font-medium transition-all">
                  Edit
                </button>
                <button className="text-sm px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-medium transition-all">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  })}
</div>




  );
}

export default ViewDetail;
