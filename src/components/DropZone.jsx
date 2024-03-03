import React, { useState } from "react";



const Dropzone = ({ onUpload }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    onUpload(files);
  };

  return (
    <div
      className={`flex justify-center items-center w-2/3 h-48 border-2 border-dashed rounded-lg p-5
        ${isDragActive ? "bg-sky-50 border-sky-400" : "border-gray-600"}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p
        className={`text-sm ${
          isDragActive ? "text-sky-800" : "text-gray-900"
        }  `}
      >
        {isDragActive
          ? "Leave Your File Here"
          : "Drag and drop your files here"}
      </p>
    </div>
  );
};

export default Dropzone;