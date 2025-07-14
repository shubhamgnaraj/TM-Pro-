import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./page/Home";
import SendTaskEmployee from "./page/Manager/SendTaskEmployee";
import EmployeeDashboard from "./page/Employee/EmoployeeDashboard";
import ManagerDashboard from "./page/Manager/ManagerDashboard";
import SignUp from "./page/auth/SignUp";
import EmployeeLogin from "./page/auth/EmployeeLogin";
import ManagerLogin from "./page/auth/ManagerLogin";
import PrivacyComp from "./components/PrivacyComp";
import ViewDetail from "./page/ViewDetail";

function App() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Home />} />

        {/* auth section */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/manager/login" element={<ManagerLogin />} />

        <Route
          path="/employee/dashboard"
          element={
            <PrivacyComp>
              <EmployeeDashboard />
            </PrivacyComp>
          }
        />

        <Route
          path="/employee/view-detail"
          element={
            <PrivacyComp>
              <ViewDetail />
            </PrivacyComp>
          }
          />

        <Route
          path="/manager/add-user"
          element={
              <SignUp />
          }
        />
        <Route
          path="/manager/dashboard"
          element={
            <PrivacyComp>
              <ManagerDashboard />
            </PrivacyComp>
          }
        />
        <Route
          path="/manager/send-task-employee"
          element={
            <PrivacyComp>
              <SendTaskEmployee />
            </PrivacyComp>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
