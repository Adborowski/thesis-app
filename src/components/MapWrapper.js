import classes from "./map.module.css";
import { MapContainer, useMapEvents, useMap } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import Markers from "./Marker/Markers";
import L from "leaflet";
import { useState, useEffect } from "react";
import axios from "axios";
import dummyData from "../db.json";
import { Link } from "react-router-dom";

const MapWrapper = (props) => {
  const [markerData, setMarkerData] = useState(dummyData);

  // Make a request for a user with a given ID
  useEffect(() => {
    console.log("markerData state", markerData);

    axios
      .get("https://tiszuk.com/tasks")
      .then(function (response) {
        console.log("axios data:", response);
        setMarkerData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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

  // prettier-ignore
  const EditorPopupPanel = () => {
    return (
      <div className={"editorPopup"}>
        <div id="btnOpenEditor" className={"button"}>Create Task</div>
      </div>
    );
  };

  const MapInsert = () => {
    // ^ must be a child of MapContainer
    console.log("Map scripts running...");
    const map = useMap();
    map.invalidateSize();

    const createEditorPopup = (latlng) => {
      const newMarker = L.marker(latlng, { icon: newMarkerIcon });
      newMarker.type = "editorMarker";
      newMarker
        .bindPopup(ReactDOMServer.renderToStaticMarkup(<EditorPopupPanel />))
        .addTo(map)
        .openPopup();
      const btnOpenEditor = document.getElementById("btnOpenEditor");
      console.log(btnOpenEditor);
      btnOpenEditor.addEventListener("click", (e) => {
        props.openTaskModal(latlng);
      });
    };

    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });

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

    addTileLayer();

    // center view on popup when it opens
    map.on("popupopen", function (e) {
      console.log("Firing popupopen", e);
      console.log(e.target._popup._latlng);
      var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
      px.y -= e.target._popup._container.clientHeight; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      // px.x -= e.target._popup._container.clientWidth / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location

      map.panTo(map.unproject(px), { animate: true }); // pan to new center
      console.log("Layers:", map._layers);
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
        createEditorPopup(e.latlng);
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
        <MapInsert />
        <Markers db={markerData} />
      </MapContainer>
    </div>
  );
};

export default MapWrapper;
