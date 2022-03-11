import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import classes from "./Marker.module.css";

const Markers = (props) => {
  const taskData = props.db;

  const map = useMap();

  const icon = L.icon({
    iconUrl: "./markers/round-pin.svg",
    // shadowUrl: 'leaf-shadow.png',
    iconSize: [30, 30], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
  });

  const markerOptions = { icon: icon };

  // only add the markers to map if the map has a different number than the data received
  // this is done to prevent marker duplication
  if (Object.keys(map._layers).length !== taskData.length) {
    taskData.forEach((task) => {
      const newMarker = L.marker(task.latlng, markerOptions);
      newMarker.type = "taskMarker";
      const popupContent = (
        <div className={classes.task}>
          <div className={classes.infoItem}>
            <div className={classes.label}>Task Title</div>
            <div className={classes.content}>{task.title}</div>
          </div>
          I am a popup
        </div>
      );
      newMarker.bindPopup(ReactDOMServer.renderToStaticMarkup(popupContent));
      newMarker.addTo(map);
    });
  }

  return null;
};

export default Markers;
