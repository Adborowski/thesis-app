import { Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useRef, useEffect } from "react";

const TaskEditor = (latlng) => {
  // Create your own class, extending from the Marker class.

  console.log("Running task editor with latlng: ", latlng);

  const icon = L.icon({
    iconUrl: "./markers/round-pin.svg",
    // shadowUrl: 'leaf-shadow.png',
    iconSize: [30, 30], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
  });

  if (latlng) {
    return (
      <Marker position={latlng} icon={icon}>
        <Tooltip direction={"top"} offset={[0, -30]} opacity={1} permanent>
          <input placeholder={"task title"}></input>
        </Tooltip>
      </Marker>
    );
  } else {
    return null;
  }
};

export default TaskEditor;
