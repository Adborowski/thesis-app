import classes from "./marker.module.css";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import db from "../../db.json";

const Markers = () => {
  const icon = L.icon({
    iconUrl: "./markers/marker1.svg",
    // shadowUrl: 'leaf-shadow.png',
    iconSize: [38, 95], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  console.log("Markers using db:", db);
  const content = db.map((markerData) => {
    console.log(markerData);
    return (
      <Marker key={markerData.id} position={markerData.latlng} icon={icon}>
        <Popup>Here is a task. $100</Popup>
      </Marker>
    );
  });

  return content;
};

export default Markers;
