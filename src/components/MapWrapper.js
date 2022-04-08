import classes from "./MapWrapper.module.css";
import { MapContainer, useMapEvents, useMap } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import Markers from "./Marker/Markers";
import L from "leaflet";
import EditorIcon from "./Icons/EditorIcon";
import { useState, useEffect } from "react";

const MapWrapper = (props) => {
  const specialClass = ""; // mapWrapper gets specialClass when it enters Task View

  // prettier-ignore
  // the popup which contains controls for a new marker. Opens when user clicks on empty spot on map. Only takes simple static JS.
  const EditorPopupPanel = () => {
    return (
      <div className={"editorPopup"}>
        <div id="btnOpenEditor" className={"button"}>Create Task</div>
      </div>
    );
  };

  // MapInsert contains scripts which need to run with access to the map reference via useMap hook
  // such scripts must be run from a child of MapContainer
  const MapInsert = () => {
    // ^ must be a child of MapContainer
    const map = useMap();

    const mapDefaultCenter = [51.477928, -0.001545];
    const [mapCenter, setMapCenter] = useState(mapDefaultCenter);

    useEffect(() => {
      // bugfix: on every redraw, fake a click on the map
      // to ensure it is in focus and there is no need
      // to click twice
      var evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 20,
      });
      map._container.dispatchEvent(evt);
    }, [map]);

    const createEditorPopup = (latlng) => {
      const newMarker = L.marker(latlng, { icon: EditorIcon() });
      newMarker.type = "editorMarker";
      newMarker
        .bindPopup(
          ReactDOMServer.renderToStaticMarkup(
            <EditorPopupPanel className={"editorPopup"} />
          )
        )
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
          maxZoom: 20,
        }
      ).addTo(map);
    };

    addTileLayer();

    // center view on popup when it opens
    map.on("popupopen", function (e) {
      console.log("popupopen");
      var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
      px.y -= e.target._popup._container.clientHeight; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      map.panTo(map.unproject(px), { animate: true }); // pan to new center
    });

    map.on("popupclose", function (e) {
      console.log("popupclose");
      if (e.popup._source.type === "editorMarker") {
        e.popup._source.remove();
      }
    });

    useMapEvents({
      load: (e) => {
        console.log("LOADED");
      },

      blur: (e) => {
        // console.log("BLURRED", e);
      },

      focus: (e) => {
        // console.log("FOCUSED", e);
      },

      click: (e) => {
        console.log(e);
        createEditorPopup(e.latlng);
      },

      locationfound: (location) => {
        console.log("location found:", location);
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
        tabindex={"5"}
        id={"map"}
      >
        <MapInsert />
        <Markers
          taskData={props.taskData}
          openTaskSolver={props.openTaskSolver}
        />
      </MapContainer>
    </div>
  );
};

export default MapWrapper;
