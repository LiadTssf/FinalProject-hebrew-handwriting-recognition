import React, { useState } from 'react';

const UploadSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleFile = (file) => {
    setFile(file);
    // Further processing would go here
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {file ? (
        <div className="py-4">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg font-medium">{file.name}</p>
          <p className="text-sm text-gray-500">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => {/* Processing logic */}}
          >
            Process Document
          </button>
          <button 
            className="mt-4 ml-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={() => setFile(null)}
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <svg className="mx-auto w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="mt-4 text-lg font-medium">Drag and drop your file here</p>
          <p className="mt-2 text-sm text-gray-500">or</p>
          <label className="mt-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer">
            Browse Files
            <input type="file" className="hidden" onChange={handleFileInput} />
          </label>
          <p className="mt-2 text-xs text-gray-500">
            Supported formats: JPG, PNG, PDF (up to 10MB)
          </p>
        </>
      )}
    </div>
  );
};

export default UploadSection;