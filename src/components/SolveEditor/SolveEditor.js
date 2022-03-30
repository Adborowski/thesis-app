import classes from "./SolveEditor.module.css";
import { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "../Icons/Icon";
import Minimap from "../Minimap/Minimap";

const SolveEditor = (props) => {
  const [taskToSolve, setTaskToSolve] = useState(props.task);
  console.log(props);

  useEffect(() => {
    if (props.task) {
      setTaskToSolve(props.task);
      console.log(props);
    }
  }, [props]);

  if (taskToSolve) {
    return (
      <div className={classes.SolveEditor}>
        <Nav />
        <h1 className={classes.header}>Solve Task</h1>
        <Minimap taskLatlng={taskToSolve.latlng} icon={Icon} />

        <div className={classes.controls}></div>
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
};

export default SolveEditor;
