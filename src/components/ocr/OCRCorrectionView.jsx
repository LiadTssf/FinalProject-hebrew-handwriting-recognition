// src/components/info/OCRCorrectionView.jsx
import React, { useState, useEffect } from 'react';

const OCRCorrectionView = ({ 
    imageSrc, 
    initialText, 
    filename, 
    onBackToUpload, 
    onProceedToOptions // New prop to trigger modal
}) => {
  const [editedText, setEditedText] = useState(initialText || '');

  useEffect(() => {
    setEditedText(initialText || '');
  }, [initialText]);

  const handleTextChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleContinue = () => {
    if (onProceedToOptions) {
      onProceedToOptions(editedText); // Pass the current edited text
    }
  };

  if (!imageSrc) {
    // ... (no change to this part)
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-600">No image data to display. Please upload a document first.</p>
        {onBackToUpload && (
          <button 
            onClick={onBackToUpload}
            className="mt-4 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
          >
            Upload Another Document
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Review & Correct: {filename}</h2>
        {onBackToUpload && (
          <button 
            onClick={onBackToUpload}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Upload Another
          </button>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Original Image Section */}
        <div className="md:w-1/2 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow bg-white dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Original Document</h3>
          <div className="overflow-auto" style={{ maxHeight: '75vh' }}>
            <img 
              src={imageSrc} 
              alt={filename || "Original Document"} 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Editable Text Section */}
        <div className="md:w-1/2 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow bg-white dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Corrected Text (Editable)</h3>
          <textarea
            value={editedText}
            onChange={handleTextChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            style={{ 
              height: 'calc(75vh - 50px)', // Adjust height to leave space for button
              minHeight: '300px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '16px',
              whiteSpace: 'pre-wrap',
              direction: 'rtl',
              textAlign: 'right'
            }}
            placeholder="Recognized text will appear here..."
          />
          <button 
            onClick={handleContinue} // Changed from handleSave
            className="mt-4 w-full px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 focus:outline-none focus:ring-0 active:bg-green-800 transition duration-150 ease-in-out"
          >
            Continue to Processing Options
          </button>
        </div>
      </div>
    </div>
  );
};

export default OCRCorrectionView;