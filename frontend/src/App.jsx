import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./page/Home";
import SendTaskEmployee from "./page/Manager/SendTaskEmployee";
import EmployeeDashboard from "./page/Employee/EmoployeeDashboard";
import ManagerDashboard from "./page/Manager/ManagerDashboard";
import SignUp from "./page/auth/SignUp";
import Login from "./page/auth/Login";
import PrivacyComp from "./components/PrivacyComp";
import ViewDetail from "./page/ViewDetail";
import MessagesEmpVsMan from "./page/MessagesEmpVsMan";
import MagicLoader from "./components/MagicLoader";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const {user} = useContext(AuthContext)

  if(!user) return <MagicLoader />

  return (
    <div className="w-full h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/login" element={<Login />} />

        {user?.position === "employee" && (
          <Route
            path="/employee/dashboard"
            element={
              <PrivacyComp>
                <EmployeeDashboard />
              </PrivacyComp>
            }
          />
        )}

        {user?.position === "manager" && (
          <>
            <Route
              path="/manager/dashboard"
              element={
                <PrivacyComp>
                  <ManagerDashboard />
                </PrivacyComp>
              }
            />
            <Route
              path="/view-details/:id"
              element={
                <PrivacyComp>
                  <ViewDetail />
                </PrivacyComp>
              }
            />
            <Route path="/manager/add-user" element={<SignUp />} />
            <Route
              path="/manager/send-task-employee"
              element={
                <PrivacyComp>
                  <SendTaskEmployee />
                </PrivacyComp>
              }
            />
          </>
        )}

        <Route
          path="/messages/:id"
          element={
            <PrivacyComp>
              <MessagesEmpVsMan />
            </PrivacyComp>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
