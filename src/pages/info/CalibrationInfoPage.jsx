import React from 'react';
import { InfoPageLayout, FadeInSection } from '../../components/info/InfoPageLayout';
import { Link } from 'react-router-dom';

const CalibrationInfoPage = () => {
  return (
    <InfoPageLayout
      title="Personal Calibration"
      subtitle="Teach our system to understand your unique handwriting"
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      }
      color="purple"
    >
      <div className="space-y-10">
        <FadeInSection>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">The Power of Personalization</h2>
                <p className="text-lg text-gray-700 mb-4">
                  Just like humans recognize your handwriting better after seeing it a few times, our system can be trained to understand your unique Hebrew writing style.
                </p>
                <p className="text-lg text-gray-700">
                  With personal calibration, we create a custom AI model tailored specifically to your handwriting—turning unfamiliar scribbles into perfectly digitized text.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Recognition Improvement</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Standard Model</span>
                        <span className="text-sm font-medium text-gray-700">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">With Personal Calibration</span>
                        <span className="text-sm font-medium text-purple-700">Up to 100%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 text-center">Calibration can increase accuracy by up to 35%</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">What Is It?</h2>
              </div>
              <p className="text-gray-700">
                Our personal calibration feature trains the AI to recognize your specific Hebrew handwriting patterns, reducing errors and saving you time.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Why Use It?</h2>
              </div>
              <p className="text-gray-700">
                Your handwriting is as unique as your fingerprint. Calibration adapts our system to your specific style, boosting accuracy and making the entire digitization process smoother.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Who Is It For?</h2>
              </div>
              <p className="text-gray-700">
                This feature is beneficial for people with unique handwriting styles. If your writing is distinct or unconventional, calibration helps increase recognition accuracy more than it does for standard handwriting styles.              </p>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto bg-purple-100 w-12 h-12 flex items-center justify-center rounded-full mb-3">
                  <span className="text-xl font-bold text-purple-700">1</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Download</h3>
                <p className="text-sm text-gray-600">Get our specially designed calibration sheets</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto bg-purple-100 w-12 h-12 flex items-center justify-center rounded-full mb-3">
                  <span className="text-xl font-bold text-purple-700">2</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Fill Out</h3>
                <p className="text-sm text-gray-600">Write the Hebrew text in your natural style</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto bg-purple-100 w-12 h-12 flex items-center justify-center rounded-full mb-3">
                  <span className="text-xl font-bold text-purple-700">3</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Upload</h3>
                <p className="text-sm text-gray-600">Submit your completed sheets to our system</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto bg-purple-100 w-12 h-12 flex items-center justify-center rounded-full mb-3">
                  <span className="text-xl font-bold text-purple-700">4</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Train</h3>
                <p className="text-sm text-gray-600">Our AI learns your unique writing patterns</p>
              </div>
              
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto bg-purple-100 w-12 h-12 flex items-center justify-center rounded-full mb-3">
                  <span className="text-xl font-bold text-purple-700">5</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Enjoy</h3>
                <p className="text-sm text-gray-600">Experience enhanced accuracy on all your documents</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Behind the scenes</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        Our system uses adaptive learning techniques to analyze your handwriting patterns. It either oversamples your data during training or applies higher loss penalties to errors in your specific handwriting patterns, ensuring maximum accuracy for your unique style.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        

        
        <FadeInSection delay={0.3}>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900">How much handwriting do I need to provide?</h3>
                <p className="text-gray-700 mt-1">We recommend completing at least one full calibration sheet. For best results, complete 2-3 sheets. Even a single sheet can significantly improve accuracy.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Can I create calibration models for others?</h3>
                <p className="text-gray-700 mt-1">Yes! You can create multiple calibration profiles under your account. This is perfect for families working with documents written by different people or for your own different writing styles.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Do I need to recalibrate regularly?</h3>
                <p className="text-gray-700 mt-1">No, once your calibration model is created, it remains effective. However, if your handwriting style changes significantly or you want to further improve accuracy, you can submit additional samples.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Is personal calibration required?</h3>
                <p className="text-gray-700 mt-1">No, Digi-Ktav works well with our standard models. Calibration is an optional premium feature that enhances accuracy for your specific handwriting style.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Where can I find my calibrated models?</h3>
                <p className="text-gray-700 mt-1">All your calibration profiles are stored in the "Calibrated Models" section in the sidebar. You can manage, update, or select different models when processing documents.</p>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.4}>
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 border border-purple-200 shadow-sm">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Experience the Difference?</h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Create your personal calibration model today and transform how you digitize your Hebrew documents.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/calibration"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  Start Calibration
                  <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  to="/info/models-description"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Learn More About Our Technology
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </InfoPageLayout>
  );
};

export default CalibrationInfoPage;