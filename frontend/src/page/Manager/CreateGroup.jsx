import React, { useState } from "react";
import HeadingComp from "../../components/HeadingComp";
import BackgroundPage from "../../components/BackgroundPage";
import { IoAddCircleOutline } from "react-icons/io5";
import InputField from "../../components/InputField";
import ButtonField from "../../components/ButtonField";

function CreateGroup() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  const handleOnAddProject = () => {
    if (projectName.trim()) {
      setProjects([...projects, { name: projectName }]);
      setProjectName("");
      setIsOpen(false);
    }
  };

  return (
    <BackgroundPage>
      <div className={`w-full h-screen relative`}>
        <div className="w-full py-6 flex justify-center items-center relative bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-b-2xl shadow-md">
          <HeadingComp headingName={"Create Groups"} />
        </div>

        <div
          className={`w-full flex justify-center my-8 ${
            isOpen ? "opacity-20" : "opacity-100"
          }`}
        >
          <button
            className="py-3 px-6 border border-blue-400 flex items-center gap-x-3 rounded-xl justify-center cursor-pointer bg-white hover:bg-blue-50 transition shadow-md"
            onClick={() => setIsOpen(true)}
          >
            <span className="font-semibold text-blue-700 text-lg">
              Add Project
            </span>
            <IoAddCircleOutline className="text-2xl text-blue-500" />
          </button>
        </div>

        <div
          className={`w-full flex items-center justify-center absolute left-0`}
        >
          {isOpen && (
            <div className="flex flex-col border border-blue-300 py-6 px-8 rounded-2xl bg-white shadow-lg gap-y-4 min-w-[320px]">
              <InputField
                type="text"
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter Project Name..."
                required
              />
              <div className="flex gap-x-2 justify-end">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold text-base shadow hover:bg-blue-600 transition"
                  onClick={handleOnAddProject}
                >
                  Add Project
                </button>
                <button
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium text-base shadow hover:bg-gray-300 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={`w-full h-screen flex p-1 gap-x-4`}>
          {projects.map((project) => {
            return (
              <div className="card py-2 px-4 bg-white/70 rounded-b-2xl h-fit cursor-pointer hover:opacity-50">
                <h1 className="font-bold tracking-tight py-2 px-4 bg-slate-200 rounded-lg">
                  {project.name}
                </h1>
                <h2 className="flex flex-col items-center leading-3 my-2 ">
                  <span className="text-sm font-medium">Colabrators</span>{" "}
                  <span className="font-semibold border border-black/20 mt-1 p-2 rounded-full min-w-10 flex items-center justify-center">
                    5
                  </span>
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </BackgroundPage>
  );
}

export default CreateGroup;
