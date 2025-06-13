import React from 'react';
import { InfoPageLayout, FadeInSection } from '../../components/info/InfoPageLayout';
import { Link } from 'react-router-dom';

const GeminiApiPage = () => {
  return (
    <InfoPageLayout
      title="Gemini AI Integration"
      subtitle="Making handwriting recognition smarter with Google's large language model"
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      }
      color="yellow"
    >
      <div className="space-y-10">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Gemini?</h2>
          
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200 my-6">
            <div className="flex items-start">
              <div className="mr-4 flex-shrink-0">
                <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <p className="text-yellow-800 text-lg">
                  Gemini is Google's smartest AI that understands language like humans do. 
                </p>
                <p className="text-yellow-700 mt-2">
                  It helps our handwriting recognition system work better by understanding the meaning of words, not just the shapes of letters.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-medium text-gray-900 mb-2">Without Gemini</h3>
              <p className="text-gray-600 text-sm mb-3">Our system would only look at letter shapes</p>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="text-gray-800">If handwriting is messy, it might mistake similar-looking letters.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-medium text-gray-900 mb-2">With Gemini</h3>
              <p className="text-gray-600 text-sm mb-3">The system understands context and meaning</p>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-gray-800">Even with messy handwriting, it can figure out the right word based on what makes sense.</p>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Gemini Makes Our System Better</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-amber-100 rounded-full mr-3">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Fixes Recognition Errors</h3>
              </div>
              <p className="text-gray-700">
                Like a human reading doctor's handwriting, Gemini uses context to understand what words make sense. 
              </p>
              <p className="text-gray-700 mt-2">
                If "אכא" (not a real word) is recognized, Gemini might correct it to "אבא" (father) based on the surrounding words.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-amber-100 rounded-full mr-3">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Adds Helpful Features</h3>
              </div>
              <p className="text-gray-700">
                Gemini can take your document further - summarizing long texts, translating to English, and fixing text structure.
              </p>
              <p className="text-gray-700 mt-2">
                Think of it as having an expert editor who perfectly understands Hebrew working on your document.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-amber-100 rounded-full mr-3">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Knows Special Terminology</h3>
              </div>
              <p className="text-gray-700">
                Whether you're working with legal documents, medical notes, or religious texts, Gemini recognizes specialized Hebrew terms.
              </p>
              <p className="text-gray-700 mt-2">
                It's like having experts from different fields helping with your documents.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <div className="p-2 bg-amber-100 rounded-full mr-3">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Smart Without Being Complex</h3>
              </div>
              <p className="text-gray-700">
                Instead of building complicated custom language systems, we connect to Google's ready-made expertise.
              </p>
              <p className="text-gray-700 mt-2">
                It's like having a super-smart assistant that's already trained and ready to help, without the headaches of setting up complex technology.
              </p>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.4}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works - The Simple Version</h2>
          
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl font-bold text-blue-700">1</span>
                </div>
                <h3 className="font-medium text-blue-800 mb-2">First Look</h3>
                <div className="flex-grow">
                  <p className="text-sm text-gray-700">
                    Our system looks at your handwritten document and tries to identify each letter shape.
                  </p>
                </div>
                <div className="mt-3">
                  <svg className="w-6 h-6 text-blue-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl font-bold text-yellow-700">2</span>
                </div>
                <h3 className="font-medium text-yellow-800 mb-2">Gemini Check</h3>
                <div className="flex-grow">
                  <p className="text-sm text-gray-700">
                    Gemini looks at the whole text to understand context and meaning, fixing mistakes using its knowledge of Hebrew.
                  </p>
                </div>
                <div className="mt-3">
                  <svg className="w-6 h-6 text-yellow-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl font-bold text-green-700">3</span>
                </div>
                <h3 className="font-medium text-green-800 mb-2">Final Result</h3>
                <div className="flex-grow">
                  <p className="text-sm text-gray-700">
                    You get accurate digital text, plus optional features like summaries or translations if you want them.
                  </p>
                </div>
                <div className="mt-3">
                  <svg className="w-6 h-6 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Fun fact:</span> This process is similar to how you read messy handwriting. First you try to see what letters look like, then you use what you know about language to figure out what words make sense in context.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Link to="/home" className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              Try Gemini-Enhanced Recognition
            </Link>
          </div>
        </FadeInSection>
      </div>
    </InfoPageLayout>
  );
};

export default GeminiApiPage;