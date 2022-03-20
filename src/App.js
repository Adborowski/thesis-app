import classes from "./app.module.css";
import MapWrapper from "./components/MapWrapper";
import dummyData from "./db.json"; // local file-based db
import { useState } from "react";
import TaskModal from "./components/TaskModal/TaskModal";
import React from "react";
import ReactDOM from "react-dom";

function App() {
  const [newMarkerLocation, setNewMarkerLocation] = useState();

  const handleNewMarker = (latlng) => {
    console.log("handling new marker", latlng);
    setNewMarkerLocation(latlng);
  };

  /* render using props */

  return (
    <div className={classes.main}>
      <div className={classes.desktopMenu}>
        <div className={classes.title}>thesis-app</div>
      </div>
      <MapWrapper handleNewMarker={handleNewMarker} data={dummyData} />
      <TaskModal latlng={newMarkerLocation} />
    </div>
  );
}

export default App;
