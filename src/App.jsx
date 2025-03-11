import { useEffect, useState } from "react";
import "./App.css";

const taskObj = [
  {
    nameCategory: "New Task",
    id: "1",
    task: [],
  },
  {
    nameCategory: "In Progress",
    id: "2",
    task: [],
  },
  {
    nameCategory: "In Review",
    id: "3",
    task: [],
  },
  {
    nameCategory: "Completed",
    id: "4",
    task: [],
  },
];

function App() {
  const [inputElem, setInputElem] = useState("");
  const [selectElem, setSelectElem] = useState("New Task");
  let [editElem, setEditElem] = useState("");
  const [tasks, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("taskData");
    return savedTasks ? JSON.parse(savedTasks) : taskObj;
  });

  const handleOnClick = () => {
    if (inputElem === "") {
      return;
    }

    setTask((tasks) => {
      return tasks.map((item) => {
        if (item.nameCategory === selectElem) {
          return {
            ...item,
            task: [
              ...item.task,
              { taskName: inputElem, id: Date.now(), checked: false },
            ],
          };
        }
        return item;
      });
    });

    setInputElem("");
  };

  const handleOnDelete = (itemId, taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const copyTask = tasks.map((task) => {
        if (task.id === itemId) {
          return {
            ...task,
            task: task.task.filter((removeTask) => removeTask.id !== taskId),
          };
        }
        return task;
      });
      setTask(copyTask);
    }
  };

  const handleOnEditTask = (itemId, taskId) => {
  
    const copyTask = tasks.map((task) => {
      if(task.id === itemId) {
        return {
          ...task,
          task: task.task.map((item) => {
            if(item.id === taskId) {
              setEditElem(item.taskName)
              return {...item, taskName: editElem, checked: !item.checked}
            }
            return item;
          }),
        };
      }
      return task;
    });

    setTask(copyTask)
  }

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="h-screen w-full bg-gray-500 py-5 px-2 overflow-hidden">
      <div className="w-full flex justify-center gap-x-2 ">
        <input
          type="text"
          placeholder="Enter here todo..."
          className="border py-1 px-2 rounded-lg"
          onChange={(e) => setInputElem(e.target.value)}
          value={inputElem}
        />
        <select
          className="rounded-lg py-2 px-5 outline-none"
          onChange={(e) => setSelectElem(e.target.value)}
          value={selectElem}
        >
          <option value="New Task">New Task</option>
          <option value="In Progress">In Progress</option>
          <option value="In Review">In Review</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          className="py-2 px-4 bg-white rounded-lg"
          onClick={handleOnClick}
        >
          Add
        </button>
      </div>

      <div className="mt-5 h-full w-full flex text-white ">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="h-full py-2 px-1 border w-[25%] border-black flex flex-col items-center"
          >
            <h1 className="w-full text-center bg-gray-600 rounded-lg p-2 text-lg shadow-sm shadow-black">{task.nameCategory}</h1>
            <div className="flex w-full mt-5 flex-col gap-y-2">
              {task.task.map((elem) => (
                <div
                  key={elem.id}
                  className="flex w-full justify-between py-2 px-2 items-center bg-gray-400 rounded-sm "
                >
                  {!elem.checked ? (
                    <div className="capitalize font-semibold">{elem.taskName}</div>
                  ) : (
                    <input
                      type="text"
                      value={editElem}
                      onChange={(e) => setEditElem(e.target.value)}
                      className="h-full px-2 outline-none bg-transparent border"
                      autoFocus={!task.checked}
                    />
                  )}

                  <div className="flex items-center gap-x-2">
                    <button
                      onClick={() => handleOnDelete(task.id, elem.id)}
                      className="bg-red-400 rounded-lg text-gray-700 font-serif font-semibold px-2 py-1"
                    >
                      X
                    </button>
                    <button className="bg-green-400 rounded-lg text-gray-700 font-serif font-semibold px-2 py-1 min-w-[60px]" onClick={() => handleOnEditTask(task.id, elem.id)}>
                      {
                        elem.checked ? 'Save' : 'Edit'
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
