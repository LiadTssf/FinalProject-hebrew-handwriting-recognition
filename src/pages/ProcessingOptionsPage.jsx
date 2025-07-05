import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { motion } from 'framer-motion';

const ProcessingOptionsPage = () => {
  const [activeOption, setActiveOption] = useState(null);
  const [summaryLength, setSummaryLength] = useState(20);
  const [mobileOptionView, setMobileOptionView] = useState(true);

  const processingOptions = [
    {
      id: 'summarization',
      title: 'Text Summarization',
      description: 'Generate concise summaries of your documents with adjustable length from 5% to 50% of the original text.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      ),
      color: 'bg-purple-500'
    },
    {
      id: 'translation',
      title: 'Hebrew to English Translation',
      description: 'Translate your digitized Hebrew text into English with different translation styles.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      color: 'bg-yellow-500'
    },
    {
      id: 'enhancement',
      title: 'Text Enhancement',
      description: 'Improve your text with spelling correction and structure improvements for better readability.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: 'bg-green-500'
    }
  ];

  useEffect(() => {
    // Set the first option as active by default
    if (processingOptions.length > 0 && !activeOption) {
      setActiveOption(processingOptions[0].id);
    }
  }, []);

  // Find the currently active option
  const currentOption = processingOptions.find(option => option.id === activeOption);

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setSummaryLength(value);
  };

  // Get the appropriate percent display value for summary
  const getClosestSummaryPercentage = (value) => {
    const percentages = [5, 20, 35, 50];
    return percentages.reduce((prev, curr) => 
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };
  const displayPercentage = getClosestSummaryPercentage(summaryLength);

  // Toggle between options view and settings view on mobile
  const toggleMobileView = () => {
    setMobileOptionView(!mobileOptionView);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6 md:mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Processing Options</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Configure AI-powered enhancements to apply to your digitized Hebrew text.
            </p>
          </motion.div>
          
          {/* Mobile navigation toggle button */}
          <div className="md:hidden mb-4 flex justify-center">
            <button
              onClick={toggleMobileView}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {mobileOptionView ? (
                <>
                  <span>Show Settings for {currentOption?.title}</span>
                  <svg className="ml-2 -mr-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <>
                  <svg className="mr-2 -ml-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Back to Options</span>
                </>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Options Panel - Always visible on desktop, conditionally on mobile */}
            <div className={`lg:col-span-1 ${!mobileOptionView ? 'hidden md:block' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              >
                <ul className="divide-y divide-gray-200">
                  {processingOptions.map((option, index) => (
                    <motion.li 
                      key={option.id}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <button
                        onClick={() => {
                          setActiveOption(option.id);
                          // On mobile, switch to settings view when selecting an option
                          if (window.innerWidth < 768) {
                            setMobileOptionView(false);
                          }
                        }}
                        className={`w-full px-4 py-4 flex items-center text-left transition-colors duration-200 ${
                          activeOption === option.id 
                            ? 'bg-gray-50 border-l-4 border-blue-500' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-3 rounded-lg ${option.color} text-white mr-4`}>
                          {option.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 text-base">{option.title}</h3>
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            {/* Settings Panel - Always visible on desktop, conditionally on mobile */}
            <div className={`lg:col-span-2 ${mobileOptionView ? 'hidden md:block' : ''}`}>
              {currentOption && (
                <motion.div
                  key={currentOption.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 h-full"
                >
                  <div className={`h-2 ${currentOption.color}`}></div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center mb-4 md:mb-6">
                      <div className={`p-3 md:p-3 rounded-lg ${currentOption.color} text-white mr-3 md:mr-4`}>
                        {currentOption.icon}
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900">{currentOption.title}</h2>
                    </div>
                    
                    <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-8">{currentOption.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
                      <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-3 md:mb-4">Settings</h3>
                      
                      {currentOption.id === 'summarization' && (
                        <div className="space-y-4 md:space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-base md:text-base text-gray-700">Enable text summarization</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" />
                              <div className="w-11 h-6 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm md:text-base text-gray-600">Summary Length</span>
                              <span className="text-sm md:text-base font-medium text-purple-700">{displayPercentage}%</span>
                            </div>
                            <input
                              type="range"
                              min="5"
                              max="50"
                              value={summaryLength}
                              onChange={handleSliderChange}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-1">
                              <span>Brief (5%)</span>
                              <span>Detailed (50%)</span>
                            </div>
                            
                            {/* Slider markers for specific percentages */}
                            <div className="relative h-4 mt-1">
                              {[5, 20, 35, 50].map(percent => (
                                <div 
                                  key={percent} 
                                  className={`absolute transform -translate-x-1/2 cursor-pointer ${percent === displayPercentage ? 'text-purple-600 font-medium' : 'text-gray-400'}`}
                                  style={{ left: `${(percent - 5) / 45 * 100}%` }}
                                  onClick={() => setSummaryLength(percent)}
                                >
                                  <div className={`h-2 w-1 mx-auto mb-1 ${percent === displayPercentage ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
                                  <span className="text-sm">{percent}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-purple-50 p-3 md:p-4 rounded-lg border border-purple-100">
                            <h4 className="text-sm md:text-base font-medium text-purple-800 mb-1 md:mb-2">Summary Preview</h4>
                            <p className="text-sm md:text-sm text-gray-600">
                              {displayPercentage === 5 && "An ultra-concise summary with just the essential points (5% of original)."}
                              {displayPercentage === 20 && "A brief summary highlighting key information (20% of original)."}
                              {displayPercentage === 35 && "A balanced summary with moderate detail (35% of original)."}
                              {displayPercentage === 50 && "A comprehensive summary with most important details preserved (50% of original)."}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {currentOption.id === 'translation' && (
                        <div className="space-y-3 md:space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-base md:text-base text-gray-700">Enable Hebrew to English translation</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" />
                              <div className="w-11 h-6 md:w-11 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 md:after:h-5 md:after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                            </label>
                          </div>
                          <div>
                            <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                              Translation Style
                            </label>
                            <select className="block w-full pl-3 pr-10 py-2 text-base md:text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 rounded-md">
                              <option value="literal">Literal (Word-for-word)</option>
                              <option value="natural" selected>Natural (Fluent English)</option>
                              <option value="formal">Formal/Academic</option>
                            </select>
                            <p className="text-sm text-gray-500 mt-1">Choose how the Hebrew text should be translated to English.</p>
                          </div>
                          
                          <div className="bg-yellow-50 p-3 md:p-4 rounded-lg border border-yellow-100">
                            <h4 className="text-sm md:text-base font-medium text-yellow-800 mb-1 md:mb-2">Translation Styles</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li><strong>Literal:</strong> Word-for-word translation maintaining Hebrew structure</li>
                              <li><strong>Natural:</strong> Fluent English that sounds natural to English speakers</li>
                              <li><strong>Formal:</strong> Academic and professional language style</li>
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {currentOption.id === 'enhancement' && (
                        <div className="space-y-4 md:space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="spelling-correction" name="spelling-correction" type="checkbox" className="focus:ring-green-500 h-5 w-5 md:h-5 md:w-5 text-green-600 border-gray-300 rounded" defaultChecked />
                              </div>
                              <div className="ml-2 md:ml-3 text-sm">
                                <label htmlFor="spelling-correction" className="font-medium text-sm md:text-base text-gray-700">Spelling Correction</label>
                                <p className="text-sm text-gray-500">Automatically detect and fix spelling errors in the original Hebrew text</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="text-structure" name="text-structure" type="checkbox" className="focus:ring-green-500 h-5 w-5 md:h-5 md:w-5 text-green-600 border-gray-300 rounded" />
                              </div>
                              <div className="ml-2 md:ml-3 text-sm">
                                <label htmlFor="text-structure" className="font-medium text-sm md:text-base text-gray-700">Text Restructuring</label>
                                <p className="text-sm text-gray-500">Improve document formatting and structure for better readability while preserving all content</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-green-50 p-3 md:p-4 rounded-lg border border-green-100">
                            <h4 className="text-sm md:text-base font-medium text-green-800 mb-1 md:mb-2">Enhancement Details</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li><strong>Spelling:</strong> Fixes OCR errors and actual misspellings without changing meaning</li>
                              <li><strong>Restructuring:</strong> Improves paragraph breaks, sentence flow, and organization like a professor would</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className={`bg-${currentOption.color.split('-')[1]}-50 rounded-lg p-3 md:p-6`}>
                      <h3 className={`text-lg md:text-lg font-medium text-${currentOption.color.split('-')[1]}-900 mb-1 md:mb-2`}>Pro Tip</h3>
                      <p className={`text-sm md:text-base text-${currentOption.color.split('-')[1]}-700`}>
                        {currentOption.id === 'summarization' && "Shorter summaries (5-20%) are perfect for getting the main points quickly, while longer summaries (35-50%) preserve more details and supporting information."}
                        {currentOption.id === 'translation' && "The 'Natural' translation style produces the most readable English text, while 'Literal' preserves the original Hebrew sentence structure more closely. 'Formal' is best for academic or professional documents."}
                        {currentOption.id === 'enhancement' && "Text restructuring acts like a professor helping organize your ideas better without losing any information. Use both spelling correction and restructuring together for the best results."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="mt-6 md:mt-8 flex justify-end">
            <button 
              type="button" 
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProcessingOptionsPage;