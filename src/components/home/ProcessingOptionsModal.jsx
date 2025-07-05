import React, { useState } from 'react';

const ProcessingOptionsModal = ({ onClose, onSubmit }) => {
  const [summaryLength, setSummaryLength] = useState(20);
  const [options, setOptions] = useState({
    // Enhanced features
    enableSummarization: false,
    enableTranslation: false,
    enableSpellingCorrection: false,
    enableStructuring: false,
    
    // Translation options
    translationStyle: 'natural',
  });

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    
    setOptions({
      ...options,
      [name]: value
    });
  };

  const handleSliderChange = (e) => {
    setSummaryLength(Number(e.target.value));
  };

  // Get the appropriate percent display value for summary
  const getClosestSummaryPercentage = (value) => {
    const percentages = [5, 20, 35, 50];
    return percentages.reduce((prev, curr) => 
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };
  const displayPercentage = getClosestSummaryPercentage(summaryLength);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the selected options and summary length to the parent component
    const finalOptions = {
      ...options,
      summaryLength: displayPercentage // Use the display percentage value
    };
    if (onSubmit) {
      onSubmit(finalOptions);
    } else {
      onClose(finalOptions);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">Processing Options</h3>
          <button 
            onClick={() => onClose()}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {/* Enhanced Features Section */}
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 text-lg mb-2">Enhanced Features</h4>
              <p className="text-sm text-gray-600 mb-4">Select the AI-powered enhancements you'd like to apply to your scanned text.</p>

              {/* Summarization Feature */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm hover:shadow transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableSummarization"
                      name="enableSummarization"
                      checked={options.enableSummarization}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enableSummarization" className="ml-3 block font-medium text-sm text-gray-700">
                      Text Summarization
                    </label>
                  </div>
                </div>
                <p className="text-xs text-gray-500 ml-8 mb-2">Automatically generate concise summaries of scanned documents.</p>
                
                {options.enableSummarization && (
                  <div className="mt-3 ml-8 bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-700 font-medium">Summary Length</span>
                      <span className="text-sm font-bold text-gray-700 bg-gray-200 px-2 py-1 rounded">{displayPercentage}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={summaryLength}
                      onChange={handleSliderChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>Brief (5%)</span>
                      <span>Detailed (50%)</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Translation Feature */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm hover:shadow transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableTranslation"
                      name="enableTranslation"
                      checked={options.enableTranslation}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="enableTranslation" className="ml-3 block font-medium text-sm text-gray-700">
                      Hebrew to English Translation
                    </label>
                  </div>
                </div>
                <p className="text-xs text-gray-500 ml-8 mb-2">Translate Hebrew text into English with different translation styles.</p>
                
                {options.enableTranslation && (
                  <div className="mt-3 ml-8 bg-gray-50 p-3 rounded-md">
                    <div className="mb-3">
                      <label className="block text-sm text-gray-700 font-medium mb-1">Translation Style</label>
                      <select
                        name="translationStyle"
                        value={options.translationStyle}
                        onChange={handleChange}
                        className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="literal">Literal (Word-for-word)</option>
                        <option value="natural">Natural (Fluent English)</option>
                        <option value="formal">Formal/Academic</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Text Enhancement Features */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow transition-shadow">
                <h5 className="font-medium text-gray-900 mb-3">Text Enhancement</h5>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableSpellingCorrection"
                        name="enableSpellingCorrection"
                        checked={options.enableSpellingCorrection}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="enableSpellingCorrection" className="ml-3 block text-sm text-gray-700">
                        Spelling Correction
                      </label>
                    </div>
                  </div>
                  <div className="ml-8 text-xs text-gray-500">Automatically detect and fix spelling errors in the scanned text.</div>
                  
                  <div className="border-t border-gray-100 pt-4"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="enableStructuring"
                        name="enableStructuring"
                        checked={options.enableStructuring}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="enableStructuring" className="ml-3 block text-sm text-gray-700">
                        Text Restructuring
                      </label>
                    </div>
                  </div>
                  <div className="ml-8 text-xs text-gray-500">Improve document formatting and structure for better readability.</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 mt-6 border-t">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Apply Enhancements
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcessingOptionsModal;