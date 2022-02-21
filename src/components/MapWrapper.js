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

const center = [51.505, -0.09];
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
];

function MapInsert() {
  const map = useMap();
  console.log("map center:", map.getCenter());
  return null;
}

function MapWrapper() {
  return (
    <MapContainer className={classes.map} center={[50.5, 30.5]} zoom={13}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer
          checked
          name="OpenStreetMap.Mapnik"
        ></LayersControl.BaseLayer>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl>
      <MapInsert />
    </MapContainer>
  );
}

export default MapWrapper;
