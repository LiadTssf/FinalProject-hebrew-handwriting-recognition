import React from 'react';
import { InfoPageLayout, FadeInSection, InfoCard } from '../../components/info/InfoPageLayout';

const LogicalCorrectionsPage = () => {
  return (
    <InfoPageLayout
      title="Logical Corrections"
      subtitle="How our AI corrects recognition errors and improves accuracy"
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      }
      color="purple"
    >
      <div className="space-y-10">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Intelligent Error Correction</h2>
          <p className="text-lg text-gray-700 mb-6">
            Our logical correction system uses advanced NLP (Natural Language Processing) and contextual analysis to correct recognition errors that basic OCR might miss.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Before Correction</h3>
                <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                  <p className="text-red-800 font-hebrew text-right text-lg" dir="rtl">
                    אני הולד לחנור כדי לקנות לחם ומלח
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Raw OCR output with recognition errors</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">After Correction</h3>
                <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 font-hebrew text-right text-lg" dir="rtl">
                    אני הולך לחנות כדי לקנות לחם ומלח
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Corrected text with proper Hebrew spelling</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Correction Mechanisms</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <InfoCard
              title="Contextual Analysis"
              description="Analyzes surrounding words to determine the most likely correct form of a word based on context."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              delay={0.1}
            />
            <InfoCard
              title="Statistical Modeling"
              description="Uses statistical language models trained on extensive Hebrew text corpora to predict correct word forms."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              delay={0.2}
            />
            <InfoCard
              title="Grammar Checking"
              description="Verifies syntactic structure and grammatical rules to ensure the recognized text follows Hebrew language patterns."
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
          <div className="relative h-80 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl overflow-hidden my-8 border border-purple-200 flex items-center justify-center">
            <img 
              src="/api/placeholder/800/400" 
              alt="Correction Process Flow" 
              className="max-w-full max-h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-100 to-transparent p-4 text-center">
              <p className="text-sm text-purple-700">Diagram: How our logical correction pipeline works</p>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.6}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">User Feedback Loop</h2>
          <p className="text-gray-700 mb-6">
            Our system continuously improves through user corrections and feedback, learning from each interaction to enhance future recognition accuracy.
          </p>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Adaptive Learning</h3>
                <p className="mt-1 text-gray-600">
                  When users correct recognition errors, our system analyzes these corrections to identify patterns and improve future recognition. This creates a continuously improving system that adapts to your specific handwriting style.
                </p>
                <div className="mt-3 flex flex-col sm:flex-row sm:space-x-4">
                  <div className="flex items-center text-sm text-purple-700 mb-2 sm:mb-0">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Self-improving algorithms</span>
                  </div>
                  <div className="flex items-center text-sm text-purple-700 mb-2 sm:mb-0">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Personal correction history</span>
                  </div>
                  <div className="flex items-center text-sm text-purple-700">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Community improvements</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </InfoPageLayout>
  );
};

export default LogicalCorrectionsPage;