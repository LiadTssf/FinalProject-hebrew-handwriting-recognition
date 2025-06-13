// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import UploadSection from '../components/home/UploadSection';
import ProcessingOptionsModal from '../components/home/ProcessingOptionsModal';
import OCRCorrectionView from '../components/ocr/OCRCorrectionView';
import FinalTextView from '../components/ocr/FinalTextView';
import { callServerForEnhancements, parseServerResponse } from '../services/enhancementService';

const HomePage = () => {
  const { currentUser } = useAuth();
  const isGuest = !currentUser;

  const [appState, setAppState] = useState('upload');
  const [initialOcrResult, setInitialOcrResult] = useState(null);
  const [userCorrectedText, setUserCorrectedText] = useState('');
  const [processingOptions, setProcessingOptions] = useState(null);
  const [enhancedResult, setEnhancedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [processingError, setProcessingError] = useState('');

  const handleProcessingStart = () => {
    setIsLoading(true);
    setLoadingMessage('Processing your document...');
    setProcessingError('');
    setInitialOcrResult(null);
  };

  const handleProcessingComplete = (result) => {
    setIsLoading(false);
    setProcessingError('');
    setInitialOcrResult(result);
    setUserCorrectedText(result.recognizedText);
    setAppState('correcting');
  };

  const handleProcessingError = (errorMsg) => {
    setIsLoading(false);
    setProcessingError(errorMsg);
    setInitialOcrResult(null);
    setAppState('upload'); 
  };

  const handleProceedToOptions = (correctedTextFromUser) => {
    console.log("HomePage: Proceeding to options. Corrected text length:", correctedTextFromUser.length);
    setUserCorrectedText(correctedTextFromUser);
    setAppState('options');
  };

  const handleProcessingOptionsSubmit = async (selectedOptions) => {
    console.log("HomePage: Processing options submitted:", selectedOptions);
    setProcessingOptions(selectedOptions);
    setAppState('enhancing');
    setIsLoading(true);
    setLoadingMessage('Applying AI enhancements to your text...');
    
    try {
      console.log("📝 Calling server for enhancements with text:", userCorrectedText);
      console.log("⚙️ With options:", selectedOptions);
      
      const enhancedText = await callServerForEnhancements(userCorrectedText, selectedOptions);
      const parsedResult = parseServerResponse(enhancedText);
      
      setEnhancedResult({
        rawResponse: enhancedText,
        parsed: parsedResult,
        originalText: userCorrectedText,
        appliedOptions: selectedOptions // Make sure this is set correctly
      });
      
      console.log("✅ Enhancement complete, applied options:", selectedOptions);
      setAppState('final_view');
    } catch (err) {
      console.error("❌ Error during enhancement:", err);
      setProcessingError("Failed to apply AI enhancements. Please try again.");
      setAppState('correcting');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleProcessingOptionsClose = () => {
    console.log("HomePage: Processing options modal closed by user.");
    setAppState('correcting'); 
  };

  const handleBackToUpload = () => {
    setInitialOcrResult(null);
    setUserCorrectedText('');
    setProcessingOptions(null);
    setEnhancedResult(null);
    setIsLoading(false);
    setProcessingError('');
    setAppState('upload');
  };

  const handleBackToCorrection = () => {
    setEnhancedResult(null);
    setProcessingOptions(null);
    setAppState('correcting');
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          
          {appState === 'upload' && !isLoading && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">Upload Document</h1>
                <h2 className="text-xl text-blue-600 font-semibold mb-3">Hebrew Handwriting to Digital Text</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Digi-Ktav transforms your handwritten Hebrew documents into editable digital text using AI. 
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
                 <div className="flex items-center text-blue-700 dark:text-blue-400 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">How it works:</span>
                    </div>
                    <ol className="space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-7 list-decimal mb-2">
                    <li>Upload your handwritten Hebrew document</li>
                    <li>Review and correct the recognized text</li>
                    <li>Choose AI enhancements (summarization, translation, etc.)</li>
                    <li>Download your enhanced digital text</li>
                 </ol>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 relative">
                <UploadSection 
                  onProcessingStart={handleProcessingStart}
                  onProcessingComplete={handleProcessingComplete}
                  onProcessingError={handleProcessingError}
                />
              </div>

              {isGuest && ( 
                <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-blue-200 dark:border-blue-700 mt-6">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-blue-800 dark:text-blue-300 text-sm">
                      You're using Digi-Ktav as a guest. You can use all processing features, but be aware that:
                      <ul className="list-disc ml-5 mt-1 text-blue-700 dark:text-blue-400">
                        <li>Documents cannot be saved to our cloud storage</li>
                        <li>Any work will be lost after you leave the site</li>
                      </ul>
                      <span className="block mt-2">
                        <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                          Create an account to unlock these features.
                        </Link>
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {isLoading && (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
              <p className="mt-4 text-lg text-blue-600 dark:text-blue-300">{loadingMessage}</p>
            </div>
          )}
          
          {processingError && !isLoading && (
             <div className="text-center py-10 bg-red-50 dark:bg-red-900 p-4 rounded-lg border border-red-200 dark:border-red-700">
                <p className="mt-4 text-lg text-red-600 dark:text-red-300">Error: {processingError}</p>
                <button 
                    onClick={handleBackToUpload}
                    className="mt-4 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                >
                    Try Uploading Again
                </button>
             </div>
          )}

          {appState === 'correcting' && initialOcrResult && !isLoading && !processingError && (
            <OCRCorrectionView 
              imageSrc={initialOcrResult.imageSrc}
              initialText={userCorrectedText}
              filename={initialOcrResult.filename}
              onBackToUpload={handleBackToUpload}
              onProceedToOptions={handleProceedToOptions}
            />
          )}

          {appState === 'options' && (
            <ProcessingOptionsModal 
                onClose={handleProcessingOptionsClose} 
                onSubmit={handleProcessingOptionsSubmit}
            />
          )}

          {appState === 'final_view' && enhancedResult && !isLoading && !processingError && (
             <FinalTextView
                originalImageSrc={initialOcrResult?.imageSrc}
                enhancedText={enhancedResult.rawResponse}
                parsedResult={enhancedResult.parsed}
                originalText={enhancedResult.originalText}
                appliedOptions={enhancedResult.appliedOptions}
                filename={initialOcrResult?.filename}
                onBackToUpload={handleBackToUpload}
                onBackToCorrection={handleBackToCorrection}
             />
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;