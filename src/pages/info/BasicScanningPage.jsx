

import React, { useState } from 'react';
import { InfoPageLayout, FadeInSection, InfoCard } from '../../components/info/InfoPageLayout';

const BasicScanningPage = () => {
  const [showFullImage, setShowFullImage] = useState(false);

  return (
    <InfoPageLayout
      title="Basic Scanning"
      subtitle="Efficient handwriting recognition using neural networks and preprocessing"
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      }
      color="blue"
    >
      <div className="space-y-10">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-lg text-gray-700 mb-6">
            Our advanced scanning technology converts handwritten Hebrew documents into editable digital text through a multi-stage process. In the basic scanning mode, we utilize two out of three key stages: image preprocessing and specialized neural networks trained specifically for Hebrew handwriting recognition. This process operates without contextual analysis, focusing solely on accurate text extraction.
          </p>
          
          <div 
            className="relative h-80 bg-gray-50 rounded-xl overflow-hidden my-8 border border-gray-200 cursor-pointer" 
            onClick={() => setShowFullImage(true)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/images/basic_scanning2phase.png" 
                alt="OCR Process Diagram" 
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 shadow-sm">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-100 to-transparent p-4 text-center">
              <p className="text-sm text-gray-600">Diagram: End-to-end handwriting recognition workflow (Click to enlarge)</p>
            </div>
          </div>
          
          {/* Image Modal/Popup */}
          {showFullImage && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" 
              onClick={() => setShowFullImage(false)}
            >
              <div className="relative max-w-5xl max-h-screen">
                <button 
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFullImage(false);
                  }}
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img 
                  src="/images/3-phase-architecture.png"
                  alt="OCR Process Diagram (Enlarged)" 
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>
            </div>
          )}
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our 3-Step Digitization Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <InfoCard
              title="1. Image Preprocessing"
              description="Documents undergo noise reduction, binarization, and resizing with padding to maintain aspect ratios, producing clean black-and-white images optimized for recognition."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              }
              delay={0.1}
            />
            <InfoCard
              title="2. Character Segmentation"
              description="Our system separates individual characters using contour detection, watershed segmentation, and pixel density analysis, even when characters are connected or curved in handwritten text."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
              delay={0.2}
            />
            <InfoCard
              title="3. CNN Recognition"
              description="Preprocessed images are analyzed by our specialized Convolutional Neural Networks to identify individual Hebrew characters with high accuracy across various handwriting styles."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              }
              delay={0.3}
            />
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.3}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Character Segmentation</h2>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 mb-6">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">Solving the Curved Text Challenge</h3>
            <p className="text-gray-700 mb-4">
              A significant challenge in handwritten Hebrew recognition is accurately segmenting connected or curved letters. We employ specialized techniques to address this complex problem:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Contour Detection</strong>: Our system identifies the outer edges of characters, defining their shapes and boundaries for precise recognition.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Watershed Segmentation</strong>: We simulate a water-filling process to effectively outline boundaries between connected characters.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Pixel Density Analysis</strong>: We analyze the density distribution of pixels to determine probable character boundaries.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>CTC (Connectionist Temporal Classification)</strong>: For particularly challenging texts, we employ CTC to recognize character sequences without explicit segmentation.</span>
              </li>
            </ul>
          </div>
          <div className="relative h-64 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/api/placeholder/800/320" 
                alt="Character Segmentation Visualization" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-100 to-transparent p-4 text-center">
              <p className="text-sm text-gray-600">Visualization: Character segmentation in curved Hebrew handwriting</p>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.4}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Neural Network Recognition</h2>
          <p className="text-gray-700 mb-6">
            Our custom Convolutional Neural Network (CNN) has been trained on thousands of handwritten Hebrew samples to achieve high recognition accuracy across different handwriting styles. After character recognition, our contextual refinement system analyzes the text using sophisticated language models.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Technical Specifications</h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>75-79% accuracy on standard Hebrew handwriting</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Support for cursive Hebrew characters</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Support uploading multiple documents at once.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Processing time of approximately 0.8 seconds per page</span>
              </li>
            </ul>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.5}>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Basic Scanning Output</h2>
        <p className="text-gray-700 mb-6">
          The final step in our basic scanning process combines the recognized characters directly to form the output text without additional AI processing:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
            <h3 className="text-lg font-semibold text-green-800 mb-3">How It Works</h3>
            <ul className="space-y-3 text-green-700">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-2">Direct character assembly from CNN recognition results without contextual analysis</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-2">Preserves original structure and character sequences exactly as written</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-2">Fastest processing time (approximately 0.8 seconds per page)</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-2">Best suited for well-written, clear handwriting or when preserving exact character recognition is preferred over text correctness</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
            <h3 className="text-lg font-semibold text-amber-800 mb-3">Limitations</h3>
            <ul className="space-y-3 text-amber-700">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-2">CNN recognition errors remain uncorrected in the final output</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-2">No text cleanup, restructuring, or error correction</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-2">Lower overall accuracy (75-79%) compared to enhanced modes</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 mb-8 mt-8">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">Ideal For</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Clear Handwriting</strong>: Documents with neat, consistent handwriting</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Speed Priority</strong>: When fast processing is essential</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Original Preservation</strong>: When maintaining original text structure is critical</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span><strong>Batch Processing</strong>: Converting multiple documents quickly</span>
            </li>
          </ul>
        </div>
      </FadeInSection>
        
      <FadeInSection delay={0.6}>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use Basic Scanning</h2>
        <h3 className="text-xl text-gray-900 mb-4">Video Tutorial - Watch our step-by-step demonstration of the Basic Scanning process:</h3>
  
        <div className="relative h-96 bg-gray-900 rounded-xl overflow-hidden my-6 flex items-center justify-center">
          <div className="text-white text-center">
            <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl">Basic Scanning Video Tutorial</p>
          </div>
        </div>
                
        <p className="text-sm text-gray-500 italic text-center mb-4">
          This tutorial demonstrates uploading documents, selecting the Basic Scanning mode, and reviewing results.
        </p>
        
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Try Basic Scanning Now
          </button>
        </div>
      </FadeInSection>
      </div>
    </InfoPageLayout>
  );
};

export default BasicScanningPage;
