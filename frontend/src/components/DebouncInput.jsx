import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployees } from "../service/service";

function DebouncInput({ users, setUsers }) {
  const [inputElem, setInputElem] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { employeeInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!inputElem.trim()) {
        setFilteredData([]);
        return;
      }

      if (employeeInfo && employeeInfo.length > 0) {
        const result = employeeInfo.filter((emp) =>
          emp.firstname.toLowerCase().includes(inputElem.toLowerCase())
        );
        setFilteredData(result);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [inputElem, employeeInfo]);

  const handleOnUser = (dataId) => {
    setUsers(filteredData);
    setFilteredData([]);
    setInputElem("");
  };
  return (
    <div className="relative w-full flex flex-col justify-center items-center my-4">
      <input
        type="text"
        placeholder="Search by first name..."
        value={inputElem}
        onChange={(e) => setInputElem(e.target.value)}
        className="px-4 py-1.5 rounded-full text-sm shadow-md text-gray-700 placeholder-gray-400 border border-gray-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300 w-1/3"
      />

      {filteredData.length > 0 && (
        <ul className="absolute z-10 bg-white/70 top-10 py-4 px-2 shadow-sm flex flex-col items-center">
          {filteredData.map((data) => {
            return (
              <li
                key={data._id}
                className="capitalize text-blue-500 w-full bg-blue-100 px-6 py-2 my-1 rounded-xl cursor-pointer"
                onClick={() => handleOnUser(data._id)}
              >
                {" "}
                {data.firstname} {data.lastname}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default DebouncInput;
