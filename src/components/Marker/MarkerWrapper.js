import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import classes from "./marker.module.css";
import * as L from "leaflet";

const MarkerWrapper = (props) => {
  const myIcon = L.icon({
    iconUrl: "./markers/round-pin.svg",
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: null,
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  return (
    <Marker
      position={props.position}
      icon={myIcon}
      title="no elo"
      opacity="1.0"
    >
      <Popup>{(props.popupContent, (<h1>elo</h1>))}</Popup>
    </Marker>
  );
};

export default MarkerWrapper;
