import classes from "./map.module.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import Markers from "./Marker/Markers";
import TaskEditor from "./TaskEditor/TaskEditor";

const MapWrapper = (props) => {
  const db = props.db;

  const onEditorOpened = () => {
    console.log("editor opened");
  };

  const [isEditorOpen, setIsEditorOpen] = useState();
  const [userLocation, setUserLocation] = useState();
  // prettier-ignore
  let [taskEditorLocation, setTaskEditorLocation] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    console.log(mapRef);
  }, [mapRef]);

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
      <TaskEditor latlng={taskEditorLocation} onEditorOpened={onEditorOpened} />
    </MapContainer>
  );
};

export default MapWrapper;
