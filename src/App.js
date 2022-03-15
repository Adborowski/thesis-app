import classes from "./app.module.css";
import MapWrapper from "./components/MapWrapper";
import dummyData from "./db.json"; // local file-based db
import { useState } from "react";
import TaskModal from "./components/TaskModal/TaskModal";

function App() {
  console.log("Data: ", dummyData);

  const [newTaskLocation, setNewTaskLocation] = useState([0, 0]);

  return (
    <div className={classes.main}>
      <div className={classes.desktopMenu}>
        <div className={classes.title}>thesis-app</div>
      </div>
      <MapWrapper data={dummyData} />
      <TaskModal />
    </div>
  );
}

export default App;
