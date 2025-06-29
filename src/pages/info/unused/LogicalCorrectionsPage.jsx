

import React, { useState } from 'react';
import ComparisonModal from '../../../components/info/ComparisonModal';
import { InfoPageLayout, FadeInSection, InfoCard } from '../../../components/info/InfoPageLayout';

const LogicalCorrectionsPage = () => {
  const [showFullImage, setShowFullImage] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  return (
    <InfoPageLayout
      title="Advanced Scanning"
      subtitle="Enhancing handwriting recognition with AI-driven contextual error correction"
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
          In Advanced Scanning mode, we enhance the standard scanning by integrating a large language model that corrects contextual errors made by the CNN or human input. If the CNN misidentifies a letter, the LLM analyzes the surrounding context to recognize and correct the mistake, ensuring more accurate and meaningful text conversion.
          </p>
          
          <div 
            className="relative h-80 bg-gray-50 rounded-xl overflow-hidden my-8 border border-gray-200 cursor-pointer" 
            onClick={() => setShowFullImage(true)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/images/3-phase-architecture.png" 
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
              title="2. CNN Recognition"
              description="Preprocessed images are analyzed by our specialized Convolutional Neural Networks to identify individual Hebrew characters with high accuracy across various handwriting styles."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              }
              delay={0.2}
            />
            <InfoCard
              title="3. Contextual Refinement"
              description="Recognized text undergoes contextual analysis using Gemini, applying Hebrew grammar and semantics to correct recognition errors and improve overall accuracy."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              delay={0.3}
            />
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
                <span>90% accuracy on standard Hebrew handwriting</span>
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
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Gemini-Powered Error Correction</h2>
  <p className="text-gray-700 mb-6">
    The final step in our advanced scanning process uses Gemini in a limited capacity to correct obvious recognition errors in the digitized text:
  </p>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
      <h3 className="text-lg font-semibold text-green-800 mb-3">What It Corrects</h3>
      <ul className="space-y-3 text-green-700">
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="ml-2">Only obvious CNN recognition errors - like when "אבא" (father, pronounced "aba") is misrecognized as "אכא" (a nonsense word, pronounced "aka")</span>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="ml-2">Visually similar characters that were incorrectly identified</span>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="ml-2">Characters that are 100% recognition errors, not actual misspellings</span>
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
          <span className="ml-2">Does not correct actual misspellings - such as "אבה" (a misspelled version of "father") versus the correct "אבא" (father)</span>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="ml-2">Minimal contextual refinement focused only on recognition</span>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="ml-2">Basic scanning does not include grammar correction, misspelling correction, or other advanced text refinement features</span>
        </li>
      </ul>
    </div>
  </div>

    
  
  <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-6 border border-indigo-100 mb-8 mt-8">
    <h3 className="text-xl font-semibold text-indigo-800 mb-3">Enhanced Features</h3>
    <p className="text-gray-700 mb-4">
      Advanced Scanning mode enables these additional advanced features:
    </p>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-700">
      <li className="flex items-start">
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5 bg-indigo-100 rounded-full">
          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="ml-2">
          <span className="font-medium block">Context-Aware Correction</span>
          <span className="text-sm text-gray-600">Improves recognition accuracy from 75% to 90%</span>
        </div>
      </li>
      <li className="flex items-start">
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5 bg-indigo-100 rounded-full">
          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="ml-2">
          <span className="font-medium block">Error Highlighting</span>
          <span className="text-sm text-gray-600">Automatically identifies and marks corrections</span>
        </div>
      </li>
      <li className="flex items-start">
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5 bg-indigo-100 rounded-full">
          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="ml-2">
          <span className="font-medium block">Grammar Enhancement</span>
          <span className="text-sm text-gray-600">Fixes obvious grammatical issues in Hebrew</span>
        </div>
      </li>
      <li className="flex items-start">
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5 bg-indigo-100 rounded-full">
          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="ml-2">
          <span className="font-medium block">Confidence Scoring</span>
          <span className="text-sm text-gray-600">Visual indication of correction confidence</span>
        </div>
      </li>
    </ul>
  </div>
</FadeInSection>
        
<FadeInSection delay={0.6}>
  <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use Advanced Scanning</h2>

  <h3 className="text-xl font-semibold text-gray-900 mb-4">Video Tutorial: Advanced Scanning</h3>
  <p className="text-gray-700 mb-4">
    Watch our demonstration of the Advanced Scanning process with AI-enhanced accuracy:
  </p>
  
  <div className="relative h-96 bg-gray-900 rounded-xl overflow-hidden my-6 flex items-center justify-center">
    <div className="text-white text-center">
      <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-xl">Advanced Scanning Video Tutorial</p>
    </div>
  </div>
          
  <p className="text-sm text-gray-500 italic text-center mb-4">
    This tutorial demonstrates how AI-powered advanced scanning significantly improves recognition accuracy by analyzing context.
  </p>
  
  <div className="flex justify-center space-x-4">
  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center">
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    Try Advanced Scanning Now
  </button>
  <button 
    className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center"
    onClick={() => setShowComparisonModal(true)}
  >
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    Compare with Basic Scanning
  </button>
  </div>

  {/* Comparison Modal */}
  <ComparisonModal 
    isOpen={showComparisonModal} 
    onClose={() => setShowComparisonModal(false)}
  />
</FadeInSection>
      </div>
    </InfoPageLayout>
  );
};
export default LogicalCorrectionsPage;
