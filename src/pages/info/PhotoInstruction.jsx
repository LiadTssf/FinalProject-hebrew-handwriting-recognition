// src/pages/info/PhotoInstruction.jsx
import React from 'react';
import { InfoPageLayout, FadeInSection } from '../../components/info/InfoPageLayout';
import { Link } from 'react-router-dom';

const PhotoInstructionPage = () => {
  return (
    <InfoPageLayout
      title="Photo Instructions"
      subtitle="3 simple rules for perfect results"
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      }
      color="blue"
    >
      <div className="space-y-8">
        <FadeInSection>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Critical: You MUST photograph the entire A4 paper
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>Don't crop to just the text area. Our AI needs to see the full page to work properly.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border-2 border-blue-200 p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Full A4 Page</h3>
              <p className="text-gray-700 text-sm">
                Photograph the <strong>entire A4 paper</strong>, even blank areas. 
                If you captured more, crop to show only the A4 page.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border-2 border-blue-200 p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Normal Writing</h3>
              <p className="text-gray-700 text-sm">
                Write in <strong>normal-sized letters</strong> (standard line height). 
                Use clear handwriting with good spacing.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border-2 border-blue-200 p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Good Lighting</h3>
              <p className="text-gray-700 text-sm">
                Take photo from <strong>directly above</strong> with 
                even lighting and no shadows.
              </p>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.3}>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Quick Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2 flex items-center">
                  ✅ Correct
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Full A4 page visible</li>
                  <li>• All margins included</li>
                  <li>• Clear, straight photo</li>
                  <li>• Even lighting</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2 flex items-center">
                  ❌ Wrong
                </h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Cropped to text only</li>
                  <li>• Angled or tilted photo</li>
                  <li>• Dark shadows</li>
                  <li>• Multiple pages shown</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.4}>
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Following these 3 simple rules gives you 75%+ accuracy and saves time on corrections.
            </p>
            <Link to="/home" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center text-lg">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Got It - Start Upload
            </Link>
          </div>
        </FadeInSection>
      </div>
    </InfoPageLayout>
  );
};

export default PhotoInstructionPage;