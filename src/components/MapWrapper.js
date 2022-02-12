import classes from "./map.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import * as L from "leaflet";

const MapWrapper = () => {
  return (
    //   prettier-ignore
    <div id="map" className={classes.mapWrapper}>
      <MapContainer className={classes.mapContainer} center={[51.505, -0.09]} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=Wh7jInITDzesQG1mIvA5f9mYRxjOcX91ocXHKpsXuPmsEpehMXWOfCEmzCaINJHd"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapWrapper;
