import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";

function ViewDetail() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, employeeInfo } = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`http://localhost:3000/employee/dashboard/${employeeInfo._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks));
  }, []);

  console.log(tasks);
  return <div>ViewDetail</div>;
}

export default ViewDetail;
