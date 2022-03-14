import classes from "./app.module.css";
import MapWrapper from "./components/MapWrapper";
import db from "./db.json"; // local file-based db
import { useState } from "react";
import TaskModal from "./components/TaskModal/TaskModal";

function App() {
  console.log("Data: ", db);

  return (
    <div className={classes.main}>
      <div className={classes.desktopMenu}>
        <div className={classes.title}>thesis-app</div>
      </div>
      <MapWrapper db={db} />
      <TaskModal />
    </div>
  );
}

export default App;
