import classes from "./map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  LayerGroup,
  LayersControl,
} from "react-leaflet";
import MarkerWrapper from "./MarkerWrapper";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapInsert() {
  console.log("MapInsert running");
  const map = useMapEvents({
    load: () => {
      console.log("map loaded");
      map.locate();
    },
    click: () => {
      map.locate();
    },
    locationfound: (location) => {
      console.log("location found:", location);
      map.fitBounds(location.bounds);
    },
    locationerror: (error) => {
      console.log("ERROR", error);
    },
  });
  console.log("map center:", map.getCenter());
  return null;
}

// https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2

function MapWrapper() {
  return (
    <MapContainer className={classes.map} center={[50.5, 30.5]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2"
      />
      <MapInsert />
    </MapContainer>
  );
}

export default MapWrapper;
