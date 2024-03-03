import  { useState } from 'react'
import Dropzone from '../components/DropZone';
import Card from '../components/Card';
import heatm from '../assets/images/heatmap.png'
import clusm from '../assets/images/cluster.png'
const Identification = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const [isUploading, setIsUploading] = useState(false);
    const removeItem = (id) => {
        const filterd = uploadedFiles.filter((f) => f.lastModified !== id);
        setUploadedFiles(filterd);
    };
    const handleUpload = (files) => {
        try {
            setIsUploading(true);
            setUploadedFiles(uploadedFiles.concat(files));
        } catch (error) {
            console.log(error);
        } finally {
            setIsUploading(false);
        }
    };
    return (
        <>
            <div className='mb-10'>
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                    <h1 className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Data Aquisition</h1>
                    <p className="text-xl text-gray-900">Your inputs aid in comprehensive accident analysis, leading to better understanding and prevention strategies for safer road</p>
                </div>
                <div className="w-screen flex flex-col justify-center items-center">
                    <Dropzone onUpload={handleUpload} />
                    {uploadedFiles.length > 0 && (
                        <ul className="w-2/3  my-5">
                            {uploadedFiles.map((file, index) => (
                                <li
                                    className="bg-sky-400 px-5 py-3 w-full my-2 rounded-lg"
                                    key={index}
                                >
                                    <div className="flex justify-between items-center w-full">
                                        {file.type.startsWith("image/") ? (
                                            <div className="flex gap-5 items-center">

                                                <span>{file.name}</span>
                                            </div>
                                        ) : (
                                            <div className="flex gap-5 items-center">
                                                <div className=" bg-gray-200  w-12 h-12 rounded-full cursor-pointer"></div>
                                                <span>{file.name}</span>
                                            </div>
                                        )}
                                        <span
                                            onClick={() => removeItem(file.lastModified)}
                                            className=" cursor-pointer"
                                        >
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    opacity="1"
                                                    x="6"
                                                    y="17.3137"
                                                    width="16"
                                                    height="2"
                                                    rx="1"
                                                    transform="rotate(-45 6 17.3137)"
                                                    fill="currentColor"
                                                />
                                                <rect
                                                    x="7.41422"
                                                    y="6"
                                                    width="16"
                                                    height="2"
                                                    rx="1"
                                                    transform="rotate(45 7.41422 6)"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {isUploading && (
                        <div className="flex justify-center items-center w-1/3 h-48 border-2 border-dashed rounded-lg p-4">
                            <p>Loading...</p>
                        </div>
                    )}
                </div>
                <div className='text-center'>
                    <p className="mt-4 text-gray-900">OR</p> <br />
                    <button className='p-4  bg-gray-900 rounded-md'><a href="/form">Fill Manually</a></button>
                </div>
            </div>
            <div className='mt-10'>
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                    <h1 className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Blackspot Analysis</h1>
                    <p className="text-xl text-gray-900">Blackspot analysis studies traffic accidents, extracting insights on trends and factors. Identifying patterns helps enhance road safety.</p>
                </div>
                <div className='flex max-w-4xl mx-auto text-center pb-12 md:pb-16 justify-around'>
                    <Card
                        imageUrl={heatm}
                        title="HeatMap Analysis"
                        description=""
                        link="#"
                    />
                    <Card
                        imageUrl={clusm}
                        title="Cluster Analysis"
                        description=""
                        link="#"
                    />
                </div>
            </div>
            <div className='mt-10'>
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                    <h1 className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Analysis Result</h1>
                    <p className="text-xl text-gray-900">Blackspot analysis studies traffic accidents, extracting insights on trends and factors. Identifying patterns helps enhance road safety.</p>
                </div>
                <div className=' max-w-4xl mx-auto pb-12 md:pb-16 '>
                    <h1 className='mb-2 text-gray-900 font-bold text-3xl'>1. BlackSpot Location</h1>
                    <div className='w-full text-center'>
                        <p className=' text-black '>Map will be embedded</p>
                    </div>
                    <h1 className='mb-2 text-gray-900 font-bold text-3xl'>2. Sevirity of Blackspot</h1>
                    <div className='w-full text-left ml-5 mb-4'>
                        <p className=' text-black '>
                            <span className='font-bold'>Frequency of Accidents:</span> The number of accidents that occur at a blackspot is a key indicator of its severity. Blackspots with frequent accidents pose a greater risk to road users and may require more immediate attention from authorities.
                            <br />
                            <span className='font-bold'> Types of Accidents:</span> The severity of accidents at blackspots can also vary based on the types of collisions that occur. Some blackspots may have a higher incidence of minor fender-benders, while others may experience more severe crashes involving injuries or fatalities.
                            <br />
                            <span className='font-bold'>Location Characteristics:</span> Certain features of a blackspot, such as high-speed limits, sharp curves, or intersections, can contribute to the severity of accidents. For example, a blackspot located on a highway with fast-moving traffic may see more severe accidents than one located on a residential street.
                            <br />
                            <span className='font-bold'>Mitigation Measures:</span> The effectiveness of measures taken to address blackspots, such as installing traffic signals, adding warning signs, improving road visibility, or redesigning intersections, can influence the severity of accidents. Prompt and effective interventions can help reduce the severity of accidents at blackspots over time.
                            <br />
                            <span className='font-bold'>Driver Behavior:</span> The behavior of drivers, such as speeding, distracted driving, or driving under the influence of alcohol or drugs, can significantly impact the severity of accidents at blackspots. Educational campaigns and enforcement efforts aimed at improving driver behavior can help mitigate the severity of accidents.</p>
                    </div>
                    <h1 className='mb-2 text-gray-900 font-bold text-3xl'>3. Cause of Accident</h1>
                    <h1 className='mb-2 text-gray-900 font-bold text-3xl'>4 .Defects in geometrical features of Road or Spot</h1>
                </div>
            </div>
        </>
    )
}

export default Identification