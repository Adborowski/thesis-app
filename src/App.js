import classes from "./App.module.css";
import MapWrapper from "./components/MapWrapper";
import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TaskEditor from "./components/TaskEditor/TaskEditor";
import SolveEditor from "./components/SolveEditor/SolveEditor";
import Nav from "./components/Nav/Nav";
import dummyData from "./db.json";
import axios from "axios";

function App() {
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState(dummyData);

  const getLocalData = () => {
    if (localStorage.getItem("taskData")) {
      const localData = JSON.parse(localStorage.getItem("taskData"));
      return localData;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (getLocalData()) {
      setTaskData(getLocalData());
      console.log(taskData);
    }

    axios
      .get("https://tiszuk.com/tasks")
      .then(function (response) {
        setTaskData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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

  const [newTaskLocation, setNewTaskLocation] = useState();
  const [solverTask, setSolverTask] = useState();

  const openTaskModal = (latlng) => {
    console.log("APP.JS OPEN TASK MODAL:", latlng);
    setNewTaskLocation(latlng); // this opens taskModal
    handleEditorRedirect();
  };

  const closeTaskModal = () => {
    console.log("CLOSING TASK MODAL");
    setNewTaskLocation();
    handleEditorClose();
  };

  const openTaskSolver = (taskId) => {
    handleSolverRedirect();
    console.log("solvin", taskId);
    const taskToSolve = taskData.find((task) => task.id === taskId);
    setSolverTask(taskToSolve);
  };

  // prettier-ignore
  return (
    <div className={classes.main}>
      <Routes>

        <Route
          path="/"
          element={<MapWrapper 
            openTaskSolver={openTaskSolver} 
            openTaskModal={openTaskModal} 
            taskData={taskData}
            ></MapWrapper>}
        />

        <Route
          path="/editor"
          element={<TaskEditor closeTaskModal={closeTaskModal} latlng={newTaskLocation}/>}
        />

        <Route
          path="/solver"
          element={<SolveEditor task={solverTask}/>}
        />

      </Routes>
    </div>
  );
}

export default App;
