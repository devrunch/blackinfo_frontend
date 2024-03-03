import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const SiteInvestigation = () => {
    const navigate = useNavigate();
    const [siteReference, setSiteReference] = useState({
        state: '',
        roadNo: '',
        locationDescription: '',
        policeStation: '',
        district: '',
        chainage_from: '',
        chainage_to: '',
        landmarks: '',
        blackspotId: '',
        gpsCoordinates: {
            latitude: '',
            longitude: ''
        },
        blackspotType: 'Junction'
    
    });
    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.post(`${import.meta.env.VITE_BACK_URL}/api/form/siteInvestigation/` + localStorage.getItem("token"), (siteReference))
          .then((response) => {
            toast(`Successfully submitted form!`);
             setTimeout(() => {
              navigate('/dashboard');
            }, 4000);
            
          }).catch((error) => {
            console.log(error)
            toast("Access Denied");
    
          });
          
        console.log(siteReference)
    };
    return (
        <form className="p-4 max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className='my-5 uppercase flex text-gray-900 font-black text-3xl'>
                Site Investigation Detail
            </div>
            
            <div className="mb-4">
                <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
                    State
                </label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="Enter State"
                    required
                    onChange={(e) => setSiteReference({ ...siteReference, state: e.target.value })}
                    className="bg-white text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="roadNumber" className="block text-gray-700 font-bold mb-2">
                    Road No.
                </label>
                <input
                    type="text"
                    id="roadNumber"
                    name="roadNo"
                    placeholder="Enter Road Number"
                    required
                    onChange={(e) => setSiteReference({ ...siteReference, roadNo: e.target.value })}
                    className="bg-white text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="locationDescription" className="block text-gray-700 font-bold mb-2">
                    Location description:
                </label>
                <textarea
                    id="locationDescription"
                    name="locationDescription"
                    required
                    placeholder="Enter Location Description"
                    onChange={(e) => setSiteReference({ ...siteReference, locationDescription: e.target.value })}
                    className="text-black bg-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="policeStation" className="block text-gray-700 font-bold mb-2">
                    Police Station:
                </label>
                <input
                    type="text"
                    id="policeStation"
                    required
                    name="policeStation"
                    placeholder="Enter Police Station"
                    onChange={(e) => setSiteReference({ ...siteReference, policeStation: e.target.value })}
                    className="text-black bg-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="district" className="block text-gray-700 font-bold mb-2">
                    District.
                </label>
                <input
                    type="text"
                    id="district"
                    required
                    name="district"
                    placeholder="Enter District"
                    onChange={(e) => setSiteReference({ ...siteReference, district: e.target.value })}
                    className=" text-black bg-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4  text-gray-700">
                <label htmlFor="gpsCoordinate" className="block text-gray-700 font-bold mb-2">
                    Chainage:
                </label>
                {/* TODO: Add map to select coordinates */}
                <div className="flex w-full">
                    <div className="w-1/2">
                        From:
                        <input
                            type="number" step="any"
                            id="latitude"
                            name="chainage_from"
                            required
                            placeholder='Enter Chainage From'
                            onChange={(e) => setSiteReference({ ...siteReference, chainage_from: e.target.value })}
                            className='text-black bg-white ml-2 appearance-none border rounded w-1/3 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className="w-1/2">
                        To:
                        <input
                            type="number" step="any"
                            id="longitude"
                            required
                            name="chainage_to"
                            placeholder='Enter Chainage To'
                            onChange={(e) => setSiteReference({ ...siteReference, chainage_to: e.target.value })}
                            className='text-black bg-white ml-2 appearance-none border rounded w-1/3 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="landmarks" className="block text-gray-700 font-bold mb-2">
                    Landmarks
                </label>
                <textarea
                    id="landmarks"
                    name="landmarks"
                    required
                    placeholder="Enter Landmarks"
                    onChange={(e) => setSiteReference({ ...siteReference, landmarks: e.target.value })}
                    className=" bg-white text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="blackspotId" className="block text-gray-700 font-bold mb-2">
                    Blackspot ID: (if available):
                </label>
                <input
                    type="text"
                    id="blackspotId"
                    required
                    name="blackspotId"
                    placeholder="Enter Blackspot ID"
                    onChange={(e) => setSiteReference({ ...siteReference, blackspotId: e.target.value })}
                    className=" bg-white text-black appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4  text-gray-700">
                <label htmlFor="gpsCoordinate" className="block text-gray-700 font-bold mb-2">
                    GPS Coordinates:
                </label>
                {/* TODO: Add map to select coordinates */}
                <div className="flex w-full">
                    <div className="w-1/2">
                        Latitude:
                        <input
                            type="number" step="any"
                            id="latitude"
                            name="latitude"
                            required
                            placeholder='Enter Latitude'
                            onChange={(e) => setSiteReference({ ...siteReference, gpsCoordinates: { ...siteReference.gpsCoordinates, latitude: e.target.value } })}
                            className='text-black bg-white ml-2 appearance-none border rounded w-1/3 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className="w-1/2">
                        Longitude:
                        <input
                            type="number" step="any"
                            id="longitude"
                            name="longitude"
                            required
                            placeholder='Enter Longitude'
                            onChange={(e) => setSiteReference({ ...siteReference, gpsCoordinates: { ...siteReference.gpsCoordinates, longitude: e.target.value } })}
                            className='text-black bg-white ml-2 appearance-none border rounded w-1/3 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                </div>
            </div>
            <div className="my-4">
                <label htmlFor="blackspotType" className="block text-gray-700 font-bold mb-2">
                    Blackspot Type
                </label>
                <select
                    id="blackspotType"
                    name="blackspotType"
                    required
                    onChange={(e) => setSiteReference({ ...siteReference, blackspotType: e.target.value })}
                    className="text-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 focus:shadow-outline"
                >
                    <option value="junction">Junction</option>
                    <option value="mid-block">Mid-block</option>
                    <option value="median-opening">Median Opening</option>
                    <option value="structure">Structure</option>
                </select>
            </div>
            <div className="flex justify-center my-14">
                <button
                    className="w-2/3 m-auto text-center px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-slate-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    type="submit"
                >
                    Submit
                </button>
            </div>
            <ToastContainer/>
        </form >
    );
};

export default SiteInvestigation;