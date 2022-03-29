import { useMap, Marker } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import classes from "./Marker.module.css";
import dummyData from "../../db.json";
import Icon from "../Icons/Icon";

const Markers = (props) => {
  // localStorage.setItem("taskData", false);
  const map = useMap();

  const getLocalData = () => {
    if (localStorage.getItem("taskData")) {
      const localData = JSON.parse(localStorage.getItem("taskData"));
      return localData;
    } else {
      return false;
    }
  };

  const [taskData, setTaskData] = useState(dummyData);

  useEffect(() => {
    console.log("new props", props.taskData);

    if (getLocalData()) {
      // get localStorage data if available
      setTaskData(getLocalData());
    }

    if (getLocalData() != props.taskData) {
      // only update if local data different
      setTaskData(props.taskData);
      const newLocalData = JSON.stringify(props.taskData);
      localStorage.setItem("taskData", newLocalData);
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

      btnSolve.addEventListener("click", () => {
        console.log("Solving task...");
      });
    }
  };

  map.on("popupopen", function (e) {
    console.log(e.target._popup._source);
    console.log(e.target._popup._source.type);
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
      taskData.forEach((task) => {
        const newMarker = L.marker(task.latlng, { icon: Icon() });
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
              <div id={"btnSolve"} className={classes.button}>
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
