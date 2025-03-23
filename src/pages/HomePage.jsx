import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';  // Assuming this is where your auth context is
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import UploadSection from '../components/home/UploadSection';
import ProcessingOptionsModal from '../components/home/ProcessingOptionsModal';

const HomePage = () => {
  const [showProcessingOptions, setShowProcessingOptions] = useState(false);
  const { currentUser } = useAuth();  // Get the current user from Firebase Auth
  
  // Check if user is logged in
  const isGuest = !currentUser;
  
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
            </p>
          </div>
          
          {/* "How it works" box - shown to both guests and logged-in users */}
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
          
          
          {/* Upload section with settings button - for both guests and users */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 relative">
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

          {/* Guest notice - only shown to guests */}
          {isGuest && (
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200 mt-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-800 text-sm">
                  You're using Digi-Ktav as a guest. You can use all processing features, but be aware that:
                  <ul className="list-disc ml-5 mt-1 text-blue-700">
                    <li>Model calibration for your personal handwriting style is unavailable</li>
                    <li>Documents cannot be saved to our cloud storage</li>
                    <li>Any work will be lost after you leave the site</li>
                  </ul>
                  <span className="block mt-2">
                    <Link to="/signup" className=" hover:text-gray-300 hover:underline">
                      Create an account to unlock these features.
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Modal shows for both guests and logged-in users */}
      {showProcessingOptions && (
        <ProcessingOptionsModal onClose={() => setShowProcessingOptions(false)} />
      )}
      
    </div>
  );
};

export default HomePage;