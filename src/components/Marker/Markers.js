import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import classes from "./Marker.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Markers = (props) => {
  const [taskData, setTaskData] = useState(props.db);

  const fetchTaskData = () => {
    console.log("Fetching data...");
    axios
      .get("https://tiszuk.com/tasks")
      .then((res) => {
        console.log("...data received from API", res.data);
        if (taskData[0].type === "dummy") {
          // detect dummy fallback
          setTaskData(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

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

  useEffect(() => {
    fetchTaskData();
    refreshMarkers(taskData);
  }, [taskData]);

  const refreshMarkers = (taskData) => {
    console.log("Refreshing markers", taskData);
    // only add the markers to map if the map has a different number than the data received
    // this is done to prevent marker duplication
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

  return null;
};

export default Markers;
