import React from 'react'
import { useState } from 'react'
import Dropzone from '../components/DropZone';
import { useNavigate } from 'react-router-dom';
const Aqusition = () => {
  const navigate = useNavigate();
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
      <div className="mt-5 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </div>
      <div id='manual' className="max-w-3xl mt-14 mx-auto text-center pb-12 md:pb-16">
        <h1  className="uppercase mt-7 h-10 text-4xl font-extrabold mb-4 text-gray-900">Enter data Manually</h1>
        <p className="text-xl text-gray-900">Your inputs aid in comprehensive accident analysis, leading to better understanding and prevention strategies for safer road</p>
      </div>
      <div className=" mt-10 flex justify-center ">
        <button onClick={()=> navigate('/Accidentform')}  className="bg-gray-700 hover:bg-gray-200 text-center hover:text-black text-white font-bold py-2 px-4 rounded mr-2 w-1/5 h-10 border-4 border-gray-700 border-dashed ">
          ACCIDENT DATA
        </button>
        <button onClick={()=> navigate('/siteInvestigation')} className="bg-gray-700 hover:bg-gray-200 text-center hover:text-black text-white font-bold py-2 px-4 rounded ml-2 w-1/5 h-10 border-4 border-gray-700 border-dashed ">
          SITE INVESTIGATION
        </button>
      </div>



    </>
  )
}

export default Aqusition