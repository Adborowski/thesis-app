import classes from "./SolveEditor.module.css";
import { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "../Icons/Icon";

const SolveEditor = (props) => {
  const [taskToSolve, setTaskToSolve] = useState(props.task);
  const MapScript = () => {
    const map = useMap();

    useEffect(() => {
      console.log("new taskLatLng", props.task.latlng);
      map.panTo(props.task.latlng);
    }, [props]);

    return null;
  };
  useEffect(() => {
    console.log(props);
  }, [props]);
  if (props.task) {
    return (
      <div className={classes.SolveEditor}>
        <Nav />
        <h1 className={classes.header}>Solve Task</h1>

        <div className={classes.miniMapWrapper}>
          <MapContainer
            className={classes.miniMap}
            center={props.task.latlng}
            zoom={17}
            tap={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2"
            />
            <MapScript />
            <Marker icon={Icon()} position={props.task.latlng} />
          </MapContainer>
        </div>

        <div className={classes.controls}></div>
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
};

export default SolveEditor;
