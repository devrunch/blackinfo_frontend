import { data } from 'autoprefixer';
import React, { useEffect} from 'react'
import ReactMapGl, {Layer, Source } from 'react-map-gl'
import axios from 'axios';
const token = 'pk.eyJ1IjoicW1pbnQiLCJhIjoiY2xzenVzM2h2MHN5aDJpcm9jYzNnbGpkdiJ9.9bKzJSMYZ1u46Twn9Stg-w';
const MAX_ZOOM_LEVEL = 9
const heatmapLayer = {
  id: 'heatmap',
  maxzoom: 0,
  type: 'heatmap',
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    'heatmap-weight': ['interpolate', ['linear'], ['get', 'mag'], 0, 0, 6, 1],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 9],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      'rgb(103,169,207)',
      0.4,
      'rgb(209,229,240)',
      0.6,
      'rgb(253,219,199)',
      0.8,
      'rgb(239,138,98)',
      0.9,
      'rgb(255,201,101)'
    ],
    // Adjust the heatmap radius by zoom level
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, MAX_ZOOM_LEVEL, 20],
    // Transition from heatmap to circle layer by zoom level
    // 'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
  }
};



const heatMap = ({ data,initPos }) => {

  return (
    
    <ReactMapGl
      initialViewState={initPos}
      mapboxAccessToken={token}
      mapStyle={'mapbox://styles/qmint/clt6qqibt002e01qsgzkh1ikk'}
      projection={'globe'}
    >

      {true && (
        <Source type="geojson" data={data}>
          <Layer {...heatmapLayer} />
        </Source>
      )}


    </ReactMapGl>
  )
}

export default heatMap