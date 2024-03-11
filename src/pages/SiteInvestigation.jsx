import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Mtp from '../components/MapToPosition';
import { useNavigate } from 'react-router-dom';

const questions = [
    "Is the first principles for a priority junction or for a roundabout or for signal controlled junction catered in the layout design?",
    "Is both vertical and horizontal alignment adequate in respect of broken back curves and for change of grade in vertical alignment?",
    "Is the visibility funnel encumbrance free?",
    "Are lane widths adequate? (turning lanes: minimum 3.0 m; other lanes: minimum 3.25 m)",
    "Are there adequate facilities for pedestrians?",
    "Should pedestrian crossings be relocated/repainted?",
    "Are the road signs adequate in terms of their message, size, placement, or conformity to specification of materials used?",
    "Are the signals adequate in terms of their placement, conformity, number of signal heads, or timing?",
    "Are road markings adequate in terms of type, clarity and location?",
    "Is traffic properly channelized to minimize the occurrence of accidents?",
    "If night-time accidents represent a considerable proportion of the total number of accidents, is the street lighting or the number of reflectors adequate?",
    "Are parking arrangements adequate?",
    "Are the bus stops located in a safe place?",
    "Does the road geometry encourage safe speeds?",
    "Is the road surface adequate? Does it drain properly?",
    "Are there no obstructions in the road or close to the edge?",
    "In bridge approach is provided with adequate marking to make the vehicle to align well ahead in the approach itself within the available carriageway width of the bridge"
];

const OperationalQuestions = [
    "Is the driver's view of other vehicles/pedestrians obstructed?",
    "Do drivers respond incorrectly to signals, signs, or other control devices?",
    "Do drivers have trouble understanding and finding the correct path through the location?",
    "Are there hidden hazards - such as a sharp bend beyond a crest?",
    "Are there hazards that vehicle approaching junction cannot see each other?",
    "Are vehicle speeds excessive for this situation? Are there speed differences? If yes, in which driving direction?",
    "Are parking or other traffic regulations regularly violated?",
    "Are vehicles delayed? Can the delays be reduced?",
    "Are there traffic flow deficiencies or traffic conflict patterns associated with turning movements?",
    "Would one-way operation make the location safer?",
    "Is the traffic volume causing problems? Are there sufficient gaps in the main road traffic to enable drivers from side roads to enter the main road without excessive delay?",
    "Are there sufficient gaps in the traffic to enable pedestrians to cross the road without excessive delay?",
    "Are pedestrians not crossing the road at the safest places? Can they see whether it is safe to cross?",
    "Is there need for effective/selective enforcement or effective/selective maintenance?",
    "Are buses and bus passengers not using the facilities that have been provided for them?"
];

