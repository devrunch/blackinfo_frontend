import { useState } from "react";
import axios from "axios";
import LocMap from '../components/MapToPosition'
import { useNavigate } from "react-router-dom";
const Form = () => {
  const navigate = useNavigate()
  const [cars, setCars] = useState([{ registrationPlate: '', type: '', dispositionLoadAfterAccident: '', condition: '', trafficViolation: '', mechanicalViolation: '' }]);
  const [loc, setLoc] = useState(null)
  const handleChangeincars = (index, e) => {
    const { name, value } = e.target;
    const newCars = [...cars];
    newCars[index][name] = value;
    setCars(newCars);
  };

  const [accident, setAccident] = useState({
    firstName: '',
    lastName: '',
    policeStation: '',
    district: '',
    firNo: '',
    timeOfAccident: '00:00',
    dateOfAccident: '01/01/2024',
    typeOfAccident: "Fatal",
    typeOfArea: "Urban",
    typeOfCollision: "Hit Pedestrian",
    typeOfWeather: 'Fine/Clear',
    hitAndRun: 'Yes',
    ongoingRoadWorks: 'Yes',
    noOfVehiclesInvolved: '',
    noOfFatalities: '',
    noOfInjuredNeedingHospitalisation: '',
    noOfInjuredNotNeedingHospitalisation: '',
    accidentCity: '',
    roadName: '',
    roadNumber: '',
    noOfLanes: '',
    roadType: 'Expressway',
    physicalDividerPresent: true,
    typeOfRoadSurface: 'Paved',
    accidentSpot: 'Road Section'
  })
  const addCar = () => {
    setCars([...cars, { registrationPlate: '', vehicletype: '', dispositionLoadAfterAccident: '', condition: '', trafficViolation: '', mechanicalViolation: '' }]);
  };
  const handleChangeinAccident = (e) => {
    const { name, value } = e.target;
    const newAccident = accident;
    newAccident[name] = value;
    setAccident(newAccident);
    console.log(accident)
  };
  const removeCar = (index) => {
    const newCars = [...cars];
    newCars.splice(index, 1);
    setCars(newCars);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    accident["vehicles"] = cars;
    axios.post(`${import.meta.env.VITE_BACK_URL}/api/form/accident/` + localStorage.getItem("token"), ({...accident,longitude:loc.longitude,latitude:loc.latitude}))
      .then((response) => {
        alert(`Successfully added accident!`);
        navigate("/analysis")
      }).catch((error) => {
        alert('Error creating incident!', error);

      });
    console.log(accident)
  };


  return (
    <>

      <form className="w-full max-w-xl m-auto" onSubmit={handleSubmit}>
        <div className='my-5 uppercase flex text-gray-900 font-black text-3xl'>
          Accident Identification Detail
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-first-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input
              id="grid-first-name"
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              onChange={handleChangeinAccident}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 mx-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />

          </div>
          <div className="w-full md:w-1/2 px-3">
            <label htmlFor="grid-last-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
            <input
              id="grid-last-name"
              type="text"
              name="lastName"
              required
              placeholder="Last Name"
              onChange={handleChangeinAccident}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label htmlFor="grid-text" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Police Station
            </label>
            <input
              id="grid-text"
              type="text"
              required
              placeholder="Police station "
              onChange={handleChangeinAccident}
              name="policeStation"
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />

          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-city" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              City
            </label>
            <input
              id="grid-city"
              type="text"
              placeholder="City"
              required
              name="district"
              onChange={handleChangeinAccident}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              State
            </label>
            <div className="relative">
              <select
                id="grid-state"
                name="state"
                required
                onChange={handleChangeinAccident}
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Andhra Pradesh</option>
                <option>Arunachal Pradesh</option>
                <option>Assam</option>
                <option>Bihar</option>
                <option>Chhattisgarh</option>
                <option>Goa</option>
                <option>Gujarat</option>
                <option>Haryana</option>
                <option>Himachal Pradesh</option>
                <option>Jammu and Kashmir</option>
                <option>Jharkhand</option>
                <option>Karnataka</option>
                <option>Kerala</option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Manipur</option>
                <option>Meghalaya</option>
                <option>Mizoram</option>
                <option>Nagaland</option>
                <option>Odisha</option>
                <option>Punjab</option>
                <option>Rajasthan</option>
                <option>Sikkim</option>
                <option>Tamil Nadu</option>
                <option>Telangana</option>
                <option>Tripura</option>
                <option>Uttarakhand</option>
                <option>Uttar Pradesh</option>
                <option>West Bengal</option>
                <option>Andaman and Nicobar Islands</option>
                <option>Chandigarh</option>
                <option>Dadra and Nagar Haveli and Daman and Diu</option>
                <option>Delhi</option>
                <option>Lakshadweep</option>
                <option>Puducherry</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-zip" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              FIR number
            </label>
            <input
              id="grid-zip"
              type="text"
              onChange={handleChangeinAccident}
              placeholder="90210"
              required
              name="firNo"
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className='mb-5 uppercase flex text-gray-900 font-black text-3xl'>

        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-first-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Time of Accident
            </label>
            <input
              id="grid-first-name"
              onChange={handleChangeinAccident}
              type="text"
              placeholder="HH:MM:SS /24 Hour"
              required
              name="timeOfAccident"
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-red-500 rounded py-3 mx-1 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />

          </div>
          <div className="w-full md:w-1/2 px-3">
            <label htmlFor="grid-last-name" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Date Of Accident
            </label>
            <input
              id="grid-last-name"
              type="date"
              onChange={handleChangeinAccident}
              placeholder="DD/MM/YY"
              required
              name="dateOfAccident"
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Type Of Accident
            </label>
            <div className="relative">
              <select
                id="grid-state"
                onChange={handleChangeinAccident}
                name="typeOfAccident"
                required
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Fatal</option>
                <option>Injury Needing hospitalization</option>
                <option>Injury not Needing hospitalization</option>
                <option>Damage to Property</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Type of Area
            </label>
            <div className="relative">
              <select
                id="grid-state"
                onChange={handleChangeinAccident}
                name="typeOfArea"
                required
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Urban</option>
                <option>Rural</option>
                <option>Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Type of Weather
            </label>
            <div className="relative">
              <select
                id="grid-state"
                onChange={handleChangeinAccident}
                required
                name="typeOfWeather"
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Fine/Clear</option>
                <option>Rainy</option>
                <option>Foggy</option>
                <option>Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

        </div>
        <div className="flex flex-wrap -mx-3 mb-2">

          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Hit And Run
            </label>
            <div className="relative">
              <select
                id="grid-state"
                onChange={handleChangeinAccident}
                name="hitAndRun"
                required
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Ongoing Road Works
            </label>
            <div className="relative">
              <select
                id="grid-state"
                required
                name="ongoingRoadWorks"
                onChange={handleChangeinAccident}
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
                {/* <option>Other</option> */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Type of Collision
            </label>
            <div className="relative">
              <select
                id="grid-state"
                name="typeOfCollision"
                required
                onChange={handleChangeinAccident}
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Hit Pedestrian</option>
                <option>Head on collision</option>
                <option>Hit from Back</option>
                <option>Hit form Side</option>
                <option>Hit fix/Stationary object </option>
                <option>Overturn </option>
                <option>Run of the road </option>
                <option>Other </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

        </div>
        <div className="flex flex-wrap -mx-3 mb-2 justify-normal">
          <div className="w-full md:w-1/5 mx-3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-zip" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Vehicles involved
            </label>
            <input
              id="grid-zip"
              type="number"
              onChange={handleChangeinAccident}
              placeholder="90210"
              name="noOfVehiclesInvolved"
              required
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <div className="w-full md:w-1/5 mx-3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-zip" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Number of fatalities
            </label>
            <input
              id="grid-zip"
              onChange={handleChangeinAccident}
              type="text"
              placeholder="Fatalities"
              name="noOfFatalities"
              
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/5 mx-3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-zip" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Hospitilazation needed
            </label>
            <input
              id="grid-zip"
              type="number"
              onChange={handleChangeinAccident}
              placeholder="Hospitalized"
              required
              name="noOfInjuredNeedingHospitalisation"
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/5 mx-2 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-zip" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              No hospitalization
              needed
            </label>
            <input
              id="grid-zip"
              type="number"
              onChange={handleChangeinAccident}
              name="noOfInjuredNotNeedingHospitalisation"
              placeholder="Safe"
              required
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

        </div>
        <div className='my-7 uppercase flex text-gray-900 font-black text-3xl'>
          Details Of accident loacation
        </div>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full px-3">
            <label htmlFor="grid-text" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              City / District / Village
            </label>
            <input
              id="grid-text"
              type="text"
              onChange={handleChangeinAccident}
              name="accidentCity"
              required
              placeholder="Address"
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full px-3">
            <label htmlFor="grid-text" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Road Name
            </label>
            <input
              id="grid-text"
              type="text"
              onChange={handleChangeinAccident}
              placeholder="Road Name"
              name="roadName"
              required
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-5 justify-around">

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
            <label htmlFor="grid-zip" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Road number
            </label>
            <input
              id="grid-zip"
              type="text"
              onChange={handleChangeinAccident}
              placeholder="902-10"
              name="roadNumber"
              required
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
            <label htmlFor="grid-zip" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Number of lanes
            </label>
            <input
              id="grid-zip"
              type="number"
              onChange={handleChangeinAccident}
              placeholder="2"
              name="noOfLanes"
              required
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Road Type
            </label>
            <div className="relative">
              <select
                id="grid-state"
                name="roadType"
                required
                onChange={handleChangeinAccident}
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Expressway</option>
                <option>National Highway</option>
                <option>State Highway</option>
                <option>Other Rural highways</option>
                <option>Urban Aterial</option>
                <option>Other Urban Roads </option>
                <option>Unkown </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Physical Divider
            </label>
            <div className="relative">
              <select
                id="grid-state"
                onChange={handleChangeinAccident}
                name="physicalDividerPresent"
                required
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value={true}>Present</option>
                <option value={false}>Absent</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Type of Road Surface
            </label>
            <div className="relative">
              <select
                id="grid-state"
                name="typeOfRoadSurface"
                required
                onChange={handleChangeinAccident}
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Paved</option>
                <option>Unpaved</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

        </div>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Accident Spot
            </label>
            <div className="relative">
              <select
                id="grid-state"
                required
                name="accidentSpot"
                onChange={handleChangeinAccident}
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Road Section</option>
                <option>Near At junction</option>
                <option>Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0 ">
            <label htmlFor="grid-zip" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Road Chainage
            </label>
            <input
              id="grid-zip"
              type="text"
              placeholder="---KM ---M"
              onChange={handleChangeinAccident}
              name="roadChainage"
              required
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-5 justify-around">

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
            <label htmlFor="grid-zip" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Longitude
            </label>
            <input
              id="grid-zip"
              type="text"
              name="longitude"
              value={loc?.longitude}
              onChange={(e)=>{setAccident({...accident,longitude:e.target.value})}}
              placeholder="910.123"
              required
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 ">
            <label htmlFor="grid-zip" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Latitude
            </label>
            <input
              id="grid-zip"
              type="text"
              name="latitude"
              value={loc?.latitude}
              onChange={(e)=>{setAccident({...accident,latitude:e.target.value})}}
              placeholder="212.22343"
              required
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <LocMap loc={loc} setLoc={setLoc} />
        <div className='my-7 uppercase flex text-gray-900 font-black text-3xl'>
          Damage to Property
        </div>
        <div className="flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
            <label htmlFor="grid-state" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Accident Spot
            </label>
            <div className="relative">
              <select
                id="grid-state"
                name="typeOfPropertyDamage"
                onChange={handleChangeinAccident}
                className="block appearance-none w-full bg-gray-100 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Public</option>
                <option>Private</option>
                <option>Damage to vehicle</option>
                <option>Others</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

        </div>
        <div className='my-7 uppercase flex text-gray-900 font-black text-3xl'>
          Details Of Vehicles involved in Accident
        </div>

        {cars.map((car, index) => (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900" key={index + 1}>Car {index + 1}</h3>
            <div key={index} className="border rounded p-4 mb-4 flex flex-wrap">
              <div className="mb-2">
                <label className="block mb-1 text-gray-900">Vehicle Number:</label>
                <input type="text" name="registrationPlate" value={car.registrationPlate} onChange={(e) => handleChangeincars(index, e)} className="w-full border rounded px-3 py-2 bg-gray-100 border-gray-200 text-gray-700 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-100" />
              </div>
              <div className="mb-2">
                <label className="block mb-1 text-gray-900">Vehicle Type:</label>
                <input type="text" name="vehicletype" value={car.vehicletype} onChange={(e) => handleChangeincars(index, e)} className="w-full border rounded px-3 py-2  bg-gray-100 border-gray-200 text-gray-700 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-100" />
              </div>
              <div className="mb-2">
                <label className="block mb-1 text-gray-900">Disposition After Accident:</label>
                <input type="text" name="dispositionLoadAfterAccident" value={car.dispositionLoadAfterAccident} onChange={(e) => handleChangeincars(index, e)} className="w-full border rounded px-3 py-2  bg-gray-100 border-gray-200 text-gray-700 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-100" />
              </div>
              <div className="mb-2">
                <label className="block mb-1 text-gray-900">Load Condition:</label>
                <input type="text" name="condition" value={car.condition} onChange={(e) => handleChangeincars(index, e)} className="w-full border rounded px-3 py-2  bg-gray-100 border-gray-200 text-gray-700 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-100" />
              </div>
              <div className="mb-2">
                <label className="block mb-1 text-gray-900">Traffic Violation:</label>
                <input type="text" name="trafficViolation" value={car.trafficViolation} onChange={(e) => handleChangeincars(index, e)} className="w-full border rounded px-3 py-2  bg-gray-100 border-gray-200 text-gray-700 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-100" />
              </div>
              <div className="mb-2">
                <label className="block mb-1 text-gray-900">Mechanical Faliure:</label>
                <input type="text" name="mechanicalViolation" value={car.mechanicalViolation} onChange={(e) => handleChangeincars(index, e)} className="w-full border rounded px-3 py-2  bg-gray-100 border-gray-200 text-gray-700 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-100" />
              </div>
              <button type="button" onClick={() => removeCar(index)} className="text-white bg-red-600 p-2 rounded">Remove Vehicle</button>
            </div>
          </div>
        ))}
        <br />
        <button type="button" className="text-white bg-green-600 p-2 rounded" onClick={addCar}>Add Car</button> <br />
        <button type="submit" className="text-white bg-blue-600 p-2 rounded m-3 self-center">Submit</button>
      </form>

    </>
  )
}
export default Form