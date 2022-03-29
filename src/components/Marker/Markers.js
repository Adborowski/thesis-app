import { useMap, Marker } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReactDOMServer from "react-dom/server";
import classes from "./Marker.module.css";
import dummyData from "../../db.json";
import Icon from "../Icons/Icon";

const Markers = (props) => {
  const taskData = props.db;
  console.log("TASKDATA AT MARKERS:", taskData);

  const map = useMap();

  const refreshMarkers = () => {
    map.eachLayer(function (layer) {
      if (!layer._url) {
        // everything except for the tile layer which has a _url
        map.removeLayer(layer);
      }
    });

    if (Object.keys(map._layers).length < 2) {
      taskData.forEach((task) => {
        console.log("LOADING TASK:", task.latlng);
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
              <div className={classes.button}>SOLVE</div>
              <div className={`${classes.button} ${classes.btnClose}`}>
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
