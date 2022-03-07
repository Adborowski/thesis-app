import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

  console.log(taskData);

  taskData.forEach((task) => {
    const newMarker = L.marker(task.latlng, markerOptions);
    const popupContent = <h1>I am a popup</h1>;
    const newPopup = L.popup(popupContent);
    newMarker.bindPopup(newPopup);
    newMarker.addTo(map);
  });

  return null;
};

export default Markers;
