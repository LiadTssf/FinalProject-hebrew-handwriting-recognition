// src/components/ocr/FinalTextView.jsx
import React, { useState } from 'react';
import { Download, ArrowLeft, Edit, Copy, Check, Save, Cloud, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { saveDocument } from '../../services/firebaseService';
import SaveDocumentModal from '../documents/SaveDocumentModal';

const FinalTextView = ({
  originalImageSrc,
  enhancedText,
  parsedResult,
  originalText,
  appliedOptions,
  filename,
  onBackToUpload,
  onBackToCorrection
}) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    // Start with combined view if multiple enhancements are selected
    const enhancementCount = [
      appliedOptions?.enableSummarization,
      appliedOptions?.enableTranslation, 
      appliedOptions?.enableSpellingCorrection,
      appliedOptions?.enableStructuring
    ].filter(Boolean).length;
    
    return enhancementCount > 1 ? 'combined' : 'enhanced';
  });
  const [copiedSection, setCopiedSection] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });

  // Check how many enhancements are applied
  const enhancementCount = [
    appliedOptions?.enableSummarization,
    appliedOptions?.enableTranslation, 
    appliedOptions?.enableSpellingCorrection,
    appliedOptions?.enableStructuring
  ].filter(Boolean).length;

  const isGuest = !currentUser;

  // Create combined text from the final pipeline result
  const createCombinedText = () => {
    // Return only the FINAL result after all processing
    if (parsedResult?.finalTranslation) {
      // If translation was selected, show the final English result
      return parsedResult.finalTranslation;
    } else if (parsedResult?.afterSummarization) {
      // If summarization was the last step, show the summary
      return parsedResult.afterSummarization;
    } else if (parsedResult?.afterRestructuring) {
      // If restructuring was the last step, show the restructured text
      return parsedResult.afterRestructuring;
    } else if (parsedResult?.afterSpelling) {
      // If spelling correction was the last step, show the corrected text
      return parsedResult.afterSpelling;
    }
    
    // Fallback to raw response if parsing failed
    return enhancedText || originalText;
  };

  // Create pipeline steps text for individual view
  const createPipelineStepsText = () => {
    let stepsText = '';
    
    // Show each step of the pipeline
    if (parsedResult?.original) {
      stepsText += `=== STEP 0: ORIGINAL TEXT ===\n${parsedResult.original}\n\n`;
    }
    
    if (parsedResult?.afterSpelling) {
      stepsText += `=== STEP 1: AFTER SPELLING CORRECTION ===\n${parsedResult.afterSpelling}\n\n`;
    }
    
    if (parsedResult?.afterRestructuring) {
      stepsText += `=== STEP 2: AFTER RESTRUCTURING ===\n${parsedResult.afterRestructuring}\n\n`;
    }
    
    if (parsedResult?.afterSummarization) {
      stepsText += `=== STEP 3: AFTER SUMMARIZATION ===\n${parsedResult.afterSummarization}\n\n`;
    }
    
    if (parsedResult?.finalTranslation) {
      stepsText += `=== STEP 4: FINAL ENGLISH TRANSLATION ===\n${parsedResult.finalTranslation}\n\n`;
    }
    
    // If no parsed sections, use the raw response
    if (!stepsText && enhancedText) {
      stepsText = enhancedText;
    }
    
    return stepsText.trim();
  };

  const handleCopy = async (text, sectionName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionName);
      setTimeout(() => setCopiedSection(''), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleSaveDocument = async (title) => {
    if (!currentUser) {
      setSaveMessage({ type: 'error', text: 'You must be logged in to save documents.' });
      return;
    }

    setIsSaving(true);
    setSaveMessage({ type: '', text: '' });

    try {
      const documentData = {
        title: title,
        originalText: originalText,
        enhancedText: enhancedText,
        parsedResult: parsedResult,
        appliedOptions: appliedOptions,
        originalImageSrc: originalImageSrc, // This will be handled by the service
        filename: filename,
        finalResult: createCombinedText()
      };

      console.log('Saving document with image upload...');
      const documentId = await saveDocument(currentUser.uid, documentData);
      
      setSaveMessage({ 
        type: 'success', 
        text: 'Document saved successfully!' 
      });
      
      setShowSaveModal(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage({ type: '', text: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Error saving document:', error);
      setSaveMessage({ 
        type: 'error', 
        text: 'Failed to save document. Please try again.' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    let content, filename_suffix;
    
    if (activeTab === 'combined') {
      content = createCombinedText();
      filename_suffix = 'final_result';
    } else if (activeTab === 'enhanced') {
      content = createPipelineStepsText();
      filename_suffix = 'pipeline_steps';
    } else {
      content = originalText;
      filename_suffix = 'original';
    }
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${filename_suffix}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const CopyButton = ({ text, sectionName, className = "" }) => (
    <button
      onClick={() => handleCopy(text, sectionName)}
      className={`flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded transition-colors ${className}`}
      title="Copy to clipboard"
    >
      {copiedSection === sectionName ? (
        <>
          <Check className="w-3 h-3 mr-1 text-green-600" />
          <span className="text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3 h-3 mr-1" />
          <span className="hidden sm:inline">Copy</span>
        </>
      )}
    </button>
  );

  const SectionHeader = ({ title, children }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );

  const TextSection = ({ content, placeholder }) => (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 max-h-64 sm:max-h-80 overflow-y-auto">
      <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
        {content || placeholder}
      </pre>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col space-y-4 mb-4">
          {/* Title and Description */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Enhancement Results</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm sm:text-base">
              Review your enhanced text with applied AI features
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {!isGuest && (
              <button
                onClick={() => setShowSaveModal(true)}
                className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-sm sm:text-base"
              >
                <Cloud className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Save to My Documents</span>
                <span className="sm:hidden">Save Document</span>
              </button>
            )}
            <button
              onClick={onBackToUpload}
              className="flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm sm:text-base"
            >
              <Edit className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Upload New File</span>
              <span className="sm:hidden">New File</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm sm:text-base"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        </div>

        {/* Save Message */}
        {saveMessage.text && (
          <div className={`mt-4 p-3 rounded-md flex items-start ${
            saveMessage.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
          }`}>
            <div className="flex-shrink-0 mt-0.5">
              {saveMessage.type === 'success' ? (
                <Check className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
            </div>
            <span className="text-sm ml-2">{saveMessage.text}</span>
          </div>
        )}

        {/* Guest Save Notice */}
        {isGuest && (
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-start">
              <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-medium mb-1">Want to save your documents?</p>
                <p className="mb-2">Create an account to save your processed documents and access them anytime from "My Documents".</p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    Sign Up
                  </Link>
                  <span>or</span>
                  <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Applied Enhancements Summary */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">Applied Enhancements:</h3>
          <div className="flex flex-wrap gap-2">
            {appliedOptions?.enableSummarization && (
              <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm">
                Summarization ({appliedOptions.summaryLength}%)
              </span>
            )}
            {appliedOptions?.enableTranslation && (
              <span className="px-2 sm:px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-xs sm:text-sm">
                Translation ({appliedOptions.translationStyle})
              </span>
            )}
            {appliedOptions?.enableSpellingCorrection && (
              <span className="px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full text-xs sm:text-sm">
                Spelling Correction
              </span>
            )}
            {appliedOptions?.enableStructuring && (
              <span className="px-2 sm:px-3 py-1 bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full text-xs sm:text-sm">
                Text Restructuring
              </span>
            )}
            {(!appliedOptions?.enableSummarization && !appliedOptions?.enableTranslation && 
              !appliedOptions?.enableSpellingCorrection && !appliedOptions?.enableStructuring) && (
              <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-xs sm:text-sm">
                No enhancements applied
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Original Image */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <SectionHeader title="Original Document" />
          <div className="flex justify-center">
            <img
              src={originalImageSrc}
              alt="Original document"
              className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
              style={{ maxHeight: '300px' }}
            />
          </div>
        </div>

        {/* Text Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          
          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {enhancementCount > 1 && (
              <button
                onClick={() => setActiveTab('combined')}
                className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'combined'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Final Result
              </button>
            )}
            <button
              onClick={() => setActiveTab('enhanced')}
              className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'enhanced'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="hidden sm:inline">
                {enhancementCount > 1 ? 'Individual Sections' : 'Enhanced Text'}
              </span>
              <span className="sm:hidden">
                {enhancementCount > 1 ? 'Sections' : 'Enhanced'}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('original')}
              className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'original'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <span className="hidden sm:inline">Your Edited Text</span>
              <span className="sm:hidden">Original</span>
            </button>
          </div>

          {activeTab === 'combined' ? (
            <div>
              <SectionHeader title="Final Result">
                <CopyButton text={createCombinedText()} sectionName="combined" />
              </SectionHeader>
              <TextSection content={createCombinedText()} />
            </div>
          ) : activeTab === 'enhanced' ? (
            <div className="space-y-4 sm:space-y-6">
              
              {/* Show each pipeline step individually */}
              {parsedResult?.afterSpelling && (
                <div>
                  <SectionHeader title="Step 1: After Spelling Correction">
                    <CopyButton text={parsedResult.afterSpelling} sectionName="spelling" />
                  </SectionHeader>
                  <TextSection content={parsedResult.afterSpelling} />
                </div>
              )}

              {parsedResult?.afterRestructuring && (
                <div>
                  <SectionHeader title="Step 2: After Text Restructuring">
                    <CopyButton text={parsedResult.afterRestructuring} sectionName="restructuring" />
                  </SectionHeader>
                  <TextSection content={parsedResult.afterRestructuring} />
                </div>
              )}

              {parsedResult?.afterSummarization && (
                <div>
                  <SectionHeader title="Step 3: After Summarization">
                    <CopyButton text={parsedResult.afterSummarization} sectionName="summary" />
                  </SectionHeader>
                  <TextSection content={parsedResult.afterSummarization} />
                </div>
              )}

              {parsedResult?.finalTranslation && (
                <div>
                  <SectionHeader title="Step 4: Final English Translation">
                    <CopyButton text={parsedResult.finalTranslation} sectionName="translation" />
                  </SectionHeader>
                  <TextSection content={parsedResult.finalTranslation} />
                </div>
              )}

              {/* Show full pipeline steps for copying */}
              {enhancementCount > 1 && (
                <div>
                  <SectionHeader title="Complete Pipeline Steps">
                    <CopyButton text={createPipelineStepsText()} sectionName="pipeline" />
                  </SectionHeader>
                  <TextSection content={createPipelineStepsText()} />
                </div>
              )}

              {/* Fallback if no parsed sections */}
              {!parsedResult?.afterSpelling && !parsedResult?.afterRestructuring && 
               !parsedResult?.afterSummarization && !parsedResult?.finalTranslation && (
                <div>
                  <SectionHeader title="AI Enhanced Text">
                    <CopyButton text={enhancedText} sectionName="full" />
                  </SectionHeader>
                  <TextSection 
                    content={enhancedText} 
                    placeholder="No enhancements were applied to the text."
                  />
                </div>
              )}

            </div>
          ) : (
            <div>
              <SectionHeader title="Your Original Edited Text">
                <CopyButton text={originalText} sectionName="original" />
              </SectionHeader>
              <TextSection content={originalText} />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <button
          onClick={onBackToCorrection}
          className="flex items-center justify-center sm:justify-start px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Text Editor
        </button>
        
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-end">
          <span>✨ Processed with AI enhancements</span>
        </div>
      </div>

      {/* Save Document Modal */}
      <SaveDocumentModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveDocument}
        isLoading={isSaving}
      />
    </div>
  );
};

export default FinalTextView;