/* Importamos lo necesario para un mapa de Guatemala */
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'; 

const Map = ({ setView }) => {
  return (
    <div className="map-wrapper">
      <div className="map-container">
        <MapContainer center={[15.7835, -90.2308]} zoom={7} style={{ height: '50vh', width: '50vw' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
