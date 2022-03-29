import classes from "./app.module.css";
import MapWrapper from "./components/MapWrapper";
import dummyData from "./db.json"; // local file-based db
import { useState, useCallback } from "react";
import { useMap } from "react-leaflet";
import TaskModal from "./components/TaskModal/TaskModal";
import { Route, Routes, useNavigate } from "react-router-dom";
import TaskEditor from "./components/TaskEditor/TaskEditor";

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
        element={<TaskEditor closeTaskModal={closeTaskModal} latlng={newTaskLocation}/>}
      />
      </Routes>
    </div>
  );
}

export default App;
