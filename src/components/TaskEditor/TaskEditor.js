import { Marker, Popup, Tooltip } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import classes from "./TaskEditor.module.css";

const TaskEditor = (props) => {
  // Create your own class, extending from the Marker class.

  const icon = L.icon({
    iconUrl: "./markers/round-pin-2.svg",
    // shadowUrl: 'leaf-shadow.png',
    iconSize: [30, 30], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
  });

  const onEditorOpened = () => {
    console.log("task editor opened");
  };

  const onEditorClicked = () => {
    console.log("task editor clicked");
  };

  const closeEditor = () => {
    console.log("closing editor");
  };

  if (props.latlng) {
    return (
      <Marker position={props.latlng} icon={icon}>
        <Tooltip
          direction={"top"}
          offset={[0, -30]}
          opacity={1}
          permanent={true}
          interactive={true}
          onclick={console.log("x")}
        >
          <div className={classes.TaskEditor}>
            <h3>Task name</h3>
            <input placeholder={"task title"}></input>
            <input type="number" placeholder={"reward"}></input>
            <input placeholder={"task description"}></input>
            <button onClick={props.onCloseEditorClick}>close</button>
          </div>
        </Tooltip>
      </Marker>
    );
  } else {
    return null;
  }
};

export default TaskEditor;
