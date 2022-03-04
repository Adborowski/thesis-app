import classes from "./map.module.css";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Tooltip,
} from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import Markers from "./Marker/Markers";
import TaskEditor from "./TaskEditor/TaskEditor";
import L from "leaflet";

const MapWrapper = (props) => {
  const icon = L.icon({
    iconUrl: "./markers/round-pin-2.svg",
    // shadowUrl: 'leaf-shadow.png',
    iconSize: [30, 30], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
    className: classes.icon,
  });
  const db = props.db;

  const onEditorOpened = () => {
    console.log("editor opened");
  };

  const onCloseEditorClick = () => {
    console.log("!");
    setTaskEditorLocation(null);
  };

  const [isEditorOpen, setIsEditorOpen] = useState();
  const [userLocation, setUserLocation] = useState();
  // prettier-ignore
  let [taskEditorLocation, setTaskEditorLocation] = useState(null);

  const MapInsert = () => {
    // ^ must be a child of MapContainer
    console.log("Map scripts running...");

    const map = useMapEvents({
      click: (e) => {
        if (!userLocation) {
          // map.locate();
        }

        // console.log("Click at ", e.latlng);

        if (!taskEditorLocation) {
          setTaskEditorLocation(e.latlng);
        }
      },

      locationfound: (userLocation) => {
        console.log("location found:", userLocation);
        setUserLocation(userLocation);
        map.setView(userLocation.latlng, 13, {});
      },

      locationerror: (error) => {
        console.log("LOCATION ERROR", error);
      },
    });

    useEffect(() => {
      // map.locate(); // emits locationFound
      console.log("map effect");
    }, [map]);

    console.log("map center:", map.getCenter());
    return null;
  };

  const tooltipRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    console.log(tooltipRef);
  }, [tooltipRef]);

  useEffect(() => {
    console.log(markerRef);
  }, [markerRef]);
  //
  return (
    <MapContainer
      className={classes.map}
      center={[51.477928, -0.001545]}
      zoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2"
      />
      <Markers />

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
