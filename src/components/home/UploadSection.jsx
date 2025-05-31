// src/components/home/UploadSection.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Define the API_BASE_URL using the Vite environment variable,
// with a fallback to localhost:8000 for local development if the env var isn't set.
// Ensure this line is OUTSIDE the component function to be defined once per module.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const UploadSection = ({ onProcessingComplete, onProcessingStart, onProcessingError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [fileNameForDisplay, setFileNameForDisplay] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [localError, setLocalError] = useState('');

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

  const handleFile = (selectedFile) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']; // Keep PDF if your backend handles it, otherwise remove.
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(selectedFile.type)) {
      const errorMsg = 'Invalid file type. Please upload JPG, PNG, GIF, or PDF.'; // Adjusted message
      setLocalError(errorMsg);
      setFile(null);
      setFileNameForDisplay('');
      if(onProcessingError) onProcessingError(errorMsg);
      return;
    }
    if (selectedFile.size > maxSize) {
      const errorMsg = 'File is too large. Maximum size is 10MB.';
      setLocalError(errorMsg);
      setFile(null);
      setFileNameForDisplay('');
      if(onProcessingError) onProcessingError(errorMsg);
      return;
    }

    setFile(selectedFile);
    setFileNameForDisplay(selectedFile.name);
    setLocalError('');
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileNameForDisplay('');
    setLocalError('');
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = ""; // Reset the file input field
    }
  };

  const handleProcessDocument = async () => {
    if (!file) {
      const errorMsg = 'Please select a file first.';
      setLocalError(errorMsg);
      if(onProcessingError) onProcessingError(errorMsg);
      return;
    }

    setIsUploading(true);
    setLocalError('');
    if (onProcessingStart) onProcessingStart();

    const formData = new FormData();
    formData.append('file', file);

    const endpoint = `${API_BASE_URL}/process-image/`;
    console.log(`INFO [UploadSection]: Attempting to POST image to: ${endpoint}`);

    try {
      const response = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 600000 // 10 minutes timeout
      });
      
      console.log("INFO [UploadSection]: Successfully received response from backend.", response.data);

      // Create a temporary URL for the uploaded image for display purposes
      // This URL is local to the browser session.
      const imageUrl = URL.createObjectURL(file); 

      const resultData = {
        imageSrc: imageUrl, // This will be a blob URL like blob:http://localhost:5173/xxxx-xxxx
        recognizedText: response.data.recognized_text,
        filename: response.data.filename || file.name // Use filename from backend if provided
      };
      
      if (onProcessingComplete) {
        onProcessingComplete(resultData);
      }

    } catch (err) {
      console.error("ERROR [UploadSection]: Error uploading/processing file:", err);
      let errorMessage = 'Processing failed. Please try again.';
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("ERROR [UploadSection]: Backend responded with error:", err.response.data, err.response.status, err.response.headers);
        errorMessage = `Processing failed: ${err.response.data.detail || err.response.statusText || 'Server error'}`;
      } else if (err.request) {
        // The request was made but no response was received
        console.error("ERROR [UploadSection]: No response received from server:", err.request);
        errorMessage = 'Processing failed: No response from server. Is it running and accessible? Check network and CORS.';
      } else if (err.code === 'ECONNABORTED') {
          errorMessage = 'Processing timed out. The file might be too large or complex, or the server is taking too long.';
      }else {
        // Something happened in setting up the request that triggered an Error
        console.error('ERROR [UploadSection]: Error in request setup:', err.message);
        errorMessage = `Processing error: ${err.message}`;
      }
      setLocalError(errorMessage);
      if (onProcessingError) onProcessingError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ease-in-out ${
        isDragging ? 'border-blue-500 bg-blue-50 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {file ? (
        <div className="py-4">
          <div className="flex items-center justify-center mb-4">
            {/* Icon for file */}
            <svg className="w-12 h-12 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12.75h.008v.008H9v-.008zm0-3h.008v.008H9v-.008zm0-3h.008v.008H9v-.008zm0-3h.008v.008H9v-.008zM12 9.75h.008v.008H12v-.008zm0 3h.008v.008H12v-.008zm0 3h.008v.008H12v-.008zm0 3h.008v.008H12v-.008zM15 9.75h.008v.008H15v-.008zm0 3h.008v.008H15v-.008zm0 3h.008v.008H15v-.008z" />
              {/* Simplified generic file icon path if the above is problematic - the d attribute had an issue before */}
              {/* <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 13.5h6M9 16.5h6m-6.75 3h6.75" /> */}

            </svg>
          </div>
          <p className="text-lg font-medium text-gray-800 dark:text-gray-100">{fileNameForDisplay}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <button 
              className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-50"
              onClick={handleProcessDocument}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Process Document'}
            </button>
            <button 
              className="px-6 py-2.5 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-50"
              onClick={handleRemoveFile}
              disabled={isUploading}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <>
          <svg className="mx-auto w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">Drag and drop your file here</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">or</p>
          <label className="mt-4 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer">
            Browse Files
            <input type="file" className="hidden" onChange={handleFileInput} accept="image/jpeg,image/png,image/gif,application/pdf"/>
          </label>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Supported formats: JPG, PNG, GIF, PDF (up to 10MB)
          </p>
        </>
      )}
      {localError && <p className="text-center mt-2 text-red-500 text-sm">{localError}</p>}
    </div>
  );
};

export default UploadSection;