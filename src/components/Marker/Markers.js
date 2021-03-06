import { useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import classes from "./Marker.module.css";
import Icon from "../Icons/Icon";

const Markers = (props) => {
  const map = useMap();

  const [taskData, setTaskData] = useState(props.taskData);

  useEffect(() => {
    if (taskData != props.taskData) {
      setTaskData(props.taskData);
    }
  }, [props]);

  const setPopupEvents = (e) => {
    // only for existing tasks, not the task editor
    if (e.target._popup._source.type === "taskMarker") {
      const btnClose = document.getElementById("btnClose");
      const btnSolve = document.getElementById("btnSolve");

      btnClose.addEventListener("click", () => {
        map.closePopup();
      });

      btnSolve.addEventListener("click", (e) => {
        const taskId = parseInt(e.target.dataset.markerid);
        map.closePopup();
        props.openTaskSolver(taskId);
      });
    }
  };

  map.on("popupopen", function (e) {
    setPopupEvents(e);
  });

  const refreshMarkers = () => {
    map.eachLayer(function (layer) {
      if (!layer._url) {
        // everything except for the tile layer which has a _url
        map.removeLayer(layer);
      }
    });

    if (Object.keys(map._layers).length < 2) {
      // 2 dummies
      taskData.forEach((task) => {
        const newMarker = L.marker(task.latlng, { icon: Icon() });
        newMarker.type = "taskMarker";
        const popupContent = (
          <div className={classes.taskMarker}>
            <div className={classes.mediaGallery}>
              <div
                key={"lol"}
                style={{
                  backgroundImage: `url("data:image/jpeg;base64,${task.media[0]}")`,
                }}
                className={"taskMediaItem"}
              ></div>
            </div>

            <div className={classes.infoItems}>
              <div className={classes.infoItem}>
                <div className={"label"}>Title</div>
                <div className={classes.content}>{task.title}</div>
              </div>

              <div className={classes.infoItem}>
                <div className={"label"}>Reward</div>
                <div className={classes.content}>{task.reward}</div>
              </div>
            </div>

            <div className={classes.controls}>
              <div
                id={"btnSolve"}
                className={classes.button}
                data-markerid={task.id}
              >
                SOLVE
              </div>

              <div
                id={"btnClose"}
                className={`${classes.button} ${classes.btnClose}`}
              >
                CLOSE
              </div>
            </div>
          </div>
        );
        newMarker.bindPopup(ReactDOMServer.renderToStaticMarkup(popupContent));
        newMarker.addTo(map);
      });
    }
  };

  refreshMarkers(); // initial

  return null;
};

export default Markers;
