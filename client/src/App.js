import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TeamCrud from "./pages/TeamCrud";
import AllProjects from "./pages/AllProjects";
import AddProject from "./pages/AddProject";
import OneProject from "./pages/OneProject";
import AddTask from "./pages/AddTask";
import TasksByRole from "./pages/TasksByRole";
import Auth from "./components/Auth";
import Admin from "./pages/Admin";
import Member from "./pages/Member";
import { Navigate } from "react-router-dom";
import "./css/app.css";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/member"
          element={
            <PrivateRoute>
              <Member />
            </PrivateRoute>
          }
        />
        <Route
          path="/teamcrud"
          element={
            <PrivateRoute>
              <TeamCrud />
            </PrivateRoute>
          }
        />
        <Route
          path="/allprojects"
          element={
            <PrivateRoute>
              <AllProjects />
            </PrivateRoute>
          }
        />
        <Route
          path="/oneproject/:projectId"
          element={
            <PrivateRoute>
              <OneProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-project"
          element={
            <PrivateRoute>
              <AddProject />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-task/:projectId"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/:projectId/:roleId"
          element={
            <PrivateRoute>
              <TasksByRole />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
