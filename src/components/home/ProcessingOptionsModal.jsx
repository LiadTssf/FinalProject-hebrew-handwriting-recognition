import React, { useState } from 'react';

const ProcessingOptionsModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('scanning');
  const [summaryLength, setSummaryLength] = useState(20);
  const [options, setOptions] = useState({
    // Scanning mode
    scanningMode: 'basic', // 'basic' or 'advanced'
    
    // Enhanced features (require Advanced scanning)
    enableSummarization: false,
    enableTranslation: false,
    enableSpellingCorrection: false,
    enableStructuring: false,
    
    // Translation options
    translationStyle: 'natural',
    sideBySideView: true,
    
    // Track changes
    trackChanges: true,
  });

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    
    // Special handling for scanning mode toggle
    if (name === 'scanningMode' && value === 'basic') {
      // Disable enhanced features when switchin  g to basic scanning
      setOptions({
        ...options,
        [name]: value,
        enableSummarization: false,
        enableTranslation: false,
        enableSpellingCorrection: false,
        enableStructuring: false
      });
    } else {
      setOptions({
        ...options,
        [name]: value
      });
    }
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
    // Save options and close
    onClose(options);
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
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveTab('scanning')}
              className={`px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === 'scanning'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Scanning Mode
            </button>
            <button
              onClick={() => setActiveTab('enhanced')}
              className={`px-4 py-2 border-b-2 font-medium text-sm ${
                activeTab === 'enhanced'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Enhanced Features
            </button>
          </nav>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {/* Scanning Mode Tab */}
          {activeTab === 'scanning' && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Choose Scanning Mode</h4>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-1">
                    <input 
                      id="basic-scanning"
                      name="scanningMode"
                      type="radio"
                      value="basic"
                      checked={options.scanningMode === 'basic'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="basic-scanning" className="ml-2 block text-sm font-medium text-gray-700">
                      Basic Scanning
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">Faster processing with 75-79% accuracy. Best for clear handwriting.</p>
                </div>
                
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-1">
                    <input 
                      id="advanced-scanning"
                      name="scanningMode"
                      type="radio"
                      value="advanced"
                      checked={options.scanningMode === 'advanced'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="advanced-scanning" className="ml-2 block text-sm font-medium text-gray-700">
                      Advanced Scanning
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">Uses AI to enhance recognition with 90% accuracy. Required for enhanced features.</p>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-gray-500 italic">
                Advanced Scanning is required for summarization, translation, and text enhancement features.
              </div>
            </div>
          )}

          {/* Enhanced Features Tab */}
          {activeTab === 'enhanced' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 text-lg mb-2">Enhanced Features</h4>
              

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
                        disabled={options.scanningMode === 'basic'}
                        className={`h-5 w-5 ${
                          options.scanningMode === 'advanced' 
                            ? 'text-gray-500 focus:ring-gray-400' 
                            : 'text-gray-400'
                        } border-gray-300 rounded`}
                      />
                      <label htmlFor="enableSummarization" className={`ml-3 block font-medium text-sm ${options.scanningMode === 'basic' ? 'text-gray-400' : 'text-gray-700'}`}>
                        Text Summarization
                      </label>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 ml-8 mb-2">Automatically generate concise summaries of scanned documents.</p>
                  
                  {options.enableSummarization && options.scanningMode === 'advanced' && (
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
                        disabled={options.scanningMode === 'basic'}
                        className={`h-5 w-5 ${
                          options.scanningMode === 'advanced' 
                            ? 'text-gray-500 focus:ring-gray-400' 
                            : 'text-gray-400'
                        } border-gray-300 rounded`}
                      />
                      <label htmlFor="enableTranslation" className={`ml-3 block font-medium text-sm ${options.scanningMode === 'basic' ? 'text-gray-400' : 'text-gray-700'}`}>
                        Hebrew to English Translation
                      </label>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 ml-8 mb-2">Translate Hebrew text into English with different translation styles.</p>
                  
                  {options.enableTranslation && options.scanningMode === 'advanced' && (
                    <div className="mt-3 ml-8 bg-gray-50 p-3 rounded-md">
                      <div className="mb-3">
                        <label className="block text-sm text-gray-700 font-medium mb-1">Translation Style</label>
                        <select
                          name="translationStyle"
                          value={options.translationStyle}
                          onChange={handleChange}
                          className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-gray-400 focus:ring-gray-400"
                        >
                          <option value="literal">Literal (Word-for-word)</option>
                          <option value="natural">Natural (Fluent English)</option>
                          <option value="formal">Formal/Academic</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center bg-white p-2 rounded border border-gray-200">
                        <input
                          type="checkbox"
                          id="sideBySideView"
                          name="sideBySideView"
                          checked={options.sideBySideView}
                          onChange={handleChange}
                          className="h-4 w-4 text-gray-500 focus:ring-gray-400 border-gray-300 rounded"
                        />
                        <label htmlFor="sideBySideView" className="ml-2 block text-sm text-gray-700">
                          Display side-by-side view
                        </label>
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
                          disabled={options.scanningMode === 'basic'}
                          className={`h-5 w-5 ${
                            options.scanningMode === 'advanced' 
                              ? 'text-gray-500 focus:ring-gray-400' 
                              : 'text-gray-400'
                          } border-gray-300 rounded`}
                        />
                        <label htmlFor="enableSpellingCorrection" className={`ml-3 block text-sm ${options.scanningMode === 'basic' ? 'text-gray-400' : 'text-gray-700'}`}>
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
                          disabled={options.scanningMode === 'basic'}
                          className={`h-5 w-5 ${
                            options.scanningMode === 'advanced' 
                              ? 'text-gray-500 focus:ring-gray-400' 
                              : 'text-gray-400'
                          } border-gray-300 rounded`}
                        />
                        <label htmlFor="enableStructuring" className={`ml-3 block text-sm ${options.scanningMode === 'basic' ? 'text-gray-400' : 'text-gray-700'}`}>
                          Text Restructuring
                        </label>
                      </div>
                    </div>
                    <div className="ml-8 text-xs text-gray-500">Improve document formatting and structure for better readability.</div>
                  </div>
                  
                  {(options.enableSpellingCorrection || options.enableStructuring) && options.scanningMode === 'advanced' && (
                    <div className="mt-4 ml-8 bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="trackChanges"
                          name="trackChanges"
                          checked={options.trackChanges}
                          onChange={handleChange}
                          className="h-4 w-4 text-gray-500 focus:ring-gray-400 border-gray-300 rounded"
                        />
                        <label htmlFor="trackChanges" className="ml-2 block text-sm text-gray-700 font-medium">
                          Track changes for review
                        </label>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 ml-6">See all modifications made to your document with change tracking.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
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
              Apply Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcessingOptionsModal;