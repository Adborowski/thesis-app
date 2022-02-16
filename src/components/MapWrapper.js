import classes from "./map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerWrapper from "./MarkerWrapper";
import { useState } from "react";
import * as L from "leaflet";

const MapWrapper = () => {
  const mapCenterPosition = [55.676098, 12.568337];
  return (
    //   prettier-ignore
    <div id="map" className={classes.mapWrapper}>
      <MapContainer className={classes.mapContainer} center={mapCenterPosition} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=4a75cf0a5d344e36bb1ebac1821b42e2"
        />
        <MarkerWrapper position={mapCenterPosition} popupContent={"I am a popup"}/>
      </MapContainer>
    </div>
  );
};

export default MapWrapper;
