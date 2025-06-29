// Updated HomePage.jsx with user preferences
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import UploadSection from '../components/home/UploadSection';
import ProcessingOptionsModal from '../components/home/ProcessingOptionsModal';
import OCRCorrectionView from '../components/ocr/OCRCorrectionView';
import FinalTextView from '../components/ocr/FinalTextView';
import { callServerForEnhancements, parseServerResponse } from '../services/enhancementService';
import { getUserPreferences, markPhotoInstructionsAsSeen } from '../services/firebaseService';

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
  
  // User preferences state
  const [userPreferences, setUserPreferences] = useState({ hasSeenPhotoInstructions: false });
  const [showInstructionCheckbox, setShowInstructionCheckbox] = useState(false);

  // Load user preferences on component mount
  useEffect(() => {
    const loadUserPreferences = async () => {
      if (currentUser) {
        try {
          const preferences = await getUserPreferences(currentUser.uid);
          setUserPreferences(preferences);
        } catch (error) {
          console.error('Failed to load user preferences:', error);
        }
      }
    };

    loadUserPreferences();
  }, [currentUser]);

  // Handle marking instructions as seen
  const handleMarkInstructionsAsSeen = async () => {
    if (currentUser) {
      try {
        await markPhotoInstructionsAsSeen(currentUser.uid);
        setUserPreferences(prev => ({ ...prev, hasSeenPhotoInstructions: true }));
        setShowInstructionCheckbox(false);
      } catch (error) {
        console.error('Failed to mark instructions as seen:', error);
      }
    }
  };

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
        appliedOptions: selectedOptions
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

  // Determine which version of the photo instructions to show
  const showAggressiveWarning = !userPreferences.hasSeenPhotoInstructions;

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

              {/* Photo Instructions - Conditional Styling */}
              {showAggressiveWarning ? (
                // Aggressive warning for first-time users
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                        📸 IMPORTANT: Photo Requirements
                      </h3>
                      <p className="text-yellow-700 dark:text-yellow-300 mt-1 font-medium">
                        You MUST photograph the <strong>entire A4 paper</strong> - not just the written text. 
                        The system won't work properly otherwise.
                      </p>
                      <Link 
                        to="/info/photo-instructions" 
                        className="inline-flex items-center mt-2 text-sm font-medium text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100 underline"
                      >
                        See detailed instructions
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      
                      {/* Checkbox to mark as read */}
                      {!isGuest && (
                        <div className="mt-3 pt-3 border-t border-yellow-300 dark:border-yellow-600">
                          <button
                            onClick={() => setShowInstructionCheckbox(!showInstructionCheckbox)}
                            className="text-sm text-yellow-700 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-200 underline"
                          >
                            I understand these requirements
                          </button>
                          
                          {showInstructionCheckbox && (
                            <div className="mt-2 p-3 bg-yellow-100 dark:bg-yellow-800/30 rounded-md">
                              <div className="flex items-start">
                                <input
                                  type="checkbox"
                                  id="understand-instructions"
                                  className="mt-1 mr-2"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      handleMarkInstructionsAsSeen();
                                    }
                                  }}
                                />
                                <label htmlFor="understand-instructions" className="text-xs text-yellow-800 dark:text-yellow-200">
                                  I have read and understand that I must photograph the entire A4 page. 
                                  Don't show this warning again.
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // Subtle reminder for returning users
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                  <Link 
                    to="/info/photo-instructions" 
                    className="flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-gray-750 p-2 rounded-md transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Photo Guidelines: Full A4 page required
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
                 <div className="flex items-center text-blue-700 dark:text-blue-400 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">How it works:</span>
                    </div>
                    <ol className="space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-7 list-decimal mb-2">
                    <li>Upload your handwritten Hebrew document (following the photo guidelines above)</li>
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

          {/* Rest of your existing component code remains the same */}
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