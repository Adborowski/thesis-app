import { useMap, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import classes from "./Marker.module.css";
import dummyData from "../../db.json";
import TaskPopup from "./TaskPopup";
import axios from "axios";

const Markers = (props) => {
  const [taskData, setTaskData] = useState(props.db);

  // useEffect(() => {
  //   axios
  //     .get("https://tiszuk.com/tasks")
  //     .then(function (response) {
  //       console.log("axios data:", response);
  //       setTaskData(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const icon = L.icon({
    iconUrl: "./markers/round-pin.svg",
    // shadowUrl: 'leaf-shadow.png',
    iconSize: [30, 30], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
  });

  let returnContent = (
    <Marker icon={icon} position={[51.479785675764, 0.00410292403287]}>
      <Popup>DEFAULT</Popup>
    </Marker>
  );

  useEffect(() => {
    console.log("taskData changed at Markers:", taskData);
    setTaskData(taskData);

    returnContent = taskData.map((task) => {
      <Marker icon={icon} position={task.latlng}>
        <Popup>Hello I am popup at {task.latlng}</Popup>
      </Marker>;

      console.log(returnContent);
    });
  }, [taskData]);

  const map = useMap();

  const markerOptions = { icon: icon };

  // hoping to deprecate this
  const refreshMarkers = () => {
    map.eachLayer(function (layer) {
      if (!layer._url) {
        console.log("removing all markers");
        // everything except for the tile layer which has a _url
        map.removeLayer(layer);
      }
    });

    if (Object.keys(map._layers).length !== taskData.length) {
      taskData.forEach((task) => {
        const newMarker = L.marker(task.latlng, markerOptions);
        newMarker.type = "taskMarker";
        const popupContent = (
          <div className={classes.taskMarker}>
            <div className={classes.mediaGallery}>
              <img
                className={classes.mediaItem}
                src={"/img/" + task.media[0]}
                alt={"Content of the task"}
              ></img>
            </div>

            <div className={classes.infoItems}>
              <div className={classes.infoItem}>
                <div className={classes.label}>Title</div>
                <div className={classes.content}>{task.title}</div>
              </div>
              <div className={classes.infoItem}>
                <div className={classes.label}>Description</div>
                <div className={classes.content}>{task.description}</div>
              </div>
              <div className={classes.infoItem}>
                <div className={classes.label}>Reward</div>
                <div className={classes.content}>{task.reward}</div>
              </div>
            </div>

            <div className={classes.controls}>
              <div className={classes.button}>SOLVE</div>
            </div>
          </div>
        );
        newMarker.bindPopup(ReactDOMServer.renderToStaticMarkup(popupContent));
        newMarker.addTo(map);
      });
    }
  };

  return taskData.map((task) => {
    <Marker icon={icon} position={[51.479785675764, 0.00410292403287]}>
      <Popup>Hello I am popup at {task.latlng}</Popup>
    </Marker>;
  });
};

export default Markers;
