import React, { useState } from "react";
import { addItemsToServer } from "../service/service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

function AddTasks() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("#work");
  const [priority, setPriority] = useState("low");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isAuthentication} = useSelector(state => state.tasks)
  console.log(isAuthentication)

  const handleOnAddTaskForm = (e) => {
    e.preventDefault();

    const taskData = { title, description, tags, priority, date };

    dispatch(addItemsToServer(taskData));
    setTitle("");
    setDescription("");
    setTags("");
    setPriority("");
    setDate("");

    navigate("/task/home");
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-500 via-teal-400 to-green-500">

      <Navbar />
    <div className="h-full flex w-full items-center flex-col">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
          Add New Task
        </h2>
        <form
          className="space-y-6"
          action="/task/add-task"
          method="post"
          onSubmit={(e) => handleOnAddTaskForm(e)}
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-bold text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border-none shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-sm py-2 px-4 font-bold"
              placeholder="E.g., Complete project report"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-bold text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border-none shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-sm py-2 px-4 font-bold"
              placeholder="Provide a detailed description of the task..."
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-bold text-white"
            >
              Tags
            </label>
            <select
              id="tags"
              className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white border-none shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-sm py-2 px-4 font-bold"
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
              className="block text-sm font-bold text-white"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white border-none shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-sm py-2 px-4 font-bold"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-bold text-white"
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
              className="mt-2 block w-full rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 border-none shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-sm py-2 px-4 font-bold"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AddTasks;
