import classes from "./App.module.css";
import MapWrapper from "./components/MapWrapper";
import dummyData from "./db.json"; // local file-based db
import { useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TaskEditor from "./components/TaskEditor/TaskEditor";
import SolveEditor from "./components/SolveEditor/SolveEditor";

function App() {
  const navigate = useNavigate();

  const handleEditorRedirect = useCallback(
    () => navigate("/editor", { replace: true }),
    [navigate]
  );

  const handleEditorClose = useCallback(
    () => navigate("/", { replace: true }),
    [navigate]
  );

  const handleSolverRedirect = useCallback(
    () => navigate("/solver", { replace: true }),
    [navigate]
  );

  // decides whether TaskEditor is visible
  const [newTaskLocation, setNewTaskLocation] = useState();

  const openTaskModal = (latlng) => {
    console.log("APP.JS OPEN TASK MODAL:", latlng);
    setNewTaskLocation(latlng);
    handleEditorRedirect();
  };

  const closeTaskModal = () => {
    console.log("CLOSING TASK MODAL");
    setNewTaskLocation();
    handleEditorClose();
  };

  const openTaskSolver = () => {
    handleSolverRedirect();
  };

  // prettier-ignore
  return (
    <div className={classes.main}>
      <div className={classes.desktopMenu}>
        <div className={classes.title}>thesis-app</div>
      </div>
      <Routes>

        <Route
          path="/"
          element={<MapWrapper 
            handleSolverRedirect={handleSolverRedirect} openTaskModal={openTaskModal} 
            data={dummyData}></MapWrapper>}
        />

        <Route
          path="/editor"
          element={<TaskEditor closeTaskModal={closeTaskModal} latlng={newTaskLocation}/>}
        />

        <Route
          path="/solver"
          element={<SolveEditor/>}
        />

      </Routes>
    </div>
  );
}

export default App;
