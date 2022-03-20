import classes from "./app.module.css";
import MapWrapper from "./components/MapWrapper";
import dummyData from "./db.json"; // local file-based db
import { useState } from "react";
import TaskModal from "./components/TaskModal/TaskModal";

function App() {
  console.log("Data: ", dummyData);

  const [newTaskLocation, setNewTaskLocation] = useState([0, 0]);

  const openTaskModal = (latlng) => {
    console.log("APP.JS OPEN TASK MODAL:", latlng);
    setNewTaskLocation(latlng);
    const taskModal = document.getElementById("taskModal");
    taskModal.dataset.lat = latlng.lat;
    taskModal.dataset.lng = latlng.lng;
    taskModal.classList.add("open");
  };

  return (
    <div className={classes.main}>
      <div className={classes.desktopMenu}>
        <div className={classes.title}>thesis-app</div>
      </div>
      <MapWrapper openTaskModal={openTaskModal} data={dummyData}></MapWrapper>
      <TaskModal latlng={newTaskLocation} />
    </div>
  );
}

export default App;
