import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemsFromServer } from "../service/service";
import Navbar from "./Navbar";
// import { FaTrash, FaEdit } from 'react-icons/fa';

function AcceptTask() {
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  console.log(tasks)

  useEffect(() => {
    dispatch(getItemsFromServer());
  }, [dispatch]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-green-500">

      <Navbar />
      
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Accepted Tasks
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-12 h-12 border-4 border-t-4 border-t-teal-400 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white/30 backdrop-blur-md rounded-lg p-6 shadow-lg text-white"
            >
              <h2 className="text-xl font-semibold mb-2 capitalize">
                {task.title}
              </h2>
              <p className="text-sm mb-4">{task.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-500 text-xs px-2 py-1 rounded">
                  {task.tags}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded capitalize ${
                    task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
              <div className="text-sm mb-4">
                <span className="font-semibold">Due Date:</span> {task.date}
              </div>
              <div className="flex justify-end space-x-4">
                <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
                  delete
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full">
                  edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default AcceptTask;
