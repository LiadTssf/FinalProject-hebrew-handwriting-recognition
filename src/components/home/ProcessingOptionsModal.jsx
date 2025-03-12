import React, { useState } from 'react';

const ProcessingOptionsModal = ({ onClose }) => {
  const [options, setOptions] = useState({
    language: 'hebrew',
    enhanceContrast: true,
    correctText: true,
    autoRotate: true
  });

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    
    setOptions({
      ...options,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save options and close
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">Processing Options</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              name="language"
              value={options.language}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="hebrew">Hebrew</option>
              <option value="english">English</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enhanceContrast"
                name="enhanceContrast"
                checked={options.enhanceContrast}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="enhanceContrast" className="ml-2 block text-sm text-gray-700">
                Enhance contrast for better recognition
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="correctText"
                name="correctText"
                checked={options.correctText}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="correctText" className="ml-2 block text-sm text-gray-700">
                Apply AI text correction
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoRotate"
                name="autoRotate"
                checked={options.autoRotate}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoRotate" className="ml-2 block text-sm text-gray-700">
                Auto-rotate document if needed
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcessingOptionsModal;