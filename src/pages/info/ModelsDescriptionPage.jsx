import React from 'react';
import { InfoPageLayout, FadeInSection } from '../../components/info/InfoPageLayout';
import { Link } from 'react-router-dom';

const ModelsDescriptionPage = () => {
  const modelCards = [
    {
      title: "Basic Scanning",
      description: "Core handwriting recognition using CNN technology",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "blue",
      link: "/info/basic-scanning"
    },
    {
      title: "Logical Corrections",
      description: "AI-powered contextual error correction",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: "purple",
      link: "/info/logical-corrections"
    },
    {
      title: "Gemini API",
      description: "Advanced language understanding with Google's Gemini",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "yellow",
      link: "/info/gemini-api"
    },
    {
      title: "Personal Calibration",
      description: "Tailored recognition for your handwriting style",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      color: "green",
      link: "/info/personal-calibration"
    }
  ];

  return (
    <InfoPageLayout
      title="Model Architecture"
      subtitle="The technology behind Digi-Ktav's advanced handwriting recognition"
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
      color="blue"
    >
      <div className="space-y-10">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Recognition Technology</h2>
          <p className="text-lg text-gray-700 mb-6">
            Digi-Ktav combines multiple AI models and technologies to achieve exceptional handwriting recognition accuracy, particularly for Hebrew text. Our system architecture is designed as a pipeline of specialized components working together.
          </p>
          
          <div className="relative h-80 bg-gray-50 rounded-xl overflow-hidden my-8 border border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/api/placeholder/800/400" 
                alt="System Architecture" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-100 to-transparent p-4 text-center">
              <p className="text-sm text-gray-600">Diagram: Digi-Ktav's modular recognition architecture</p>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Components</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modelCards.map((card, index) => (
              <Link
                key={card.title}
                to={card.link}
                className="group"
              >
                <div className={`bg-white rounded-xl shadow-md overflow-hidden border border-${card.color}-100 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                  <div className={`h-2 bg-${card.color}-500`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg bg-${card.color}-100 text-${card.color}-600 mr-4 group-hover:bg-${card.color}-500 group-hover:text-white transition-colors duration-300`}>
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                    </div>
                    <p className="text-gray-600">{card.description}</p>
                    <div className="mt-4 flex justify-end">
                      <span className={`inline-flex items-center text-${card.color}-600 group-hover:text-${card.color}-700`}>
                        <span>Learn more</span>
                        <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.4}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How They Work Together</h2>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">The Recognition Pipeline</h3>
                <p className="text-gray-700">
                  Our models work in sequence to transform your handwritten document into accurate digital text:
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute left-5 inset-y-0 w-0.5 bg-blue-200"></div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-4 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Document Acquisition</h4>
                  <p className="mt-1 text-gray-600">
                    Your document is captured via scan or photo and preprocessed to optimize for recognition.
                  </p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-4 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Basic Recognition</h4>
                  <p className="mt-1 text-gray-600">
                    The Basic Scanning CNN model recognizes individual characters and words in the document.
                  </p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-4 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Logical Correction</h4>
                  <p className="mt-1 text-gray-600">
                    The output is analyzed for potential errors, and context-aware corrections are applied.
                  </p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-4 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Gemini Integration</h4>
                  <p className="mt-1 text-gray-600">
                    For complex or ambiguous content, Gemini AI provides additional language understanding.
                  </p>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-4 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    5
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Personal Calibration</h4>
                  <p className="mt-1 text-gray-600">
                    If enabled, your personal handwriting profile is applied to further improve accuracy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.6}>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
                <svg className="w-32 h-32 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="md:w-3/4 md:pl-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Continuous Improvement</h2>
                <p className="text-blue-700 mb-4">
                  Our models are continuously evolving and improving. With each document processed and each correction made, the system becomes more accurate for all users.
                </p>
                <p className="text-blue-700">
                  Explore each component in detail to understand how our technology transforms handwritten Hebrew text into accurate digital content with unprecedented precision.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </InfoPageLayout>
  );
};

export default ModelsDescriptionPage;