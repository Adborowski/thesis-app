import classes from "./marker.module.css";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import db from "../../db.json";

const Markers = () => {
  const icon = L.icon({
    iconUrl: "./markers/round-pin.svg",
    // shadowUrl: 'leaf-shadow.png',
    iconSize: [30, 30], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
  });

  const content = db.map((task) => {
    return (
      <Marker key={task.id} position={task.latlng} icon={icon}>
        <Popup>
          <h1>{task.taskTitle}</h1>
          <h2>{task.taskReward}</h2>
          <h3>{task.taskOwnerID}</h3>
          <button> try </button>
        </Popup>
      </Marker>
    );
  });

  return content;
};

export default Markers;
