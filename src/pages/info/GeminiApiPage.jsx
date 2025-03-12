import React from 'react';
import { InfoPageLayout, FadeInSection } from '../../components/info/InfoPageLayout';

const GeminiApiPage = () => {
  return (
    <InfoPageLayout
      title="Gemini API Integration"
      subtitle="Enhancing text recognition with Google's Gemini AI"
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      }
      color="yellow"
    >
      <div className="space-y-10">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Google Gemini AI Integration</h2>
          <p className="text-lg text-gray-700 mb-6">
            Our platform leverages Google's powerful Gemini AI model to enhance handwriting recognition, particularly for challenging text and complex language structures.
          </p>
          
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200 my-8">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0">
                <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">What is Gemini?</h3>
                <p className="text-yellow-700">
                  Gemini is Google's most advanced AI model family, particularly effective at understanding context, reasoning about text, and interpreting complex language structures. By integrating Gemini into our recognition pipeline, we can handle cases that would challenge traditional OCR systems.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Gemini Enhances Our Platform</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-amber-100 rounded-full mr-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Context-Aware Recognition</h3>
              </div>
              <p className="text-gray-700">
                Gemini can understand text in context, helping to correctly interpret words that might be ambiguous when viewed in isolation. This is particularly valuable for Hebrew where context is crucial for correct interpretation.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-amber-100 rounded-full mr-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Handling Ambiguities</h3>
              </div>
              <p className="text-gray-700">
                When characters are unclear or ambiguous, Gemini analyzes the semantic meaning of the surrounding content to make intelligent inferences about what the text should be.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-amber-100 rounded-full mr-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Multi-Modal Understanding</h3>
              </div>
              <p className="text-gray-700">
                Gemini can process both text and visual information together, allowing our system to interpret the visual characteristics of handwriting alongside textual context.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-amber-100 rounded-full mr-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Domain Adaptation</h3>
              </div>
              <p className="text-gray-700">
                The API can be fine-tuned to understand specialized vocabulary and domain-specific language patterns common in Hebrew texts from different fields.
              </p>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.4}>
          <div className="relative h-96 bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden my-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/api/placeholder/800/500" 
                alt="Gemini Integration Architecture"
                className="max-w-full max-h-full object-contain" 
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent p-4 text-center">
              <p className="text-sm text-gray-600">Diagram: Gemini API integration within our processing pipeline</p>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.6}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Security</h2>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Data Protection</h3>
                <p className="text-gray-700">
                  All data sent to the Gemini API is encrypted and processed in accordance with strict privacy standards. Your documents are never stored or used for training Gemini's models without explicit consent.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded border border-blue-100">
                    <h4 className="font-medium text-blue-800 text-sm mb-1">Data Processing</h4>
                    <p className="text-sm text-blue-700">
                      Only the minimal necessary data is sent to the API, and all processing is done in accordance with GDPR and other privacy regulations.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded border border-blue-100">
                    <h4 className="font-medium text-blue-800 text-sm mb-1">Data Retention</h4>
                    <p className="text-sm text-blue-700">
                      By default, data is not retained after processing. Enterprise users can specify custom data retention policies.
                    </p>
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

export default GeminiApiPage;