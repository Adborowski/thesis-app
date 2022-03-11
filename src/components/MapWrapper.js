import classes from "./map.module.css";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";
import Markers from "./Marker/Markers";
import L from "leaflet";
import TaskEditor from "./TaskEditor/TaskEditor";

const MapWrapper = (props) => {
  const db = props.db;
  console.log(db);

  const newMarkerIcon = L.icon({
    iconUrl: "./markers/round-pin-2.svg",
    iconSize: [30, 30], // size of the icon
    shadowSize: [30, 30], // size of the shadow
    iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -30], // point from which the popup should open relative to the iconAnchor
    className: classes.icon,
  });

  const MapInsert = () => {
    // ^ must be a child of MapContainer
    console.log("Map scripts running...");
    const map = useMap();

    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });

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
        console.log(e.latlng);
        console.log("Layers:", map._layers);

        // FUNCTION: CREATE TASK EDITOR (LATLNG)

        // create task editor tooltip with predetermined content from TaskEditor
        const newMarker = L.marker(e.latlng, { icon: newMarkerIcon });
        newMarker.type = "editorMarker";
        newMarker.bindPopup(
          ReactDOMServer.renderToStaticMarkup(<TaskEditor latlng={e.latlng} />)
        );
        newMarker.addTo(map);
        newMarker.openPopup();
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
    <MapContainer
      className={classes.map}
      center={[51.477928, -0.001545]}
      zoom={13}
      tap={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2"
      />
      <MapInsert />
      <Markers db={props.db} />
    </MapContainer>
  );
};

export default MapWrapper;
