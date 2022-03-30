import { useEffect, useState } from "react";
import classes from "./Minimap.module.css";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";

const Minimap = (props) => {
  const [taskLatlng, setTaskLatlng] = useState();

  const icon = props.icon();
  console.log(icon);

  useEffect(() => {
    console.log("Minimap Props", props);
    if (props.taskLatlng) {
      setTaskLatlng(props.taskLatlng);
    }
  }, [props]);

  const MapScript = () => {
    const map = useMap();

    useEffect(() => {
      if (props.taskLatlng) {
        map.panTo(props.taskLatlng);
      }
    }, [props]);
    return null;
  };

  if (taskLatlng) {
    return (
      <div className={classes.miniMapWrapper}>
        <MapContainer
          className={classes.miniMap}
          center={taskLatlng}
          zoom={17}
          tap={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2"
          />
          <MapScript />
          <Marker icon={props.icon()} position={taskLatlng} />
        </MapContainer>
      </div>
    );
  } else {
    return <p>map loading...</p>;
  }
};

export default Minimap;
