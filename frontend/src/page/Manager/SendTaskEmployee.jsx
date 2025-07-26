import { useState, useEffect } from "react";
import {
  addItemsToServer,
  fetchAllEmployees,
  updateTask,
} from "../../service/service";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../components/Navbar";
import InputField from "../../components/InputField";
import HeadingComp from "../../components/HeadingComp";
import ButtonField from "../../components/ButtonField";
import BackgroundPage from "../../components/BackgroundPage";

function SendTaskEmployee() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("#work");
  const [priority, setPriority] = useState("low");
  const [date, setDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const { mode, empId, taskId } = useParams();
  const [loaded, setLoaded] = useState(false);

  const { employeeInfo } = useSelector((state) => state.user);
  const employees = employeeInfo?.filter((em) => em.position === "employee");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnAddTaskForm = (e) => {
    e.preventDefault();

    const taskData = {
      employeeId,
      title,
      description,
      tags,
      priority,
      date,
    };

    if (mode === "edit") {
      updateTask(taskData, mode, empId, taskId).then((data) => {
        console.log(data);
      });
      navigate(`/view-details/${empId}`);
    } else dispatch(addItemsToServer(taskData));

    setTitle("");
    setDescription("");
    setTags("#work");
    setPriority("low");
    setDate("");
    setEmployeeId("");

    navigate("/manager/dashboard");
  };

  useEffect(() => {
    if (mode === "edit" && employees?.length > 0 && !loaded) {
      const employeeTask = employees.find((emp) => emp._id === empId);
      if (employeeTask) {
        const particularTask = employeeTask.tasks.find(
          (task) => task._id === taskId
        );
        if (particularTask) {
          setTitle(particularTask.title || "");
          setDescription(particularTask.description || "");
          setTags(particularTask.tags || "#work");
          setPriority(particularTask.priority || "low");
          setDate(particularTask.date?.slice(0, 10) || "");
          setEmployeeId(empId);
          setLoaded(true);
        }
      }
    }
  }, [employees, mode, empId, taskId, loaded]);

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, []);

  return (
    <div className="w-full h-screen">
      <Navbar />

      <BackgroundPage>
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
            <HeadingComp
              headingName={
                mode === "edit" ? "Update Task" : "Assign a New Task"
              }
            />

            <p className="text-gray-400 text-base font-medium text-center">
              {mode === "edit"
                ? "Update the details below to modify the assigned task for your employee"
                : "Fill in the details below to assign a task to your employee."}
            </p>
          </div>
          <form
            className="space-y-1"
            action={
              mode === "edit"
                ? `/manager/sendTask/${mode}/${empId}/${taskId}`
                : `/manager/send-task-employee`
            }
            method="post"
            onSubmit={handleOnAddTaskForm}
          >
            {/* Title */}

            <InputField
              label={"Task title"}
              type={"text"}
              id={"title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"E.g., Complete project report"}
            />

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-[13px] font-semibold text-black/50 mb-1 "
              >
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="outline-none placeholder:text-sm placeholder:opacity-75 block w-full rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-4 font-semibold transition mb-4"
                placeholder="Provide a detailed description of the task..."
              ></textarea>
            </div>

            <div className="w-full flex justify-between items-center  gap-4 ">
              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-[13px] font-semibold text-black/50 mb-1"
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
                  className="block text-[13px] font-semibold text-black/50 mb-1"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  required
                  className="outline-none placeholder:text-sm placeholder:opacity-75 rounded-lg bg-white/70 text-gray-500 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-8 font-semibold transition "
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
                className="block text-[13px] font-semibold text-black/50 mb-1 "
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
                className="outline-none placeholder:text-sm placeholder:opacity-75 block w-full rounded-lg bg-white/70 text-gray-500 placeholder-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-4 font-semibold transition "
              />
            </div>

            <div>
              <label
                htmlFor="employeeId"
                className="block text-[13px] font-semibold text-black/50 mb-1 mt-4"
              >
                Employee
              </label>
              <select
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
                disabled={mode === "edit"}
                className={`outline-none placeholder:text-sm placeholder:opacity-75 mt-1 block w-full rounded-lg bg-white/70 text-gray-500 border-none shadow-sm focus:ring-2 focus:ring-blue-400 sm:text-base py-2 px-4 font-semibold transition mb-8`}
              >
                <option value="">Select employee...</option>
                {employees?.map((emp) => (
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
              <ButtonField
                innerText={mode === "edit" ? "Update Task" : "Assign Task"}
              />
            </div>
          </form>
        </div>
      </BackgroundPage>
    </div>
  );
}

export default SendTaskEmployee;
