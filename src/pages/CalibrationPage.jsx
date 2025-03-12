import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

const CalibrationPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  // Store selectedSheetType in useRef to avoid component rerenders when it changes
  const selectedSheetTypeRef = useRef('alphabet');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dropAreaRef = useRef(null);
  const dragCounterRef = useRef(0);
  const dragTimeoutRef = useRef(null);
  
  const sheetTypes = [
    { 
      id: 'alphabet', 
      name: 'Alphabet Sheets',
      description: 'Complete set of Hebrew alphabet characters'
    },
    { 
      id: 'variations', 
      name: 'Letter Variations Sheets',
      description: 'Different styles of writing Hebrew letters'
    },
    { 
      id: 'common-words', 
      name: 'Common Words Sheets',
      description: 'Frequently used Hebrew words and phrases'
    },
    { 
      id: 'sentences', 
      name: 'Sentences Sheets',
      description: 'Complete Hebrew sentences with various structures'
    },
  ];
  
  const handleDownload = (sheetType) => {
    console.log(`Downloading ${sheetType} sheet`);
    // Download logic will be implemented here
  };
  
  const handleUpload = (file) => {
    // Just store the file instead of navigating immediately
    console.log('File selected:', file);
    setSelectedFile(file);
  };
  
  const startCalibration = () => {
    if (selectedFile) {
      console.log('Starting calibration with:', selectedFile);
      navigate('/calibration/process', { 
        state: { 
          sheetType: selectedSheetTypeRef.current, 
          file: selectedFile 
        } 
      });
    } else {
      // Could show an error or notification that a file is required
      console.error('No file selected for calibration');
    }
  };

  // Improved drag and drop handlers with safety timeout
  const resetDragState = () => {
    // Clear any existing timeouts to prevent multiple resets
    if (dragTimeoutRef.current) {
      clearTimeout(dragTimeoutRef.current);
    }
    dragCounterRef.current = 0;
    setIsDragging(false);
  };
  
  // Setup a safety effect to reset drag state if browser events fail
  useEffect(() => {
    // Reset drag state when component mounts or step changes
    resetDragState();
    
    // Add a document-level drop handler as a safety measure
    const handleDocumentDrop = (e) => {
      if (e.target !== dropAreaRef.current && !dropAreaRef.current?.contains(e.target)) {
        resetDragState();
      }
    };
    
    // Add global event listeners as a safety net
    document.addEventListener('drop', handleDocumentDrop);
    document.addEventListener('dragend', resetDragState);
    
    return () => {
      document.removeEventListener('drop', handleDocumentDrop);
      document.removeEventListener('dragend', resetDragState);
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current);
      }
    };
  }, [activeStep]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    if (dragCounterRef.current === 1) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Always reset drag state immediately
    resetDragState();
    
    // Handle the file drop - just store the file without starting calibration
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      console.log('File dropped:', file);
      handleUpload(file);
    }
    
    // Set a safety timeout to ensure state is reset even if event handling fails
    dragTimeoutRef.current = setTimeout(resetDragState, 100);
  };
  
  // Step indicator component with animation
  const StepIndicator = ({ number, isActive, isCompleted }) => {
    return (
      <div className="flex-1 relative">
        <motion.div 
          className={`
            flex items-center justify-center w-10 h-10 mx-auto rounded-full 
            ${isActive || isCompleted ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
            transition-colors duration-300
          `}
          initial={{ scale: 0.8 }}
          animate={{ 
            scale: isActive ? 1.1 : 1,
            boxShadow: isActive ? '0 0 0 4px rgba(59, 130, 246, 0.2)' : '0 0 0 0px rgba(59, 130, 246, 0)'
          }}
          transition={{ duration: 0.3 }}
        >
          {isCompleted ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            number
          )}
        </motion.div>
        
        <p className="text-center mt-2 text-sm text-gray-700 font-medium">
          {number === 1 ? 'Download' : number === 2 ? 'Complete' : 'Upload'}
        </p>
        
        {number < 3 && (
          <div className="absolute top-5 left-full w-full h-0.5 bg-gray-200 -z-10">
            <motion.div 
              className="h-full bg-blue-600" 
              initial={{ width: '0%' }}
              animate={{ width: isCompleted ? '100%' : '0%' }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </div>
    );
  };
  
  // Calibration step component with animation
  const CalibrationStep = ({ title, description, children }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        {children}
      </motion.div>
    );
  };

  // Sheet card component - fixed to prevent jumping
  const SheetCard = ({ sheet }) => {
    return (
      <div className="h-full transform-gpu">
        <motion.div 
          className="h-full border rounded-lg p-5 bg-white shadow-sm transition-all duration-200"
          whileHover={{ 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            borderColor: "rgb(180, 198, 252)",
            transform: "translateY(-4px)"
          }}
        >
          <div className="flex flex-col h-full">
            <div>
              <h3 className="font-medium text-gray-800 text-lg">{sheet.name}</h3>
              <p className="text-gray-600 mt-1 text-sm">{sheet.description}</p>
            </div>
            <div className="mt-auto pt-3">
              <motion.button 
                onClick={() => handleDownload(sheet.id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                  w-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
  
  // Completely isolated SheetSelector component with direct ref manipulation
  const SheetSelector = () => {
    // Use local state that doesn't trigger parent rerenders
    const [localSelectedType, setLocalSelectedType] = useState(() => selectedSheetTypeRef.current);
    
    // Update the ref when selection changes but don't cause parent rerenders
    const handleTypeChange = (e) => {
      const newValue = e.target.value;
      setLocalSelectedType(newValue);
      selectedSheetTypeRef.current = newValue;
    };
    
    return (
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <label className="block mb-2 text-gray-700 font-medium">Sheet Type</label>
        <div className="relative">
          <select
            value={localSelectedType}
            onChange={handleTypeChange}
            className="w-full p-2.5 border border-gray-300 rounded-md text-gray-800 
            appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sheetTypes.map(sheet => (
              <option key={sheet.id} value={sheet.id}>
                {sheet.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    );
  };
  
  // Removed FileDropZone component - we'll use direct implementation instead
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center mb-8"
          >
            <motion.button 
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <h1 className="text-3xl font-bold text-gray-800">Model Calibration</h1>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 overflow-hidden border border-gray-100"
          >
            <div className="flex mb-10 px-6">
              {[1, 2, 3].map(step => (
                <StepIndicator 
                  key={step} 
                  number={step} 
                  isActive={activeStep === step}
                  isCompleted={activeStep > step} 
                />
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              {activeStep === 1 && (
                <CalibrationStep
                  key="step1"
                  title="Download Calibration Sheets"
                  description="Select and download the calibration sheets you want to use for model training."
                >
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    {sheetTypes.map(sheet => (
                      <SheetCard key={sheet.id} sheet={sheet} />
                    ))}
                  </div>
                  <motion.div 
                    className="mt-8 flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.button 
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                      flex items-center shadow-md hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Next
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </motion.div>
                </CalibrationStep>
              )}
              
              {activeStep === 2 && (
                <CalibrationStep
                  key="step2"
                  title="Complete the Sheets"
                  description="Print the sheets and fill them with your handwriting. Make sure to write clearly in each designated box."
                >
                  <motion.div 
                    className="mt-6 p-5 border border-yellow-300 bg-yellow-50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex">
                      <svg className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="ml-3">
                        <p className="text-yellow-800 font-medium">Instructions</p>
                        <ul className="mt-2 text-yellow-700 space-y-2 text-sm">
                          <li className="flex items-start">
                            <svg className="w-4 h-4 text-yellow-600 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Print the downloaded sheets on white paper.
                          </li>
                          <li className="flex items-start">
                            <svg className="w-4 h-4 text-yellow-600 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Use a black pen to write the characters in the designated boxes.
                          </li>
                          <li className="flex items-start">
                            <svg className="w-4 h-4 text-yellow-600 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Write naturally, as you would normally write Hebrew text.
                          </li>
                          <li className="flex items-start">
                            <svg className="w-4 h-4 text-yellow-600 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Keep the sheet flat and ensure good lighting when you scan or photograph it.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <img 
                      src="/api/placeholder/400/200" 
                      alt="Calibration sheet example" 
                      className="rounded-lg shadow-md max-w-full"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="mt-8 flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button 
                      onClick={() => setActiveStep(1)}
                      className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 
                      flex items-center transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </motion.button>
                    <motion.button 
                      onClick={() => setActiveStep(3)}
                      className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                      flex items-center shadow-md hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Next
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </motion.div>
                </CalibrationStep>
              )}
              
              {activeStep === 3 && (
                <CalibrationStep
                  key="step3"
                  title="Upload Completed Sheets"
                  description="Scan or take a clear photo of your completed sheets and upload them for processing."
                >
                  <motion.div 
                    className="mt-6 space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Using completely isolated SheetSelector component */}
                    <SheetSelector />
                    
                    {/* Using the memoized component to fix drag-and-drop issues */}
                    <div 
                      ref={dropAreaRef}
                      className={`
                        mt-4 border-2 border-dashed rounded-lg p-8 text-center 
                        ${isDragging ? 'border-blue-500 bg-blue-50' : selectedFile ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:bg-gray-50'}
                        transition-colors duration-200
                      `}
                      onDragEnter={handleDragEnter}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input 
                        type="file" 
                        id="fileUpload" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            handleUpload(e.target.files[0]);
                          }
                        }}
                      />
                      
                      {!selectedFile ? (
                        /* Original upload UI when no file is selected */
                        <div className="space-y-4">
                          <motion.div 
                            className="flex justify-center"
                            animate={{ 
                              y: [0, -5, 0],
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          >
                            <svg className="w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                          </motion.div>
                          
                          <p className="text-gray-700 font-medium">Drag and drop your completed calibration sheet here</p>
                          <p className="text-sm text-gray-500">or</p>
                          
                          <motion.label 
                            htmlFor="fileUpload"
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md 
                            hover:bg-blue-700 cursor-pointer shadow-sm hover:shadow-md transition-all"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            Select File
                          </motion.label>
                          
                          <p className="text-xs text-gray-500">
                            Supported formats: JPG, PNG, PDF (up to 10MB)
                          </p>
                        </div>
                      ) : (
                        /* File selected UI */
                        <div className="space-y-4">
                          <div className="flex justify-center">
                            <motion.div
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {selectedFile.type?.includes('image') ? (
                                <svg className="w-14 h-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              ) : selectedFile.type?.includes('pdf') ? (
                                <svg className="w-14 h-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              ) : (
                                <svg className="w-14 h-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              )}
                            </motion.div>
                          </div>
                          
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <p className="text-green-700 font-medium">File Selected</p>
                            <p className="mt-1 text-green-600 font-medium max-w-full truncate">
                              {selectedFile.name}
                            </p>
                            <p className="mt-1 text-green-600 text-sm">
                              {(selectedFile.size / 1024).toFixed(1)} KB
                            </p>
                          </motion.div>
                          
                          <motion.button
                            onClick={() => setSelectedFile(null)}
                            className="mt-2 px-4 py-1.5 bg-red-100 text-red-700 font-medium rounded-md 
                            hover:bg-red-200 border border-red-200 shadow-sm transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            Remove File
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="mt-8 flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button 
                      onClick={() => setActiveStep(2)}
                      className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 
                      flex items-center transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </motion.button>
                    <motion.button 
                      onClick={() => startCalibration()}
                      className={`px-6 py-2.5 ${selectedFile ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white rounded-md 
                      flex items-center shadow-md hover:shadow-lg transition-all`}
                      whileHover={selectedFile ? { scale: 1.03, boxShadow: '0 8px 15px rgba(37, 99, 235, 0.25)' } : {}}
                      whileTap={selectedFile ? { scale: 0.97 } : {}}
                      disabled={!selectedFile}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Start Calibration
                    </motion.button>
                  </motion.div>
                </CalibrationStep>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CalibrationPage;