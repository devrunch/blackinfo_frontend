import Heatmap from './heatMap.jsx';
import ClusterMap from './clusterMap.jsx';
import React, { useEffect, useState } from 'react'
import ReactMapGl, { Marker, Layer, Source } from 'react-map-gl'
import { useParams } from 'react-router-dom';
const token = 'pk.eyJ1IjoicW1pbnQiLCJhIjoiY2xzenVzM2h2MHN5aDJpcm9jYzNnbGpkdiJ9.9bKzJSMYZ1u46Twn9Stg-w';

const AccidentAnalysis = () => {
    const params = useParams()
    const loc = params.loc.split(':').map((i) => parseFloat(i))
    console.log(loc)
    const [viewport, setViewport] = useState({
        latitude: loc[0],
        longitude: loc[1],
        zoom: 12,
    })
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {

            setViewport({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 12,
            })
            console.log(viewport)
        })
    }, [])

    return (
        <>
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Blackspot Analysis Result</h1>
                <p className="text-xl text-gray-900"></p>
            </div>
            <div className='flex w-full justify-around mb-14 h-[550px]'>
                <div className='w-[40%] h-[500px]'>
                    <h1 className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Heatmap</h1>

                    <Heatmap />
                </div>
                <div className='w-[40%] h-[500px]'>
                    <h1 className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Cluster Map</h1>

                    <ClusterMap />
                </div>
            </div>
            <div className='flex flex-wrap m-16 mt-11 max-w-3xl  text-center pb-12 md:pb-16'>
                <div>
                    <div>
                        <h1 className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Accident Analysis</h1>

                    </div>
                    <div className='ml-16 mt-10'>
                        <h2 className='text-3xl text-gray-800 font-bold text-left'>Accident Data</h2>
                        <ul className='text-2xl text-gray-800 font text-left ml-5' >
                            <li><span>City Of accident</span></li>
                            <li><span>State:</span></li>
                            <li><span>No of Fatalities(hospitalised)</span></li>
                            <li><span>No of Fatalities(hospitalised)</span></li>
                            <li><span>Severity</span></li>
                        </ul>
                    </div>

                </div>

                <div className='flex flex-wrap mt-11 max-w-3xl  text-center pb-12 md:pb-16'>
                   <h1 className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Accident Analysis II</h1>
                        
                </div>

            </div>

            
        </>
    )
}

export default AccidentAnalysis