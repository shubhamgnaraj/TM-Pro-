import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Route, Routes } from "react-router";
import Home from "../page/Home";
import Login from "../page/auth/Login";
import PrivacyComp from "../components/PrivacyComp";
import EmployeeDashboard from "../page/Employee/EmoployeeDashboard";
import ManagerDashboard from "../page/Manager/ManagerDashboard";
import SendTaskEmployee from "../page/Manager/SendTaskEmployee";
import SignUp from "../page/auth/SignUp";
import MessagesEmpVsMan from "../page/MessagesEmpVsMan";
import ViewDetail from "../page/Manager/ViewDetail";

function PageRouter() {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/login" element={<Login />} />

        <Route
          path="/messages/:id"
          element={
            <PrivacyComp>
              <MessagesEmpVsMan />
            </PrivacyComp>
          }
        />

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

            <Route
              path="/manager/add-user"
              element={
                <PrivacyComp>
                  <SendTaskEmployee />
                </PrivacyComp>
              }
            />

            <Route
              path="/manager/add-user"
              element={
                <PrivacyComp>
                  <SignUp />
                </PrivacyComp>
              }
            />

            <Route
              path="/manager/send-task-employee/:mode/:empId/:taskId"
              element={
                <PrivacyComp>
                  <SendTaskEmployee />
                </PrivacyComp>
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
}

export default PageRouter;