const SiteInvestigation = () => {
    const navigate = useNavigate();
    const [comments, setComments] = useState(Array(17).fill(''));
    const [isQuest, setIsQuest] = useState(Array(17).fill(false));

    const handleQuest = (index, c) => {
        const a = [...isQuest];
        a[index] = c;
        setIsQuest(a);
    };
    const handleCommentChange = (index, comment) => {
        const newComments = [...comments];
        newComments[index] = comment;
        setComments(newComments);
    };
    const [commentsOperational, setCommentsOperational] = useState(Array(17).fill(''));
    const [isQuestOperational, setIsQuestOperational] = useState(Array(17).fill(false));

    const handleQuestOP = (index, c) => {
        const a = [...isQuestOperational];
        a[index] = c;
        setIsQuestOperational(a);
    };
    const handleCommentChangeOP = (index, comment) => {
        const newComments = [...commentsOperational];
        newComments[index] = comment;
        setCommentsOperational(newComments);
    };
    const [loc, setLoc] = useState(
        {
            latitude: 0,
            longitude: 0
        }
    );
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
        blackspotType: 'Junction',
        site_images: []
    });
    const handleImageChange = (e) => {
        const files = e.target.files;
        const imagesArray = siteReference.site_images;

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = (e) => {
                imagesArray.push(e.target.result);
                setSiteReference({
                    ...siteReference,
                    site_images: imagesArray
                });
            };

            reader.readAsDataURL(files[i]);
        }
        console.log(siteReference.site_images);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${import.meta.env.VITE_BACK_URL}/api/form/siteInvestigation/` + localStorage.getItem("token"), ({ ...siteReference, gpsCoordinates: loc , comments: comments, isQuest: isQuest , commentsOperational:commentsOperational,isQuestOperational:isQuestOperational}))
            .then((response) => {
                toast(`Successfully submitted form!`);
                setTimeout(() => {
                    navigate('/');
                }, 4000);

            }).catch((error) => {
                console.log(error)
                toast("Access Denied");

            });

        console.log(siteReference)
    };
    return (
        <form className="p-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
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
                            id="chainage_from"
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
                            id="chainage_to"
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
                            value={loc.latitude}
                            disabled
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
                            value={loc.longitude}
                            disabled
                            required
                            placeholder='Enter Longitude'
                            onChange={(e) => setSiteReference({ ...siteReference, gpsCoordinates: { ...siteReference.gpsCoordinates, longitude: e.target.value } })}
                            className='text-black bg-white ml-2 appearance-none border rounded w-1/3 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                </div>
            </div>
            <Mtp loc={loc} setLoc={setLoc} />
            <div className="my-4">
                <label htmlFor="blackspotType" className="block text-gray-700 font-bold mb-2">
                    Blackspot Type
                </label>
                <select
                    id="blackspotType"
                    name="blackspotType"
                    required
                    onChange={(e) => setSiteReference({ ...siteReference, blackspotType: e.target.value })}
                    className="text-black appearance-none border rounded w-full py-2 px- leading-tight focus:outline-none focus:border-indigo-500 focus:shadow-outline"
                >
                    <option value="junction">Junction</option>
                    <option value="mid-block">Mid-block</option>
                    <option value="median-opening">Median Opening</option>
                    <option value="structure">Structure</option>
                </select>
            </div>
            <div className='my-4'>
                <label htmlFor="blackspotType" className="block text-gray-700 font-bold mb-2">
                    Photos :
                </label>
                <input
                    type="file"
                    id="site_images"
                    name="site_images"
                    onChange={handleImageChange}
                    multiple
                    className='text-black bg-white ml-2 appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                />

            </div>
            <div className='my-4'>
                {
                    siteReference.site_images.map((image, index) => {
                        return (
                            <img key={index} src={image} alt="site_image" className="w-1/4 h-1/4" />
                        );
                    })
                }
            </div>

            <div className="container mx-auto p-4 w-[800px] text-black">
            <h1 className="text-2xl font-bold mb-4">Road Safety Physical Checklist</h1>
            <div className="grid grid-cols-1 gap-4">
                {questions.map((question, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`question-${index}`}
                            className='checked:bg-blue-500'
                            style={{
                                appearance: "none",
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                                outline: "none",
                                cursor: "pointer",
                                border: "2px solid black",
                                width: "1rem",
                                height: "1rem",
                                borderRadius: "0.25rem",
                                marginRight: "0.75rem",
                            }}
                            onChange={(e) => handleQuest(index, e.target.checked)}
                        />
                        <label htmlFor={`question-${index}`}>
                            {`Question ${index + 1}: ${question}`}
                        </label>
                        <textarea
                            className="w-full border rounded-md p-2 mt-2"
                            placeholder="Add comments..."
                            value={comments[index]}
                            required={!isQuest[index]}
                            disabled = {isQuest[index]}
                            onChange={(e) => handleCommentChange(index, e.target.value)}
                        ></textarea>
                    </div>
                ))}
            </div>
            <h1 className="text-2xl font-bold mb-4">Road Safety Operational Checklist</h1>
            <div className="grid grid-cols-1 gap-4">
                {OperationalQuestions.map((question, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`question-${index}`}
                            className='checked:bg-blue-500'
                            style={{
                                appearance: "none",
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                                outline: "none",
                                cursor: "pointer",
                                border: "2px solid black",
                                width: "1rem",
                                height: "1rem",
                                borderRadius: "0.25rem",
                                marginRight: "0.75rem",
                            }}
                            onChange={(e) => handleQuestOP(index, e.target.checked)}
                        />
                        <label htmlFor={`question-${index}`}>
                            {`Question ${index + 1}: ${question}`}
                        </label>
                        <textarea
                            className="w-full border rounded-md p-2 mt-2"
                            placeholder="Add comments..."
                            required={isQuestOperational[index]}
                            value={commentsOperational[index]}
                            disabled = {!isQuestOperational[index]}
                            onChange={(e) => handleCommentChangeOP(index, e.target.value)}
                        ></textarea>
                    </div>
                ))}
            </div>
        </div>



            <div className="flex justify-center my-14">
                <button
                    className="w-2/3 m-auto text-center px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-slate-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    type="submit"
                >
                    Submit
                </button>
            </div>
            <ToastContainer />
        </form >
    );
};

export default SiteInvestigation;