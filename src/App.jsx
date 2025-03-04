import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { Home } from "./components/home/home";
import { CorrespondingDepartment } from "./components/Department/correspondingdepartment";
import { UserProfile } from "./components/Userportal/userprofile";
import { DepartmentIntroduction } from "./components/Department-dashboard/department-introduction";
import { DepartmentHome } from "./components/Department-dashboard/department-home";
import AdminPanel from "./components/admin/admin";
import "./index.css";

const PrivateCitizenRoute = ({ element }) => {
  const token = localStorage.getItem("usertoken");
  return token ? element : <Navigate to="/home" replace />;
};

const PrivateDepartmentRoute = ({ element }) => {
  const token = localStorage.getItem("departmenttoken");
  return token ? element : <Navigate to="/home" replace />;
};


const PrivateAdminRoute = ({ element }) => {
  const token = localStorage.getItem("admintoken");
  return token ? element : <Navigate to="/home" replace />;
};

function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const departmentToken = localStorage.getItem("departmenttoken");
  //   if (departmentToken) {
  //     navigate("/department-Introduction");
  //   } else {
  //     navigate("/home");
  //   }
  // }, []);

  return (
    <Router>
      <Routes>
      <Route
          path="/admin-home"
          element={
            <PrivateAdminRoute element={<AdminPanel />} />
          }
        />
        <Route
          path="/department-Introduction"
          element={
            <PrivateDepartmentRoute element={<DepartmentIntroduction />} />
          }
        />
        <Route
          path="/department/dashboard"
          element={<PrivateDepartmentRoute element={<DepartmentHome />} />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/departments"
          element={
            <PrivateCitizenRoute element={<CorrespondingDepartment />} />
          }
        />

        <Route
          path="/profile"
          element={<PrivateCitizenRoute element={<UserProfile />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
