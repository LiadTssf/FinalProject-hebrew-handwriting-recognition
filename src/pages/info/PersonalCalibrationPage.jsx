import React from 'react';
import { InfoPageLayout, FadeInSection } from '../../components/info/InfoPageLayout';

const PersonalCalibrationPage = () => {
  return (
    <InfoPageLayout
      title="Personal Calibration"
      subtitle="Tailor our recognition system to your unique handwriting style"
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      }
      color="green"
    >
      <div className="space-y-10">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Handwriting Calibration</h2>
          <p className="text-lg text-gray-700 mb-6">
            Everyone's handwriting is unique. Our personal calibration system adapts our recognition algorithms to your specific writing style, dramatically improving accuracy for your documents.
          </p>
          
          <div className="relative h-72 bg-white rounded-lg border border-gray-200 shadow overflow-hidden my-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/api/placeholder/800/400" 
                alt="Handwriting Calibration" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-10">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-700 mb-4">
                Our calibration process creates a personalized recognition profile based on samples of your handwriting.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-800 text-lg mb-2">Benefits</h3>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>15-30% higher accuracy</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Multiple profiles per account</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Continuous improvement</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">The Calibration Process</h3>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-4">
                      <span className="text-lg font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Sample Collection</h4>
                      <p className="mt-1 text-gray-600">
                        Write a series of sample text passages provided by our system. These samples cover the full range of Hebrew characters and common writing patterns.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-4">
                      <span className="text-lg font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Analysis & Profile Creation</h4>
                      <p className="mt-1 text-gray-600">
                        Our system analyzes your handwriting characteristics, identifying unique patterns in how you form letters and words. This data is used to create your personal recognition profile.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-4">
                      <span className="text-lg font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Model Fine-Tuning</h4>
                      <p className="mt-1 text-gray-600">
                        The recognition model is fine-tuned with your handwriting profile, creating a customized algorithm that understands the specific nuances of your writing style.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-4">
                      <span className="text-lg font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">Continuous Learning</h4>
                      <p className="mt-1 text-gray-600">
                        Your profile continues to improve as you use the system. Each correction you make helps refine the model's understanding of your handwriting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.4}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Multiple Handwriting Profiles</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Multiple Profiles</h3>
                <p className="text-gray-700 mb-4">
                  Need to digitize documents written by different people? Create multiple calibration profiles and switch between them as needed.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Ideal for family archives or organizational documents</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Create profiles for different writing styles (casual vs. formal)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Easy switching between profiles when processing documents</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                <img 
                  src="/api/placeholder/400/300" 
                  alt="Multiple Profiles Management"
                  className="max-w-full rounded" 
                />
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.6}>
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-8 border border-green-200">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 bg-white rounded-full shadow-md flex items-center justify-center">
                    <svg className="w-20 h-20 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Ready to Get Started?</h2>
                <p className="text-green-700 mb-6">
                  Begin your personal calibration process now and experience the dramatic improvement in recognition accuracy. The process takes only 10-15 minutes and provides immediate benefits.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                    Start Calibration Process
                  </button>
                  <button className="px-6 py-3 border border-green-600 text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </InfoPageLayout>
  );
};

export default PersonalCalibrationPage;