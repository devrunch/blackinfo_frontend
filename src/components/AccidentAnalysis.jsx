import Heatmap from './heatMap.jsx';
import ClusterMap from './clusterMap.jsx';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './analysis.css'
const token = 'pk.eyJ1IjoicW1pbnQiLCJhIjoiY2xzenVzM2h2MHN5aDJpcm9jYzNnbGpkdiJ9.9bKzJSMYZ1u46Twn9Stg-w';

let dat = {
    "type": "FeatureCollection",
    "crs": {
        "type": "name",
        "properties": {
            "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
    },
    "features": []
}
const questions = [
    "The first principles are not for a priority junction or for a roundabout or for signal controlled junction catered in the layout design",
    "Vertical and horizontal alignment are not adequate in respect of broken back curves and for change of grade in vertical alignment",
    "Visibility funnel are not encumbrance free",
    "Lane widths are not adequate (turning lanes: minimum 3.0 m; other lanes: minimum 3.25 m)",
    "Facilities are not adequate for pedestrians",
    "Pedestrian crossings can not be relocated/repainted",
    "The road signs are not adequate in terms of their message, size, placement, or conformity to specification of materials used",
    "The signals are not adequate in terms of their placement, conformity, number of signal heads, or timing",
    "Road markings are not adequate in terms of type, clarity and location",
    "Traffic is not properly channelized to minimize the occurrence of accidents",
    "Night-time accidents represent a considerable proportion of the total number of accidents, The street is not lighting or the number of reflectors are not adequate",
    "Parking are not arrangements adequate",
    "The bus stops are not located in a safe place",
    "The road geometry does not encourage safe speeds",
    "The road surface is not adequate ,It drain properly",
    "There obstructions are not in the road or close to the edge",
    "In bridge approach is not provided with adequate marking to make the vehicle to align well ahead in the approach itself within the available carriageway width of the bridge"
];

const OperationalQuestions = [
    "The driver's view is of other vehicles/pedestrians obstructed?",
    "Drivers respond incorrectly to signals, signs, or other control devices",
    "Drivers have trouble understanding and finding the correct path through the location",
    "There hidden hazards are such as a sharp bend beyond a crest",
    "There hazards are that vehicle approaching junction cannot see each other?",
    "Vehicle speeds are excessive for this situation? Are there speed differences? If yes, in which driving direction?",
    "Parking or other traffic regulations are regularly violated?",
    "Vehicles are delayed, The delays can be reduced",
    "There traffic flow are deficiencies or traffic conflict patterns associated with turning movements",
    "One-way operation would make the location safer",
    "The traffic volume is causing problems. There sufficient gaps are in the main road traffic to enable drivers from side roads to enter the main road without excessive delay",
    "There sufficient gaps are in the traffic to enable pedestrians to cross the road without excessive delay",
    "Pedestrians crossing are the road at the safest places. They can see whether it is safe to cross",
    "There is need for effective/selective enforcement or effective/selective maintenance.",
    "Buses and bus passengers are using the facilities that have been provided for them."
];
let sent = true
const AccidentAnalysis = () => {
    const [nearAccidents, setNearAccidents] = useState()
    const [investigations, setInvestigations] = useState(null)
    const [analysis, setAnalysis] = useState()
    const params = useParams()
    const loc = params.loc.split(':').map((i) => parseFloat(i))
    console.log(loc)
    const [viewport, setViewport] = useState({
        latitude: loc[0],
        longitude: loc[1],
        zoom: 12,
    })

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACK_URL}/api/form/getaccidents/` + localStorage.getItem('token'), { crossdomain: true })
            .then(res => {
                let temp = res.data.message
                temp.map((val, index) => {
                    dat.features.push({
                        "type": "Feature",
                        "properties": {
                            "mag": 1,
                            "time": 1507425650893,
                            "felt": null,
                            "tsunami": 0
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                val.location.coordinates[0],
                                val.location.coordinates[1],
                                -11100.00
                            ]
                        }
                    });
                })
            })
    }, []);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACK_URL}/api/form/getnearlocations/${loc[0]}/${loc[1]}`, { crossdomain: true })
            .then(res => {
                setNearAccidents(res.data.message)
                if (res.data.message.length != 0)
                    setInvestigations(res.data.investigations)
                console.log(res.data.investigations)
            }).catch(err => console.log(err))
        if (sent) {
            sent = false
            axios.get(`${import.meta.env.VITE_BACK_URL}/api/form/getanalysis/${loc[0]}/${loc[1]}`, { crossdomain: true })
                .then(res => {
                    setAnalysis(res.data.message)
                }).catch(err => console.log(err))
        }
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

                    <Heatmap initPos={viewport} data={dat} />
                </div>
                <div className='w-[40%] h-[500px]'>
                    <h1 className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Cluster Map</h1>

                    <ClusterMap initPos={viewport} clusterData={dat} />
                </div>
            </div>
            <div className='flex flex-wrap m-16 mt-11 max-w-3xl  text-center pb-12 md:pb-16'>
                <div>
                    <div>
                        <h1 className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Accident Analysis</h1>

                    </div>
                    <div className='ml-16 mt-10'>
                        <h2 className='text-3xl text-gray-800 font-bold text-left mb-10'>Accident Data</h2>
                        {nearAccidents && nearAccidents.map((val, ind) => {
                            return <div className='bg-white rounded-md w-[900px]' key={ind}>
                                <div className=' flex gap-5 w-full border-b py-6'>
                                    <div className=' text-left  gap-10 rounded p-2'>
                                        <p className='font-medium capitalize text-gray-900'>Name  :<span className='font-bold'>{(val.firstName)}</span> </p>
                                        <p className='font-medium capitalize text-gray-900'>FIR Number :<span className='font-bold'>{(val.firNo)}</span></p>
                                        <p className='font-medium capitalize text-gray-900'>Collision Type: <span className='font-bold'>{(val.typeOfCollision)}</span></p>
                                        <p className='font-medium capitalize text-gray-900'>No of Fatalities : <span className='font-bold'>{(val.noOfFatalities)}</span></p>
                                    </div>
                                    <div className='text-left  gap-10 rounded p-2'>
                                        <p className='font-medium capitalize text-gray-900'>Hospitalised  :<span className='font-bold'>{(val.noOfInjuredNeedingHospitalisation)}</span> </p>
                                        <p className='font-medium capitalize text-gray-900'>Not Hospitalised :<span className='font-bold'>{(val.noOfInjuredNotNeedingHospitalisation)}</span></p>
                                        <p className='font-medium capitalize text-gray-900'>Road Name: <span className='font-bold'>{(val.roadName)}</span></p>
                                        <p className='font-medium capitalize text-gray-900'>No of Vehicals Involved : <span className='font-bold'>{(val.noOfVehiclesInvolved)}</span></p>
                                    </div>
                                    <div className='text-left  gap-10 rounded p-2'>
                                        <p className='font-medium capitalize text-gray-900'>Accident City :<span className='font-bold'>{(val.accidentCity)}</span></p>
                                        <p className='font-medium capitalize text-gray-900'>Type Of Weather : <span className='font-bold'>{(val.typeOfWeather)}</span></p>
                                        <p className='font-medium capitalize text-gray-900'>Type of Area  :<span className='font-bold'>{(val.typeOfArea)}</span> </p>
                                        <p className='font-medium capitalize text-gray-900'>Accident Spot : <span className='font-bold'>{(val.accidentSpot)}</span></p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                <div className=' mt-11 w-screen text-left pb-12 md:pb-16'>
                    <h1 className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Accident Analysis Report</h1>
                    <br />
                    <div className='text-black font-bold text-left' dangerouslySetInnerHTML={{ __html: analysis }}></div>
                    {
                        !analysis && <h1 className='uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900'>Loading</h1>
                    }
                </div>

            </div>
            <div className='flex flex-wrap mx-10 text-black md:pb-16'>
                <div className=''>
                    <div className='bg-white shadow-md rounded p-6 mb-6'>
                        <h2 className='text-2xl font-bold mb-4'>Site Investigations</h2>
                        <ul>
                            {
                                investigations && investigations.map((val, ind) => {
                                    return <li key={ind}>
                                        <h3 className='text-xl font-semibold mb-2'>{val.state}, {val.district}</h3>
                                        <p>Road Number: {val.roadNo}</p>
                                        <p>Description: {val.locationDescription}</p>
                                        <p>Nearest Police Station: {val.policeStation}</p>
                                        <p>Land Marks: {val.landmarks}</p>
                                        <p>BlackSpot Id: {val.blackspotId}</p>
                                        <p>Type of Black Spot: {val.blackspotType}</p>
                                        <p>Chainage: {val.chainage_from} : {val.chainage_to}</p>
                                        <div className='flex'>

                                        {
                                            val.site_images && val.site_images.map((img, indx) => {
                                                return <img key={indx} src={img} alt='site image' className='w-full h-[200px] object-cover mb-4' />
                                            })
                                        }
                                        </div>
                                        <div>
                                            <h1 className='font-bold text-3xl my-5'>Some Points To Consider</h1>
                                        </div>
                                        {
                                            questions.map((que, ind) => {
                                                if (!val.isQuest[ind])
                                                    return <div className='mb-2'  >
                                                        <p>{que}</p>
                                                        <p className='text-gray-700'>Comment : {val.comments[ind]}</p>
                                                    </div>
                                            })
                                        }
                                        {
                                            OperationalQuestions.map((que, ind) => {
                                                if (val.isQuestOperational[ind])
                                                    return <div className='mb-2' >
                                                        <p>{que}</p>
                                                        <p className='text-gray-700'>{val.commentsOperational[ind]}</p>
                                                    </div>
                                            })
                                        }
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AccidentAnalysis