import React, { useState } from 'react';
import { InfoPageLayout, FadeInSection, InfoCard } from '../../components/info/InfoPageLayout';
import InteractiveSummarySlider from '../../components/info/InteractiveSummarySlider';
import { Link } from 'react-router-dom';

const EnhancedFeaturesPage = () => {
  const [showFullImage, setShowFullImage] = useState(false);
  const [activeDemoTab, setActiveDemoTab] = useState('summary');

  return (
    <InfoPageLayout
      title="Extra Features"
      subtitle="Optional AI-powered enhancements for your digitized text"
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
      color="green"
    >
      <div className="space-y-10">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-lg text-gray-700 mb-6">
            Our handwriting digitization platform offers several optional AI-powered enhancements that can be applied to your digitized text. These features leverage advanced language models to transform your text beyond simple digitization, enabling capabilities like summarization, translation, spelling correction, and text restructuring.
          </p>

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
                  src="/api/placeholder/1200/800"
                  alt="Enhanced Features Diagram (Enlarged)" 
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>
            </div>
          )}
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Enhancements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <InfoCard
              title="Text Summarization"
              description="Generate concise summaries of your documents with adjustable length from 5% to 50% of the original text."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              }
              delay={0.1}
            />
            <InfoCard
              title="Hebrew to English Translation"
              description="Automatically translate your digitized Hebrew text into fluent English with context-aware neural translation."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              }
              delay={0.2}
            />
            <InfoCard
              title="Spelling Correction"
              description="Fix misspellings and typos in the original handwritten text, beyond the basic recognition errors."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
              delay={0.3}
            />
            <InfoCard
              title="Text Restructuring"
              description="Improve text flow and structure while preserving the original meaning for better readability."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              }
              delay={0.4}
            />
          </div>
        </FadeInSection>
   
        <FadeInSection delay={0.3}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Text Summarization</h2>
          <p className="text-gray-700 mb-6">
            Our summarization feature uses advanced AI to condense your text while preserving the most important information. You control the summary length with a simple slider, allowing for anything from a brief overview to a comprehensive digest.
          </p>
          
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border border-green-200 mb-6">
            <h3 className="text-xl font-semibold text-green-800 mb-3">How Summarization Works</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-center mb-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 text-lg font-bold mb-2">1</div>
                  <h4 className="font-medium text-green-800">Analysis</h4>
                </div>
                <p className="text-sm text-gray-600">
                  The AI reads and analyzes the entire text to identify key topics, important information, and the overall structure.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-center mb-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 text-lg font-bold mb-2">2</div>
                  <h4 className="font-medium text-green-800">Extraction</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Based on your chosen summary length, the system extracts the most important sentences and concepts from the document.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-center mb-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 text-lg font-bold mb-2">3</div>
                  <h4 className="font-medium text-green-800">Generation</h4>
                </div>
                <p className="text-sm text-gray-600">
                  The extracted information is rewritten into a coherent, flowing summary that maintains the original meaning and key points.
                </p>
              </div>
            </div>
          </div>
          
          {/* Replace static summary example with interactive slider component */}
          <InteractiveSummarySlider />
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Spelling Correction & Text Restructuring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Spelling Correction</h3>
              <p className="text-gray-700 mb-4">
                Our spelling correction goes beyond fixing simple recognition errors to address misspellings in the original handwritten text:
              </p>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Corrects actual misspellings in the original text while preserving intended meaning</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Identifies and fixes commonly confused words based on context</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Highlights corrections with tracking that shows original vs. corrected text</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Text Restructuring</h3>
              <p className="text-gray-700 mb-4">
                Our text restructuring feature improves readability and flow while maintaining the original meaning:
              </p>
              <ul className="space-y-3 text-amber-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Reorganizes poorly structured sentences for better clarity</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Improves paragraph breaks and document structure</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Enhances logical flow of ideas while preserving the author's voice</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mt-6">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Before & After Example</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Original Text</h4>
                <p className="text-sm text-gray-600">
                  i writed this note quickly and has many error in it. the speling isnt good and the structure of sentence is poor. it doesn't have good paragraph brakes either so its hard to reed properly.
                </p>
              </div>
              <div className="p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Enhanced Text</h4>
                <p className="text-sm text-gray-600">
                  I wrote this note quickly and it has many errors in it. The spelling isn't good and the sentence structure is poor.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  It doesn't have good paragraph breaks either, so it's hard to read properly.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.5}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use Enhanced Features</h2>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveDemoTab('summary')}
                  className={`px-6 py-3 border-b-2 font-medium text-sm ${
                    activeDemoTab === 'summary'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Summarization
                </button>
                <button
                  onClick={() => setActiveDemoTab('translation')}
                  className={`px-6 py-3 border-b-2 font-medium text-sm ${
                    activeDemoTab === 'translation'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Translation
                </button>
                <button
                  onClick={() => setActiveDemoTab('spelling')}
                  className={`px-6 py-3 border-b-2 font-medium text-sm ${
                    activeDemoTab === 'spelling'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Spelling & Structure
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeDemoTab === 'summary' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Using Summarization</h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">1</span>
                      </div>
                      <div>
                        <p className="text-gray-700">Upload and process your document using Basic or Advanced Scanning</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">2</span>
                      </div>
                      <div>
                        <p className="text-gray-700">In the processing options panel, enable "Summarization"</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">3</span>
                      </div>
                      <div>
                        <p className="text-gray-700">Adjust the summary length slider from 5% (very concise) to 50% (detailed)</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">4</span>
                      </div>
                      <div>
                        <p className="text-gray-700">Process the document to receive both the full text and the summary</p>
                      </div>
                    </li>
                  </ol>
                </div>
              )}
              
              {activeDemoTab === 'translation' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Using Translation</h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">1</span>
                      </div>
                      <div>
                        <p className="text-gray-700">Upload and process your document using Basic or Advanced Scanning</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">2</span>
                      </div>
                      <div>
                        <p className="text-gray-700">In the processing options panel, toggle on "Translation (Hebrew → English)"</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">3</span>
                      </div>
                      <div>
                        <p className="text-gray-700">Process the document to see side-by-side Hebrew and English versions</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">4</span>
                      </div>
                      <div>
                        <p className="text-gray-700">Export either or both versions in your preferred format</p>
                      </div>
                    </li>
                  </ol>
                </div>
              )}
              
              {activeDemoTab === 'spelling' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Using Spelling Correction & Text Restructuring</h3>
                  <ol className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">1</span>
                      </div>
                      <div>
                        <p className="text-gray-700">Upload and process your document using Advanced Scanning (required)</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">2</span>
                      </div>
                      <div>
                        <p className="text-gray-700">In the processing options panel, enable "Spelling Correction" and/or "Text Restructuring"</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">3</span>
                      </div>
                      <div>
                        <p className="text-gray-700">Process the document to see the enhanced text with corrections highlighted</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-sm font-medium text-green-800">4</span>
                      </div>
                      <div>
                        <p className="text-gray-700">Review and accept/reject individual changes as needed before exporting</p>
                      </div>
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Link to="/home" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Try Enhanced Features Now
            </Link>
          </div>
        </FadeInSection>
      </div>
    </InfoPageLayout>
  );
};

export default EnhancedFeaturesPage;