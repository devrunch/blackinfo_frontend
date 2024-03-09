import React, { useRef } from 'react'
import { Map, Source, Layer } from 'react-map-gl';
const MAPBOX_TOKEN="pk.eyJ1IjoicW1pbnQiLCJhIjoiY2xzenVzM2h2MHN5aDJpcm9jYzNnbGpkdiJ9.9bKzJSMYZ1u46Twn9Stg-w"
const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
    }
};

const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'earthquakes',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
    }
};

const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'earthquakes',
    filter: ['!', ['has', 'point_count']],
    paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff'
    }
};

const clusterMap = ({clusterData , initPos}) => {

    const mapRef = useRef(null);

    const onClick = event => {
        const feature = event.features[0];
        const clusterId = feature.properties.cluster_id;

        const mapboxSource = mapRef.current.getSource('earthquakes');
        console.log(mapboxSource)
        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
                return;
            }

            mapRef.current.easeTo({
                center: feature.geometry.coordinates,
                zoom,
                duration: 500
            });
        });
    };


    return (
        <Map
            initialViewState={initPos}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
            interactiveLayerIds={[clusterLayer.id]}
            onClick={onClick}
            ref={mapRef}
        >
            <Source
                id="earthquakes"
                type="geojson"
                data={clusterData}
                cluster={true}
                clusterMaxZoom={14}
                clusterRadius={50}
            >
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} />
                <Layer {...unclusteredPointLayer} />
            </Source>
        </Map>
    )
}

export default clusterMap