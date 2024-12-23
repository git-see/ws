import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TeamCrud from "./pages/TeamCrud";
import AllProjects from "./pages/AllProjects";
import AddProject from "./pages/AddProject";
import OneProject from "./pages/OneProject";
import AddTask from "./pages/AddTask";
import TasksByRole from "./pages/TasksByRole";
import "./css/app.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teamcrud" element={<TeamCrud />} />
        <Route path="/allprojects" element={<AllProjects />} />
        <Route path="/allprojects/:id" element={<OneProject />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/allprojects/:id/tasks/:id" element={<TasksByRole />} />
      </Routes>
    </>
  );
}

export default App;
