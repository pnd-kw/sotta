/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function LeafletMap() {
  const markerPosition = [-7.83056, 110.40028];

  return (
    <MapContainer
      center={markerPosition}
      zoom={16} // zoom lebih tinggi untuk ketepatan
      scrollWheelZoom={false}
      className="md:w-[40vw] md:h-[40vh] w-[90vw] h-[40vh]"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={markerPosition}>
        <Popup>Bumen No.536, Purbayan, Kotagede</Popup>
      </Marker>
    </MapContainer>
  );
}
