import classes from "./app.module.css";
import MapWrapper from "./components/MapWrapper";
import dummyData from "./db.json"; // local file-based db
import { useState, useCallback } from "react";
import { useMap } from "react-leaflet";
import TaskModal from "./components/TaskModal/TaskModal";
import { Route, Routes, useNavigate } from "react-router-dom";
import TaskEditor from "./components/TaskEditor/TaskEditor";

function App() {
  console.log("Data: ", dummyData);
  const navigate = useNavigate();

  const handleEditorRedirect = useCallback(
    () => navigate("/editor", { replace: true }),
    [navigate]
  );

  const [newTaskLocation, setNewTaskLocation] = useState();

  const openTaskModal = (latlng) => {
    console.log("APP.JS OPEN TASK MODAL:", latlng);
    const taskModal = document.getElementById("taskModal");
    taskModal.dataset.lat = latlng.lat;
    taskModal.dataset.lng = latlng.lng;
    setNewTaskLocation(latlng);
    handleEditorRedirect();
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
          element={<MapWrapper openTaskModal={openTaskModal} data={dummyData}></MapWrapper>}
        />
        <Route
        path="/editor"
        element={<TaskEditor latlng={newTaskLocation}/>}
      />
      </Routes>
      <TaskModal latlng={newTaskLocation} />
    </div>
  );
}

export default App;
