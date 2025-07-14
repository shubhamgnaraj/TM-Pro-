import React, { useState, useEffect } from "react";
import { addItemsToServer, fetchAllEmployees } from "../../service/service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";

function SendTaskEmployee() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("#work");
  const [priority, setPriority] = useState("low");
  const [date, setDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const { employees } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnAddTaskForm = (e) => {
    e.preventDefault();

    console.log(employeeId)
    const taskData = {
      employeeId,
      title,
      description,
      tags,
      priority,
      date,
    };

    dispatch(addItemsToServer(taskData));
    setTitle("");
    setDescription("");
    setTags("#work");
    setPriority("low");
    setDate("");
    setEmployeeId("");

    navigate("/employee/dashboard");
  };

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  return (
    <div className="w-full h-screen">
      <Navbar />

      <div className="w-full h-screen bg-gradient-to-br from-blue-700 via-teal-500 to-green-400 flex  justify-center relative overflow-hidden py-5">
        {/* Decorative Circles */}
        <div className="relative z-10 w-full max-w-lg mx-auto bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl px-10 py-1 border border-white/20 mb-2">
          <div className="flex flex-col items-center mb-5">
            <div className="bg-gradient-to-tr from-blue-500 to-green-400 rounded-full p-4 shadow-lg mb-2">
              {/* Clipboard Check Icon */}
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect
                  x="7"
                  y="4"
                  width="10"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M9 2h6v4H9z" fill="currentColor" opacity="0.2" />
                <path d="M9 2h6v4H9z" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M9 14l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-white drop-shadow-lg text-center">
              Assign a New Task
            </h2>
            <p className="text-white/80 text-base font-medium text-center">
              Fill in the details below to assign a task to your employee.
            </p>
          </div>
          <form
            className="space-y-1"
            action="/manager/send-task-employee"
            method="post"
            onSubmit={handleOnAddTaskForm}
          >
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-white mb-1"
              >
                Task Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className=" outline-none placeholder:text-sm placeholder:opacity-75 mt-1 block w-full rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-4 font-semibold transition"
                placeholder="E.g., Complete project report"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-white mb-1 mt-2"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="outline-none placeholder:text-sm placeholder:opacity-75 block w-full rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-4 font-semibold transition"
                placeholder="Provide a detailed description of the task..."
              ></textarea>
            </div>

            <div className="w-full flex justify-between items-center  gap-4">
              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-semibold text-white mb-1 mt-2 "
                >
                  Tags
                </label>
                <select
                  id="tags"
                  className=" outline-none placeholder:text-sm placeholder:opacity-75 rounded-lg bg-white/70 text-gray-500 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-8 font-semibold transition"
                  name="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  required
                >
                  <option value="#work">#work</option>
                  <option value="#personal">#personal</option>
                  <option value="#urgent">#urgent</option>
                  <option value="#other">#other</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-semibold text-white mb-1 mt-2"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                  className="outline-none placeholder:text-sm placeholder:opacity-75 rounded-lg bg-white/70 text-gray-500 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-8 font-semibold transition"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-semibold text-white mb-1 mt-2"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="outline-none placeholder:text-sm placeholder:opacity-75 block w-full rounded-lg bg-white/70 text-gray-500 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-4 font-semibold transition"
              />
            </div>

            <div>
              <label
                htmlFor="employeeId"
                className="block text-sm font-semibold text-white mt-2 mb-1"
              >
                Employee
              </label>
              <select
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
                className="outline-none placeholder:text-sm placeholder:opacity-75 mt-1 block w-full rounded-lg bg-white/70 text-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-4 font-semibold transition mb-2"
              >
                <option value="">Select employee...</option>
                {employees.map((emp) => (
                  <option
                    key={emp._id}
                    value={emp._id}
                    className="capitalize text-sm"
                  >
                    {emp.firstname} {emp.lastname}
                  </option>
                ))}
              </select>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-teal-400 to-green-500 text-white py-2 px-4 rounded-lg font-bold text-lg shadow-md hover:from-blue-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition mt-4"
              >
                Assign Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendTaskEmployee;
