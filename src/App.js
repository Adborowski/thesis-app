import classes from "./app.module.css";
import MapWrapper from "./components/MapWrapper";
import dummyData from "./db.json"; // local file-based db
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className={classes.main}>
      <div className={classes.desktopMenu}>
        <div className={classes.title}>thesis-app</div>
      </div>
      <MapWrapper db={dummyData} />
    </div>
  );
}

export default App;
