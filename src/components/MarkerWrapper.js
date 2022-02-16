import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import classes from "./map.module.css";
import * as L from "leaflet";

const MarkerWrapper = (props) => {
  var myIcon = L.icon({
    iconUrl: "./markers/marker7.svg",
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: null,
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  return (
    <div className={classes.MarkerWrapper}>
      <Marker
        position={props.position}
        icon={myIcon}
        title="no elo"
        opacity="1.0"
      >
        <Popup>{props.popupContent}</Popup>
      </Marker>
    </div>
  );
};

export default MarkerWrapper;
