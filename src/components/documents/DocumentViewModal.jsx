// src/components/documents/DocumentViewModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Download, Edit2, Save, Calendar, Tag, Copy, Check, Trash2, ChevronDown } from 'lucide-react';
import { updateDocument } from '../../services/firebaseService';

const DocumentViewModal = ({ isOpen, onClose, document, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('final');
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    if (document) {
      setEditedTitle(document.title);
      setEditedContent(document.finalResult || document.enhancedText || document.originalText);
    }
  }, [document]);

  if (!isOpen || !document) return null;

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    
    // Mobile-friendly date format
    const isMobile = window.innerWidth < 640;
    return date.toLocaleDateString('en-US', {
      year: isMobile ? '2-digit' : 'numeric',
      month: isMobile ? 'short' : 'long',
      day: 'numeric',
      ...(isMobile ? {} : { hour: '2-digit', minute: '2-digit' })
    });
  };

  const getEnhancementTags = () => {
    if (!document.appliedOptions) return [];
    
    const tags = [];
    if (document.appliedOptions.enableSummarization) {
      tags.push({ label: `Summary (${document.appliedOptions.summaryLength}%)`, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' });
    }
    if (document.appliedOptions.enableTranslation) {
      tags.push({ label: `Translation (${document.appliedOptions.translationStyle})`, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' });
    }
    if (document.appliedOptions.enableSpellingCorrection) {
      tags.push({ label: 'Spelling Correction', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' });
    }
    if (document.appliedOptions.enableStructuring) {
      tags.push({ label: 'Text Restructuring', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' });
    }
    
    return tags;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = {
        title: editedTitle,
        finalResult: editedContent
      };
      
      await updateDocument(document.id, updates);
      
      const updatedDocument = {
        ...document,
        ...updates,
        updatedAt: new Date()
      };
      
      onUpdate(updatedDocument);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Failed to update document. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleDownload = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = global.document.createElement('a');
    a.href = url;
    a.download = filename;
    global.document.body.appendChild(a);
    a.click();
    global.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const enhancementTags = getEnhancementTags();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      {/* Mobile: Full screen modal, Desktop: Centered modal */}
      <div className="bg-white dark:bg-gray-800 w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:w-full sm:rounded-lg shadow-xl overflow-hidden flex flex-col">
        
        {/* Mobile-optimized Header */}
        <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 p-3 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 mr-2 sm:mr-4 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-lg sm:text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-white w-full"
                  autoFocus
                />
              ) : (
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white line-clamp-2 sm:line-clamp-1">
                  {document.title}
                </h2>
              )}
              
              <div className="flex flex-col sm:flex-row sm:items-center mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 gap-1 sm:gap-0">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span>Created: {formatDate(document.createdAt)}</span>
                </div>
                {document.updatedAt && document.updatedAt !== document.createdAt && (
                  <span className="sm:ml-4">• Updated: {formatDate(document.updatedAt)}</span>
                )}
              </div>
            </div>
            
            {/* Desktop actions */}
            <div className="hidden sm:flex items-center space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    disabled={isSaving}
                    className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDownload(document.finalResult || document.enhancedText || document.originalText, `${document.title}.txt`)}
                    className="flex items-center px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                  <button
                    onClick={onDelete}
                    className="flex items-center px-3 py-1.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </>
              )}
            </div>

            {/* Mobile: Close button and actions toggle */}
            <div className="sm:hidden flex items-center space-x-2">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
              >
                <ChevronDown className={`h-5 w-5 transition-transform ${showActions ? 'rotate-180' : ''}`} />
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Desktop close button */}
            <button 
              onClick={onClose}
              className="hidden sm:block text-gray-400 hover:text-gray-500 transition-colors ml-2"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile actions dropdown */}
          {showActions && (
            <div className="sm:hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                      className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors disabled:opacity-50"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm"
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDownload(document.finalResult || document.enhancedText || document.originalText, `${document.title}.txt`)}
                      className="flex items-center justify-center px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-sm"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                    <button
                      onClick={onDelete}
                      className="flex items-center justify-center px-3 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md text-sm col-span-2"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete Document
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Enhancement Tags */}
        {enhancementTags.length > 0 && (
          <div className="flex-shrink-0 px-3 sm:px-6 py-2 sm:py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-2">
              <Tag className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Applied Enhancements:</span>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {enhancementTags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${tag.color}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Content Tabs - Mobile scrollable */}
        <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <nav className="flex -mb-px min-w-max">
            <button
              onClick={() => setActiveTab('final')}
              className={`px-3 sm:px-6 py-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                activeTab === 'final'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Final Result
            </button>
            {document.originalImageSrc && (
              <button
                onClick={() => setActiveTab('original')}
                className={`px-3 sm:px-6 py-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'original'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Original Image
              </button>
            )}
            {document.originalText && (
              <button
                onClick={() => setActiveTab('original-text')}
                className={`px-3 sm:px-6 py-3 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === 'original-text'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Original Text
              </button>
            )}
          </nav>
        </div>

        {/* Content - Flexible height */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6">
          {activeTab === 'final' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                  {isEditing ? 'Edit Content' : 'Final Result'}
                </h3>
                {!isEditing && (
                  <button
                    onClick={() => handleCopy(editedContent)}
                    className="flex items-center px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1 text-green-600" />
                        <span className="hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full h-48 sm:h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Enter document content..."
                />
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 min-h-[200px] sm:min-h-[300px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
                    {editedContent || 'No content available'}
                  </pre>
                </div>
              )}
            </div>
          )}

          {activeTab === 'original' && document.originalImageSrc && (
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-4">Original Document Image</h3>
              <div className="flex justify-center">
                <img
                  src={document.originalImageSrc}
                  alt="Original document"
                  className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
                  style={{ maxHeight: '70vh' }}
                />
              </div>
            </div>
          )}

          {activeTab === 'original-text' && document.originalText && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Original Text (Before Enhancements)</h3>
                <button
                  onClick={() => handleCopy(document.originalText)}
                  className="flex items-center px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1" />
                  <span className="hidden sm:inline">Copy</span>
                </button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 min-h-[200px] sm:min-h-[300px] overflow-y-auto">
                <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-mono leading-relaxed">
                  {document.originalText}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewModal;