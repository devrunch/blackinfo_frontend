import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const LocationFinderMap = () => {
    const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);

  const LocationMarker = () => {
    useMapEvents({
      click(event) {
        setMarkerPosition([event.latlng.lat, event.latlng.lng]);
        console.log(markerPosition)
      },
    });

    return markerPosition === null ? null : (
        <Marker position={markerPosition}>
          <Popup>You clicked here</Popup>
        </Marker>
      );
    }
  return (
    <div style={{ height: '400px', width: '100%', position: 'relative' }}>
      <MapContainer style={{ height: '100%', width: '100%' }} center={[0, 0]} zoom={2} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
      {markerPosition && (
        <div className="location-info-box">
          Latitude: {markerPosition[0].toFixed(4)}, Longitude: {markerPosition[1].toFixed(4)}
        </div>
      )}
    </div>
  );
};

export default LocationFinderMap;
