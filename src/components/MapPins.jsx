import React from 'react';
import { Map, Marker } from 'react-map-gl';


const MapWithPins = ({ locations }) => {
  const [viewport, setViewport] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    zoom: 12,
  });

  return (
    <Map
      {...viewport}
      width="100%"
      height="500px"
      mapboxAccessToken='sk.eyJ1IjoicW1pbnQiLCJhIjoiY2xzenY1dzlvMHF0MDJrbG8xd25pcDR5OSJ9.EuvNYFF-p5uK1l8Tofl_Zg'
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {locations.map((location, index) => (
        <Marker
          key={index}
          latitude={location.latitude}
          longitude={location.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div>
            <p>{location.title}</p>
          </div>
        </Marker>
      ))}
    </Map>
  );
};

export default MapWithPins;