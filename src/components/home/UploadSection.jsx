// src/components/home/UploadSection.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Assuming onProcessingComplete is a function passed from a parent component
// It will receive an object like { imageSrc, recognizedText, filename }
const UploadSection = ({ onProcessingComplete, onProcessingStart, onProcessingError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [fileNameForDisplay, setFileNameForDisplay] = useState('');

  // isLoading and error are now handled by the parent through callbacks
  // but we can keep a local loading state for the button if desired
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
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(selectedFile.type)) {
      setLocalError('Invalid file type. Please upload JPG, PNG, or PDF.');
      setFile(null);
      setFileNameForDisplay('');
      if(onProcessingError) onProcessingError('Invalid file type.');
      return;
    }
    if (selectedFile.size > maxSize) {
      setLocalError('File is too large. Maximum size is 10MB.');
      setFile(null);
      setFileNameForDisplay('');
      if(onProcessingError) onProcessingError('File is too large.');
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
      fileInput.value = "";
    }
  };

  const handleProcessDocument = async () => {
    if (!file) {
      setLocalError('Please select a file first.');
      if(onProcessingError) onProcessingError('Please select a file first.');
      return;
    }

    setIsUploading(true);
    setLocalError('');
    if (onProcessingStart) onProcessingStart(); // Notify parent that processing started

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/process-image/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 600000 // 10 minutes timeout
      });
      
      const imageUrl = URL.createObjectURL(file);
      const resultData = {
        imageSrc: imageUrl,
        recognizedText: response.data.recognized_text,
        filename: response.data.filename || file.name
      };
      
      if (onProcessingComplete) {
        onProcessingComplete(resultData);
      }

    } catch (err) {
      console.error("Error uploading/processing file:", err);
      let errorMessage = 'Processing failed. Please try again.';
      if (err.response && err.response.data && err.response.data.detail) {
        errorMessage = `Processing failed: ${err.response.data.detail}`;
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Processing timed out. The file might be too large or complex.';
      } else if (err.request) {
        errorMessage = 'Processing failed: No response from server. Is it running and accessible? Check CORS.';
      }
      setLocalError(errorMessage);
      if (onProcessingError) onProcessingError(errorMessage);
    } finally {
      setIsUploading(false);
    }
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
            <svg className="w-12 h-12 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m012.75h.008v.008H8.25v-.008zM8.25 9.75h.008v.008H8.25v-.008zM12 9.75h.008v.008H12v-.008zM12 12.75h.008v.008H12v-.008zM12 15.75h.008v.008H12v-.008zM15 9.75h.008v.008H15v-.008zM15 12.75h.008v.008H15v-.008zM15 15.75h.008v.008H15v-.008zM10.06 19.5H18c.966 0 1.75-.784 1.75-1.75V12a1.75 1.75 0 00-1.75-1.75H8.06l-2.874 2.873A.75.75 0 005.625 14.25v2.875c0 .966.784 1.75 1.75 1.75H10.5V21a.75.75 0 001.28.53l2.53-2.532a.75.75 0 01.47-.198H18.75a.75.75 0 00.75-.75V6.375a.75.75 0 00-.75-.75H13.5A1.125 1.125 0 0112.375 4.5V3a1.125 1.125 0 00-1.125-1.125H5.25A1.125 1.125 0 004.125 3v10.5" />
            </svg>
          </div>
          <p className="text-lg font-medium">{fileNameForDisplay}</p>
          <p className="text-sm text-gray-500">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleProcessDocument}
            disabled={isUploading}
          >
            {isUploading ? 'Processing...' : 'Process Document'}
          </button>
          <button 
            className="mt-4 ml-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            onClick={handleRemoveFile}
            disabled={isUploading}
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
            <input type="file" className="hidden" onChange={handleFileInput} accept="image/jpeg,image/png,image/gif,application/pdf"/>
          </label>
          <p className="mt-2 text-xs text-gray-500">
            Supported formats: JPG, PNG, GIF, PDF (up to 10MB)
          </p>
        </>
      )}
      {localError && <p className="text-center mt-2 text-red-500 text-sm">{localError}</p>}
    </div>
  );
};

export default UploadSection;