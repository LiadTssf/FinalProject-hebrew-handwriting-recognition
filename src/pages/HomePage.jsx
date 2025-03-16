import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import UploadSection from '../components/home/UploadSection';
import ProcessingOptionsModal from '../components/home/ProcessingOptionsModal';

const HomePage = () => {
  const [showProcessingOptions, setShowProcessingOptions] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Upload Document</h1>
            <h2 className="text-xl text-blue-600 font-semibold mb-3">Hebrew Handwriting to Digital Text</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Digi-Ktav transforms your handwritten Hebrew documents into editable digital text using AI. 
              Simply upload your document, choose your processing options, and get accurate results in seconds.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
            <div className="flex items-center text-blue-700 mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">How it works:</span>
            </div>
            <ol className="space-y-1 text-sm text-gray-600 ml-7 list-decimal mb-2">
              <li>Upload your handwritten Hebrew document</li>
              <li>Choose your Processing Options (Basic or Advanced Scanning)</li>
              <li>Our AI analyzes and recognizes your handwriting</li>
              <li>Review and download the digitized text</li>
            </ol>
          </div>
          
          <div className="relative">
            <UploadSection />
            
            <button 
              onClick={() => setShowProcessingOptions(true)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
              aria-label="Processing Settings"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </main>
      
      {showProcessingOptions && (
        <ProcessingOptionsModal onClose={() => setShowProcessingOptions(false)} />
      )}
    </div>
  );
};

export default HomePage;