import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import { motion } from 'framer-motion';

const ProcessingOptionsPage = () => {
  const [activeOption, setActiveOption] = useState(null);

  const processingOptions = [
    {
      id: 'lang-detection',
      title: 'Language Detection',
      description: 'Automatically detects the language of the handwritten text to optimize recognition accuracy.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      id: 'noise-reduction',
      title: 'Noise Reduction',
      description: 'Removes background noise and artifacts from the scanned document to improve text clarity.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'bg-green-500'
    },
    {
      id: 'auto-correction',
      title: 'AI Text Correction',
      description: 'Uses AI algorithms to correct recognition errors based on context and language patterns.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
      color: 'bg-purple-500'
    },
    {
      id: 'deskew',
      title: 'Auto-Rotation & Deskew',
      description: 'Automatically rotates and straightens the document to ensure optimal text recognition.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      color: 'bg-yellow-500'
    },
    {
      id: 'layout-analysis',
      title: 'Layout Analysis',
      description: 'Identifies and preserves document structure including paragraphs, columns, and text flow.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      color: 'bg-red-500'
    },
    {
      id: 'custom-dictionary',
      title: 'Custom Dictionary',
      description: 'Applies user-defined dictionaries to improve recognition of specialized terminology.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'bg-indigo-500'
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
                      
                      {currentOption.id === 'lang-detection' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Enable automatic language detection</span>
                            <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-6"></span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Default Language
                            </label>
                            <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                              <option value="hebrew">Hebrew</option>
                              <option value="english">English</option>
                              <option value="mixed">Mixed (Hebrew & English)</option>
                            </select>
                          </div>
                        </div>
                      )}
                      
                      {currentOption.id === 'auto-correction' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Apply contextual corrections</span>
                            <div className="relative inline-block w-12 h-6 rounded-full bg-blue-500 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 transform translate-x-6"></span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Correction Aggressiveness
                            </label>
                            <input 
                              type="range" 
                              min="1" 
                              max="10" 
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                              defaultValue="7"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>Conservative</span>
                              <span>Balanced</span>
                              <span>Aggressive</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Similar settings sections for other options */}
                      {['noise-reduction', 'deskew', 'layout-analysis', 'custom-dictionary'].includes(currentOption.id) && (
                        <div className="text-gray-500 italic">
                          Settings for {currentOption.title} would appear here.
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-blue-900 mb-2">Pro Tip</h3>
                      <p className="text-blue-700">
                        {currentOption.id === 'lang-detection' && "For documents with mixed languages, select 'Mixed' and our AI will detect language transitions automatically."}
                        {currentOption.id === 'noise-reduction' && "Noise reduction works best on documents with consistent background texture. Adjust based on your source material quality."}
                        {currentOption.id === 'auto-correction' && "Higher correction levels work well for standard text, but use conservative settings for specialized terminology or names."}
                        {currentOption.id === 'deskew' && "This feature is particularly helpful for documents photographed at an angle rather than scanned flat."}
                        {currentOption.id === 'layout-analysis' && "Layout analysis preserves the original document structure in your digitized output, including paragraph breaks and indentation."}
                        {currentOption.id === 'custom-dictionary' && "Upload domain-specific word lists to significantly improve recognition accuracy for technical or specialized content."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProcessingOptionsPage;