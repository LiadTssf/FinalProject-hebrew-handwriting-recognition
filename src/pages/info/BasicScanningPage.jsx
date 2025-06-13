import React, { useState } from 'react';
import { InfoPageLayout, FadeInSection, InfoCard, AdaptiveInfoCard} from '../../components/info/InfoPageLayout';
import { Link } from 'react-router-dom';
const BasicScanningPage = () => {
  const [showFullImage, setShowFullImage] = useState(false);

  return (
    <InfoPageLayout
      title="How Digi-Ktav Works"
      subtitle="Advanced Hebrew handwriting recognition powered by Vision Transformers and AI"
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      }
      color="blue"
    >
      <div className="space-y-10">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-lg text-gray-700 mb-6">
            Digi-Ktav converts handwritten Hebrew documents into editable digital text through a sophisticated three-stage pipeline. 
            Our system combines advanced image processing, state-of-the-art Vision Transformer technology, and AI-powered contextual 
            correction to achieve industry-leading accuracy in Hebrew handwriting recognition.
          </p>
          
          <div 
            className="relative h-80 bg-gray-50 rounded-xl overflow-hidden my-8 border border-gray-200 cursor-pointer" 
            onClick={() => setShowFullImage(true)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/images/digiktav_arch_diagram.png" 
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
              <p className="text-sm text-gray-600">Diagram: Complete handwriting recognition pipeline (Click to enlarge)</p>
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
                  src="/images/digiktav_arch_diagram.png"
                  alt="OCR Process Diagram (Enlarged)" 
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>
            </div>
          )}
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our 3-Stage Recognition Pipeline</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">

    <AdaptiveInfoCard
      title="1. Image Preprocessing"
      easyText="We clean and prepare each document image so it’s sharp and simple for the computer to understand."
      description="Documents are resized to 4500x3000 pixels, undergo noise reduction, line removal, and binarization to create clean black-and-white images optimized for character segmentation."
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      }
      delay={0.1}
    />

    <AdaptiveInfoCard
      title="2. Line Segmentation"
      easyText="We cut the document into rows so each line of text stands alone and is easier to read."
      description="Horizontal Projection Profiles (HPP) identify text lines. Boundaries are refined using inter-line gap midpoints and top/bottom extensions, followed by content-aware re-cropping for tight line images."
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      }
      delay={0.15}
    />

    <AdaptiveInfoCard
      title="3. Letter & Space Segmentation"
      easyText="We carefully split each line into individual letters and the spaces between them."
      description="Each line is segmented into individual characters and spaces using contour analysis, advanced filtering (including top fragment and Lamed overhang rules), and component merging."
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.964 2.364a2 2 0 010 2.828l-3.535 3.536a2 2 0 01-2.828 0L6.066 5.192a2 2 0 112.828-2.828l3.535 3.535m2.475-2.475l-3.536 3.536m0 0L6.066 16.192M19.5 9.481l-3.308 3.308M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      }
      delay={0.2}
    />

    <AdaptiveInfoCard
      title="4. Vision Transformer Recognition"
      easyText="Our AI reads each letter and understands even tricky Hebrew writing styles with high accuracy."
      description="Our fine-tuned ViT model (google/vit-base-patch16-224) analyzes segmented characters with 94.4% accuracy, using self-attention mechanisms to understand complex Hebrew letter patterns."
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      }
      delay={0.2}
    />

    <AdaptiveInfoCard
      title="5. AI-Powered Correction"
      easyText="Our AI double-checks everything and fixes mistakes to make the Hebrew text more accurate and readable."
      description="Google's Gemini API analyzes the recognized text contextually, correcting OCR errors and improving word accuracy from ~60% up to ~90%, ensuring meaningful Hebrew output."
      icon={
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      }
      delay={0.3}
    />

  </div>
