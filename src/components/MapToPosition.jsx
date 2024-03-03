import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import ReactMapGl, { Marker } from 'react-map-gl'
const token = 'pk.eyJ1IjoicW1pbnQiLCJhIjoiY2xzenVzM2h2MHN5aDJpcm9jYzNnbGpkdiJ9.9bKzJSMYZ1u46Twn9Stg-w';
const TestMap = ({loc,setLoc}) => {
    const [viewport, setViewport] = useState({
        latitude: 28.753017,
        longitude: 77.496814,
        zoom: 12,
    })

    const handleClick = async (e) => {
        // if((e.latlng.lat<=90 || e.latlng.lat>=-90) && (e.latlng.lng<=180 || e.latlng.lng>=-180))
       await setLoc({
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng
        })
        console.log(e.lngLat)
        console.log(loc)
    }
    return (
        <>
            <div style={{ height: "50vh", margin: "2.5rem" }} className='border-4 border-solid border-indigo-900 m-auto '>
                <ReactMapGl
                    initialViewState={viewport}

                    transitonDuration="200"
                    mapboxAccessToken={token}
                    mapStyle={'mapbox://styles/mapbox/streets-v9'}
                    // projection={'streets'}
                    onClick={handleClick}
                    onViewportChange={(viewport) => {setViewport(viewport)}}
                >
                    {loc?
                        <Marker
                            latitude={loc?.latitude}
                            longitude={loc?.longitude}
                            >
                            <div>
                                <FontAwesomeIcon icon={faMapMarkerAlt} color='red' size='2xl'/>
                            </div>
                        </Marker>:null}
                </ReactMapGl>
            </div>
        </>
    )
}

export default TestMap