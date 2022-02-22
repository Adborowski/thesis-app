import classes from "./map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import MarkerWrapper from "./Marker/MarkerWrapper";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Markers from "./Marker/Markers";

// must be a child of MapContainer
function MapInsert() {
  //
  console.log("Map scripts running...");

  const map = useMapEvents({
    click: (e) => {
      console.log("Click at ", e.latlng);
      const newMarker = L.marker(e.latlng);
      newMarker.addTo(map);
    },

    locationfound: (location) => {
      console.log("location found:", location);
      // map.setView(location.latlng, 13, {});
      //map.flyTo([lat, lng], zoom);
      map.flyTo(location.latlng, 13, {
        animate: true,
        duration: 0.5,
      });
    },

    locationerror: (error) => {
      console.log("LOCATION ERROR", error);
    },
  });

  useEffect(() => {
    map.locate(); // emits locationFound
  }, [map]);

  console.log("map center:", map.getCenter());
  return null;
}

function MapWrapper() {
  return (
    <MapContainer
      className={classes.map}
      center={[51.477928, -0.001545]}
      zoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2"
      />
      <Markers />
      <MapInsert />
    </MapContainer>
  );
}

export default MapWrapper;
