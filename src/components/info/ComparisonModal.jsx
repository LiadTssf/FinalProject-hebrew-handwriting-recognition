import React from 'react';

const ComparisonModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6 rounded-t-xl">
          <h2 className="text-2xl font-bold text-white">Basic Scanning vs. Advanced Scanning</h2>
          <p className="text-blue-100 mt-1">Understanding the key differences between our scanning modes</p>
        </div>
        
        {/* Content */}
        <div className="p-8">
          {/* Visual comparison with example */}
          <div className="mb-8 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900">Basic Scanning</h3>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">75-79% Accuracy</span>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                  <div className="text-center font-semibold mb-2 text-gray-500 text-sm">Original Handwriting</div>
                  <div className="h-24 bg-gray-50 flex items-center justify-center rounded border border-gray-200">
                    <p className="text-gray-800 text-lg font-serif">אבא הלך לעבודה</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-center font-semibold mb-2 text-gray-500 text-sm">Basic Scanning Output</div>
                  <div className="h-24 bg-gray-50 flex items-center justify-center rounded border border-gray-200">
                    <p className="text-gray-800 text-lg">אכא הלד לעכורה</p>
                    <span className="text-red-500 ml-2 text-sm">(errors remain)</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-indigo-900">Advanced Scanning</h3>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">90% Accuracy</span>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                  <div className="text-center font-semibold mb-2 text-gray-500 text-sm">Original Handwriting</div>
                  <div className="h-24 bg-gray-50 flex items-center justify-center rounded border border-gray-200">
                    <p className="text-gray-800 text-lg font-serif">אבא הלך לעבודה</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-center font-semibold mb-2 text-gray-500 text-sm">Advanced Scanning Output</div>
                  <div className="h-24 bg-gray-50 flex items-center justify-center rounded border border-gray-200">
                    <p className="text-gray-800 text-lg">אבא הלך לעבודה</p>
                    <span className="text-green-500 ml-2 text-sm">(errors corrected)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Comparison Table */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Differences</h3>
          
          <div className="overflow-hidden rounded-xl border border-gray-200 mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Basic Scanning</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">Advanced Scanning</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Technology</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">CNN Only</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">CNN + Gemini LLM</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Accuracy</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">75-79%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">90%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Processing Time</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">0.8 seconds/page</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1.5 seconds/page</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Error Correction</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      None
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Contextual
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Enhanced Features Access</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Recommendation */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">When to Choose Which Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Choose Basic Scanning for:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Fast processing of clean handwriting
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Batch processing of multiple documents
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    When preserving original text exactly is important
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-indigo-800 mb-2">Choose Advanced Scanning for:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-indigo-500 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Difficult or messy handwriting
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-indigo-500 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Important documents requiring high accuracy
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-indigo-500 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    When you need access to enhanced features (translation, summarization)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              onClick={onClose}
            >
              Close Comparison
            </button>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Try Both Modes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;