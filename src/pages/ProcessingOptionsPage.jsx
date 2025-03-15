import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { motion } from 'framer-motion';

const ProcessingOptionsPage = () => {
  const [activeOption, setActiveOption] = useState(null);
  const [summaryLength, setSummaryLength] = useState(20);

  const processingOptions = [
    {
      id: 'basic-advanced',
      title: 'Scanning Mode',
      description: 'Choose between Basic Scanning (faster) or Advanced Scanning (more accurate with AI enhancement).',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
  
    {
      id: 'summarization',
      title: 'Text Summarization',
      description: 'Generate concise summaries of your documents with adjustable length from 5% to 50% of the original text.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      ),
      color: 'bg-purple-500'
    },
    {
      id: 'translation',
      title: 'Translation Options',
      description: 'Translate your digitized Hebrew text into English with context-aware neural translation.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      color: 'bg-yellow-500'
    },
    {
      id: 'enhancement',
      title: 'Text Enhancement',
      description: 'Improve your text with spelling correction and structure improvements.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      color: 'bg-red-500'
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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-auto bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Processing Options</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Configure how Digi-Ktav processes your handwritten documents for optimal results.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <ul className="divide-y divide-gray-200">
                  {processingOptions.map((option, index) => (
                    <motion.li 
                      key={option.id}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <button
                        onClick={() => setActiveOption(option.id)}
                        className={`w-full px-4 py-4 flex items-center text-left transition-colors duration-200 ${
                          activeOption === option.id 
                            ? 'bg-gray-50 border-l-4 border-blue-500' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${option.color} text-white mr-4`}>
                          {option.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{option.title}</h3>
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
            
            <div className="lg:col-span-2">
              {currentOption && (
                <motion.div
                  key={currentOption.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden h-full"
                >
                  <div className={`h-2 ${currentOption.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <div className={`p-3 rounded-lg ${currentOption.color} text-white mr-4`}>
                        {currentOption.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">{currentOption.title}</h2>
                    </div>
                    
                    <p className="text-gray-600 mb-8">{currentOption.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
                      
                      {currentOption.id === 'basic-advanced' && (
                        <div className="space-y-6">
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center mb-2">
                              <input id="basic-scanning" name="scanning-mode" type="radio" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" defaultChecked />
                              <label htmlFor="basic-scanning" className="ml-2 block text-sm font-medium text-gray-700">Basic Scanning</label>
                            </div>
                            <p className="text-sm text-gray-500 ml-6">Faster processing with 75-79% accuracy. Best for clear handwriting and when speed is important.</p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center mb-2">
                              <input id="advanced-scanning" name="scanning-mode" type="radio" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                              <label htmlFor="advanced-scanning" className="ml-2 block text-sm font-medium text-gray-700">Advanced Scanning</label>
                            </div>
                            <p className="text-sm text-gray-500 ml-6">Uses AI to enhance recognition with 90% accuracy. Better for difficult handwriting but takes slightly longer.</p>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm text-gray-500 italic">Advanced Scanning is required for additional features like summarization, translation, and text enhancement.</p>
                          </div>
                        </div>
                      )}
                      
                      
                      {currentOption.id === 'summarization' && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Enable text summarization</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Summary Length</span>
                              <span className="text-sm font-medium text-purple-700">{displayPercentage}%</span>
                            </div>
                            <input
                              type="range"
                              min="5"
                              max="50"
                              value={summaryLength}
                              onChange={handleSliderChange}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>Very Concise (5%)</span>
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
                                  <span className="text-xs">{percent}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                            <h4 className="text-sm font-medium text-purple-800 mb-2">Summary Preview</h4>
                            <p className="text-xs text-gray-600">
                              {displayPercentage === 5 && "An ultra-concise summary with just the essential points (5% of original)."}
                              {displayPercentage === 20 && "A brief summary highlighting key information (20% of original)."}
                              {displayPercentage === 35 && "A balanced summary with moderate detail (35% of original)."}
                              {displayPercentage === 50 && "A comprehensive summary with most important details preserved (50% of original)."}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {currentOption.id === 'translation' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Enable translation to English</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                            </label>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Translation Style
                            </label>
                            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md">
                              <option value="literal">Literal (Word-for-word)</option>
                              <option value="natural" selected>Natural (Fluent English)</option>
                              <option value="formal">Formal/Academic</option>
                            </select>
                          </div>
                          <div className="mt-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="side-by-side" name="side-by-side" type="checkbox" className="focus:ring-yellow-500 h-4 w-4 text-yellow-600 border-gray-300 rounded" defaultChecked />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="side-by-side" className="font-medium text-gray-700">Display side-by-side view</label>
                                <p className="text-gray-500">Show both Hebrew original and English translation together</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {currentOption.id === 'enhancement' && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="spelling-correction" name="spelling-correction" type="checkbox" className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded" defaultChecked />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="spelling-correction" className="font-medium text-gray-700">Spelling correction</label>
                                <p className="text-gray-500">Fix misspellings and typos in the original text</p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="text-structure" name="text-structure" type="checkbox" className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded" />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="text-structure" className="font-medium text-gray-700">Text restructuring</label>
                                <p className="text-gray-500">Improve sentence structure and paragraph organization</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="track-changes" name="track-changes" type="checkbox" className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded" defaultChecked />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="track-changes" className="font-medium text-gray-700">Track changes</label>
                                <p className="text-gray-500">Highlight corrections for review</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className={`bg-${currentOption.color.split('-')[1]}-50 rounded-lg p-6`}>
                      <h3 className={`text-lg font-medium text-${currentOption.color.split('-')[1]}-900 mb-2`}>Pro Tip</h3>
                      <p className={`text-${currentOption.color.split('-')[1]}-700`}>
                        {currentOption.id === 'basic-advanced' && "Advanced Scanning works best for messy handwriting, while Basic Scanning is faster for clear, neat writing. Use Advanced Scanning if you plan to use features like summarization or translation."}
                        {currentOption.id === 'lang-detection' && "For documents with mixed languages, select 'Mixed' and our AI will detect language transitions automatically."}
                        {currentOption.id === 'summarization' && "Shorter summaries (5-20%) are perfect for getting the main points quickly, while longer summaries (35-50%) preserve more details and supporting information."}
                        {currentOption.id === 'translation' && "The 'Natural' translation style produces the most readable English text, while 'Literal' preserves the original sentence structure more closely."}
                        {currentOption.id === 'enhancement' && "For important documents, use the 'Track changes' option to review all corrections before finalizing."}
                        {currentOption.id === 'image-processing' && "If your document was photographed rather than scanned, enable all three options for best results."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              type="button" 
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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