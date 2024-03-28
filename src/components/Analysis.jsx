import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import ReactMapGl, { Marker } from 'react-map-gl'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const token = 'pk.eyJ1IjoicW1pbnQiLCJhIjoiY2xzenVzM2h2MHN5aDJpcm9jYzNnbGpkdiJ9.9bKzJSMYZ1u46Twn9Stg-w';
const TestMap = () => {
  const navigate = useNavigate()
  const [viewport, setViewport] = useState({
    latitude: 28.753017,
    longitude: 77.496814,
    zoom: 12,
  })
  const [data, setData] = useState(null)
  const [activeAccident, setActiveAccident] = useState(null)
  const [activeLoacation, setActiveLocation] = useState({
    latitude: 0,
    longitude: 0
  })
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACK_URL}/api/form/getaccidents/` + localStorage.getItem('token'), { crossdomain: true })
      .then(res => {
        setData(res.data.message)
        console.log(data)
      })
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {

      setViewport({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12,
      })
    })
  }, [])
  return (
    <>
      <div className='flex h-max justify-evenly items-center align-middle flex-wrap'>

        <div className='w-full lg:w-2/5 p-4'>
          <h1 className='text-4xl text-gray-950 mb-5 font-bold '>Select a location on a Map</h1>
          <p className='text-lg text-gray-900 mb-5'>
            Choose a spot on the map to start the analysis on the accident data for that area.
            It will provide you with the data of the accidents that have occurred in that area.
            And the counter measures that can be taken to prevent such accidents in the future.
          </p>

          {activeAccident ? <>
            <div className='text-gray-900'>
              <p className='mb-2'><span className='font-bold mr-4 '>Coordinates: </span>{activeLoacation.latitude + ":" + activeLoacation.longitude}</p>
              <p className='mb-2'><span className='font-bold mr-4 '>Coordinates: </span>{`${activeAccident.location.coordinates[1]}:${activeAccident.location.coordinates[0]}`}</p>
              <p className='mb-2'><span className='font-bold mr-4 '>Accident date : </span>{activeAccident.dateOfAccident}</p>
              <p className='mb-2'><span className='font-bold mr-4 '>Fatalities : </span>{activeAccident.noOfFatalities}</p>
              <p className='mb-2'><span className='font-bold mr-4 '>Road Name : </span>{activeAccident.roadName}</p>
              <p className='mb-2'><span className='font-bold mr-4 '>Weather during Accident : </span>{activeAccident.typeOfWeather}</p>
              <p className='mb-2'><span className='font-bold mr-4 '>Type of area : </span>{activeAccident.typeOfArea}</p>
            </div>
           </>
            :
            <>
              <div className='text-gray-900'>
                <p className='mb-2'><span className='font-bold mr-4 '>Coordinates: </span>{activeLoacation.latitude + ":" + activeLoacation.longitude}</p>
              </div>
            </>
          }
          {
            activeLoacation.latitude !== 0 && activeLoacation.longitude !== 0 ?
            <>
            <br/>
            <br/>
              <button className='m-16 text-gray-100 bg-gray-700 px-8 py-2 rounded-md sm:m-auto ' onClick={() => navigate('/analysis/' + activeLoacation.latitude + ":" + activeLoacation.longitude)} >Analyze this location</button>
            </>
              :
              <>
              <button className='text-gray-100 bg-gray-700 px-8 py-2 rounded-md sm:m-auto' onClick={() => console.log(data)} disabled>Choose a location</button>
              </>
          }
        </div>

        <div className='border-4 border-solid border-gray-900 lg:w-1/2 sm:w-full w-full  h-[400px]  m-3'>
          <ReactMapGl
            initialViewState={viewport}
            mapboxAccessToken={token}
            mapStyle={'mapbox://styles/mapbox/streets-v9'}
            projection={'globe'}
            onClick={
              (e) => {
                setActiveLocation({
                  latitude: e.lngLat.lat,
                  longitude: e.lngLat.lng
                })
              }
            }
            onViewportChange={(viewport) => {
              setViewport(viewport);
            }}
          >
            <Marker
              latitude={activeLoacation.latitude}
              longitude={activeLoacation.longitude}
            >
              <div>
                <FontAwesomeIcon icon={faMapMarkerAlt} color='purple' size='2xl' />
              </div>
            </Marker>
            <Marker
              latitude={viewport.latitude}
              longitude={viewport.longitude}
              offsetLeft={-20}
              offsetTop={-10}
              onClick={() => console.log('You are here')}
            >
              <div>
                <FontAwesomeIcon icon={faMapMarkerAlt} color='Green' size='2xl' />
              </div>
            </Marker>
            {
              data && data.map((val, i) => {

                return <Marker
                  latitude={val.location.coordinates[1]}
                  longitude={val.location.coordinates[0]}
                  offsetLeft={-20}
                  offsetTop={-10}
                  onClick={() => setActiveAccident(val)}
                >
                  <div>
                    <FontAwesomeIcon icon={faMapMarkerAlt} color='red' size='2xl' />
                  </div>
                </Marker>

              })
            }

          </ReactMapGl>
        </div>

      </div>

    </>
  )
}

export default TestMap