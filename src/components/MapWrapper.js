import classes from "./map.module.css";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import Markers from "./Marker/Markers";
import TaskEditor from "./TaskEditor/TaskEditor";
import L from "leaflet";

const MapWrapper = (props) => {
  const db = props.db;
  console.log(db);

  const newMarkerIcon = L.icon({
    iconUrl: "./markers/round-pin-2.svg",
    iconSize: [30, 30], // size of the icon
    shadowSize: [30, 30], // size of the shadow
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
    className: classes.icon,
  });

  const onEditorOpened = () => {
    console.log("editor opened");
  };

  const onCloseEditorClick = (e) => {
    console.log(e.target.parentElement.parentElement.leafletElement);
    // setTaskEditorLocation(null);
  };

  const isEditorOpen = (map) => {
    console.log("IS EDITOR OPEN?");
    map.eachLayer((layer) => {
      if (layer.type === "editorMarker") {
        return true;
      } else {
        return false;
      }
    });
  };

  // const [isEditorOpen, setIsEditorOpen] = useState();
  const [userLocation, setUserLocation] = useState();
  // prettier-ignore
  let [taskEditorLocation, setTaskEditorLocation] = useState(null);

  const MapInsert = () => {
    // ^ must be a child of MapContainer
    console.log("Map scripts running...");

    const map = useMap();

    // report all layers on every redraw
    useEffect(() => {
      console.log(map._layers);
      map.eachLayer(function (layer) {
        console.log(layer);
      });
    }, []);

    useMapEvents({
      click: (e) => {
        console.log(e.latlng);
        console.log("Layers:", map._layers);
        // check if there is already a tooltip open

        // create task editor tooltip with predetermined content
        const newMarker = L.marker(e.latlng, { icon: newMarkerIcon });

        map.eachLayer((layer) => {
          if (layer.type === "editorMarker") {
            layer.remove();
          }
        });

        newMarker.type = "editorMarker";
        const newPopup = L.popup();
        newPopup.type = "editorPopup";
        newPopup.bindPopup(newMarker);
        newMarker.addTo(map);
        console.log("New Popup: ", newPopup);
      },
      locationfound: (userLocation) => {
        console.log("location found:", userLocation);
        setUserLocation(userLocation);
      },

      locationerror: (error) => {
        console.log("LOCATION ERROR", error);
      },
    });

    console.log("map center:", map.getCenter());
    return null;
  };

  return (
    <MapContainer
      className={classes.map}
      center={[51.477928, -0.001545]}
      zoom={13}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2"
      />
      <Markers db={db} />
      <MapInsert />
      <TaskEditor
        latlng={taskEditorLocation}
        onEditorOpened={onEditorOpened}
        onCloseEditorClick={onCloseEditorClick}
      />
    </MapContainer>
  );
};

export default MapWrapper;
