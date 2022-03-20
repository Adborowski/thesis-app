import classes from "./map.module.css";
import {
  MapContainer,
  useMapEvents,
  useMap,
  Marker,
  Popup,
  TileLayer,
  Map,
} from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import Markers from "./Marker/Markers";
import L from "leaflet";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import dummyData from "../db.json";
import React from "react";

const MapWrapper = React.forwardRef((props, ref) => {
  const [taskData, setTaskData] = useState(dummyData); // dummyData has one item and is required
  console.log("taskData at start of MapWrapper", taskData);

  useEffect(() => {
    axios
      .get("https://tiszuk.com/tasks")
      .then(function (response) {
        console.log("axios data:", response);
        setTaskData(response.data);
        console.log("new taskData:", taskData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const icon = L.icon({
    iconUrl: "./markers/round-pin.svg",
    // shadowUrl: 'leaf-shadow.png',
    iconSize: [30, 30], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
  });

  const handleNewMarker = props.handleNewMarker;

  const [isTaskViewOpen, setTaskViewOpen] = useState(false);
  const specialClass = ""; // mapWrapper gets specialClass when it enters Task View

  const newMarkerIcon = L.icon({
    iconUrl: "./markers/round-pin-2.svg",
    iconSize: [30, 30], // size of the icon
    shadowSize: [30, 30], // size of the shadow
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
    className: classes.icon,
  });

  const EditorPopupPanel = () => {
    return (
      <div className={"editorPopup"}>
        <div id="btnOpenEditor" className={"button"}>
          Create Task
        </div>
      </div>
    );
  };

  const MapInsert = () => {
    // ^ must be a child of MapContainer
    console.log("Map scripts running...");
    const map = useMap();
    console.log(map._layers);
    // map.invalidateSize();

    function openTaskModal(latlng) {
      const taskModal = document.getElementById("taskModal");
      taskModal.dataset.lat = latlng.lat;
      taskModal.dataset.lng = latlng.lng;
      taskModal.classList.add("open");
    }

    const addTileLayer = () => {
      new L.tileLayer(
        "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 1,
          maxZoom: 15,
        }
      ).addTo(map);
    };

    // addTileLayer();

    // center view on popup when it opens
    map.on("popupopen", function (e) {
      var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
      px.y -= e.target._popup._container.clientHeight; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      map.panTo(map.unproject(px), { animate: true }); // pan to new center
    });

    map.on("popupclose", function (e) {
      console.log("Popup closed:", e.popup._source);
      if (e.popup._source.type === "editorMarker") {
        e.popup._source.remove();
      }
      console.log("Layers:", map._layers);
    });

    useMapEvents({
      click: (e) => {
        const clickLocation = e.latlng;
        console.log(e.latlng);
        console.log("Layers:", map._layers);

        // FUNCTION: CREATE TASK EDITOR (LATLNG)

        // create task editor tooltip with predetermined content from TaskEditor
        const newMarker = L.marker(e.latlng, { icon: newMarkerIcon });
        newMarker.type = "editorMarker";
        newMarker
          .bindPopup(ReactDOMServer.renderToStaticMarkup(<EditorPopupPanel />))
          .addTo(map)
          .openPopup();
        const btnOpenEditor = document.getElementById("btnOpenEditor");
        console.log(btnOpenEditor);
        btnOpenEditor.addEventListener("click", (e) => {
          openTaskModal(clickLocation);
          handleNewMarker(clickLocation);
        });
      },

      locationfound: (location) => {
        console.log("location found:", location);
        // setUserLocation(location);
        // console.log("User found at location:", userLocation);
      },

      locationerror: (error) => {
        console.log("LOCATION ERROR", error);
      },
    });

    return null;
  };

  return (
    <div className={classes.mapWrapper}>
      <MapContainer
        className={`${classes.map}${specialClass}`}
        center={[51.477928, -0.001545]}
        zoom={13}
        tap={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2"
        />

        <MapInsert />

        <React.Fragment>
          {taskData.map((task) => {
            <Marker
              key={task.id}
              icon={icon}
              position={[51.479785675764, 0.00410292403287]}
            >
              <Popup>Hello I am popup at {task.latlng}</Popup>
            </Marker>;
          })}
        </React.Fragment>
      </MapContainer>
    </div>
  );
});

export default MapWrapper;
