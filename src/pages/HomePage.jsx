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
          <h1 className="text-3xl font-bold mb-8 text-center">Upload Document</h1>
          
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