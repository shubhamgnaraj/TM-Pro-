import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddTasks from "./components/AddTasks";
import SignUp from "./components/Admin/SignUp";
import AcceptTask from "./components/AcceptTask";
import { Route, Routes } from "react-router";
import Login from "./components/Admin/Login";
import HomeDashboard from "./components/Manager/HomeDashboard"

function App() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<HomeDashboard />} />
        {/* <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/task/add-task" element={<AddTasks />} />
        <Route path="/task/home" element={<AcceptTask />} /> */}
      </Routes>
    </div>
  );
}

export default App;

// dark green #648b7e light green #9ec6bb
// light blue #c7d5e7 dark blue #a3b5c9