</FadeInSection>

        
        <FadeInSection delay={0.3}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Character Segmentation Challenge</h2>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 mb-6">
            <h3 className="text-xl font-semibold text-purple-800 mb-3">The Bottleneck in Hebrew Recognition</h3>
            <p className="text-gray-700 mb-4">
              While our Vision Transformer achieves 94% accuracy on isolated characters, the main challenge lies in accurately 
              segmenting handwritten Hebrew text into individual characters. This segmentation stage currently limits our 
              end-to-end system performance.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Lamed (ל) Overhang Issue</strong>: The tall Lamed character often extends over adjacent letters, causing segmentation to merge multiple characters into one box, frequently misrecognized as Tet (ט).</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Connected Characters</strong>: Cursive Hebrew writing often connects letters, making boundary detection difficult with traditional contour analysis.</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Variable Spacing</strong>: Inconsistent spacing between words and characters in handwritten text complicates proper text reconstruction.</span>
              </li>
            </ul>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.4}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vision Transformer Technology</h2>
          <p className="text-gray-700 mb-6">
            Unlike traditional CNNs that process images locally, our Vision Transformer divides character images into patches 
            and uses self-attention mechanisms to understand global relationships. This approach proved superior for Hebrew 
            character recognition, especially for letters with disconnected components.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Performance Metrics</h3>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>94.4%</strong> character recognition accuracy (on isolated characters)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>~75%</strong> character accuracy after full pipeline processing</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>~90%</strong> word accuracy after Gemini correction</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>~40 seconds</strong> average processing time per page</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Support for <strong>PNG and JPG</strong> image formats</span>
              </li>
            </ul>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.5}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Gemini-Powered Contextual Correction</h2>
          <p className="text-gray-700 mb-6">
            Every recognition result is automatically enhanced by Google's Gemini API, which applies contextual understanding 
            to correct OCR errors. This crucial step improves accuracy by 20-25 percentage points.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-green-800 mb-3">What Gemini Corrects</h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Common character confusion: ו→י, נ→כ, ר↔כ, ט↔ל</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Lamed overhang errors where ל + another letter is misread as ט</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Missing or extra characters based on Hebrew language context</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Incorrect spacing and punctuation</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Correction Principles</h3>
              <ul className="space-y-3 text-amber-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Preserves original text structure and intent</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">No paraphrasing or content modification</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Removes all Hebrew diacritics (nikkud)</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="ml-2">Focused on character-level OCR error correction only</span>
                </li>
              </ul>
            </div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.6}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
          <p className="text-gray-700 mb-6">
            Using Digi-Ktav is simple: upload your handwritten Hebrew document, wait for processing, and receive your 
            digitized text ready for editing and enhancement.
          </p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 mb-8">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Quick Start Guide</h3>
            <ol className="space-y-4 text-blue-700">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-200 font-semibold mr-3">1</span>
                <div>
                  <span className="font-semibold">Upload Your Document</span>
                  <p className="text-sm text-gray-600 mt-1">Select a PNG or JPG image of your handwritten Hebrew text</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-200 font-semibold mr-3">2</span>
                <div>
                  <span className="font-semibold">Wait for Processing</span>
                  <p className="text-sm text-gray-600 mt-1">Our AI pipeline processes your document (~40 seconds per page)</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-200 font-semibold mr-3">3</span>
                <div>
                  <span className="font-semibold">Review & Edit</span>
                  <p className="text-sm text-gray-600 mt-1">Check the recognized text and make any necessary corrections</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-200 font-semibold mr-3">4</span>
                <div>
                  <span className="font-semibold">Apply Enhancements (Optional)</span>
                  <p className="text-sm text-gray-600 mt-1">Use our advanced features for translation, summarization, or formatting</p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="flex justify-center">
            <Link to="/home" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center text-lg">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Start Digitizing Now
            </Link>
          </div>
        </FadeInSection>
      </div>
    </InfoPageLayout>
  );
};

export default BasicScanningPage;