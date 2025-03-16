import React, { useState } from 'react';
import { InfoPageLayout, FadeInSection } from '../../components/info/InfoPageLayout';
import { Link } from 'react-router-dom';

const ModelsDescriptionPage = () => {
  const [showFullImage, setShowFullImage] = useState(false);
  
  const modelCards = [
          {
      title: "Basic Scanning",
      description: "Turns handwriting into text using computer vision technology",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "blue",
      link: "/info/basic-scanning"
    },
    {
      title: "Advanced Scanning",
      description: "Uses AI to correct errors and improve accuracy",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      color: "purple",
      link: "/info/advanced-scanning"
    },
    {
      title: "Gemini Helper",
      description: "Google's smart AI that understands language like humans do",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "yellow",
      link: "/info/gemini-api"
    },
    {
      title: "Extra Features",
      description: "Summarize, translate, and improve your text",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "green",
      link: "/info/extra-features"
    }
  ];

  return (
    <InfoPageLayout
      title="The Technologies"
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
            Digi-Ktav makes handwritten Hebrew texts digital using smart technology that works like a human reader - but faster and available anytime. Our system combines several tools that work together like a well-rehearsed team to turn your handwriting into accurate digital text.
          </p>
          
          <div 
            className="relative h-80 bg-gray-50 rounded-xl overflow-hidden my-8 border border-gray-200 cursor-pointer" 
            onClick={() => setShowFullImage(true)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/images/3-phase-architecture.png" 
                alt="System Architecture" 
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1 shadow-sm">
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-100 to-transparent p-4 text-center">
              <p className="text-sm text-gray-600">Diagram: Digi-Ktav's modular recognition architecture (Click to enlarge)</p>
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
                  alt="System Architecture (Enlarged)" 
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>
            </div>
          )}
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
                  Our step-by-step process transforms your handwritten documents into digital text:
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute left-5 inset-y-0 w-0.5 bg-blue-200"></div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-4 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Personal Calibration (Optional)</h4>
                  <p className="mt-1 text-gray-600">
                    For better results, you can train a personalized model that learns your unique handwriting style. Like teaching a friend to read your handwriting, this significantly improves accuracy for your documents.
                  </p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-4 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Document Upload</h4>
                  <p className="mt-1 text-gray-600">
                    Upload one or multiple pages of handwritten content - our system handles documents of any length, from a quick note to a full manuscript.
                  </p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-4 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Image Preparation & Letter Detection</h4>
                  <p className="mt-1 text-gray-600">
                    We clean up the image and identify each letter, similar to how you might trace over words to make them clearer before reading.
                  </p>
                </div>
                
                <div className="relative pl-10 pb-8">
                  <div className="absolute left-4 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Smart Letter Recognition</h4>
                  <p className="mt-1 text-gray-600">
                    Our computer vision system (what experts call a "CNN") examines each letter and identifies it - like having a digital expert who's studied thousands of handwriting samples.
                  </p>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-4 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    5
                  </div>
                  <h4 className="text-lg font-medium text-gray-900">Language Understanding & Correction</h4>
                  <p className="mt-1 text-gray-600">
                    The Gemini AI reads through the text and fixes mistakes, just like how a human editor would catch and correct errors by understanding the context of what you're trying to say.
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
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Technical Architecture</h2>
                <p className="text-blue-700 mb-4">
                  Our three-stage architecture combines advanced technologies to tackle the unique challenges of Hebrew handwriting recognition:
                </p>
                <div className="space-y-3">
                  <div className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                    <p className="text-blue-700"><span className="font-semibold">Preprocessing:</span> OpenCV enhances document quality through noise reduction, adaptive thresholding for binarization, and aspect ratio-preserving resizing—crucial for maintaining Hebrew character proportions.</p>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                    <p className="text-blue-700"><span className="font-semibold">Recognition:</span> Custom CNN models built with TensorFlow/Keras identify characters by extracting spatial features. For complex cursive text, we implement lightweight Transformer models to capture character relationships while maintaining computational efficiency.</p>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                    <p className="text-blue-700"><span className="font-semibold">Contextual Refinement:</span> Google's Gemini API interprets context to correct ambiguities—particularly critical for Hebrew text, which typically lacks vowel markings (diacritics) and can have multiple interpretations.</p>
                  </div>
                </div>
                <div className="mt-4 bg-white bg-opacity-50 p-3 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">Adaptive Learning</h3>
                  <p className="text-blue-700 text-sm">
                    Our unique personalization system allows the model to calibrate to your handwriting style. By collecting samples through calibration sheets, we enhance accuracy by either oversampling your data during training or applying higher loss penalties to errors in your specific handwriting patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </InfoPageLayout>
  );
};

export default ModelsDescriptionPage;