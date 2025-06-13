// src/components/documents/SaveDocumentModal.jsx
import React, { useState } from 'react';
import { X, Save, AlertCircle, CheckCircle } from 'lucide-react';

const SaveDocumentModal = ({ isOpen, onClose, onSave, isLoading }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim().length < 1) {
      setError('Please enter a document title');
      return;
    }
    
    if (title.trim().length > 100) {
      setError('Title must be less than 100 characters');
      return;
    }
    
    setError('');
    onSave(title.trim());
  };

  const handleClose = () => {
    if (!isLoading) {
      setTitle('');
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Mobile: Bottom sheet style, Desktop: Centered modal */}
      <div className="bg-white dark:bg-gray-800 w-full sm:max-w-md sm:w-full rounded-t-lg sm:rounded-lg shadow-xl">
        
        {/* Mobile-optimized Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4 sm:p-4">
          <h3 className="text-lg sm:text-lg font-medium text-gray-900 dark:text-white">
            Save Document
          </h3>
          <button 
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-500 disabled:opacity-50 p-1 sm:p-0"
            aria-label="Close"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
        
        {/* Mobile-optimized Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-4 space-y-4 sm:space-y-4">
          <div>
            <label htmlFor="document-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Document Title
            </label>
            <input
              type="text"
              id="document-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a name for your document..."
              disabled={isLoading}
              className="w-full px-3 py-3 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 text-base sm:text-sm"
              maxLength={100}
              autoFocus
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {title.length}/100 characters
            </p>
          </div>

          {error && (
            <div className="flex items-start p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Mobile-optimized info section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="flex items-start">
              <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-medium mb-2">This will save:</p>
                <ul className="text-xs space-y-1 ml-0">
                  <li>• Your processed text results</li>
                  <li>• Original document image (auto-compressed if needed)</li>
                  <li>• Enhancement settings used</li>
                  <li>• Creation date and time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile-optimized Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 pt-2 sm:pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="w-full sm:w-auto order-2 sm:order-1 px-4 py-3 sm:py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center px-4 py-3 sm:py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg sm:rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving document...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Document
                </>
              )}
            </button>
          </div>
        </form>

        {/* Mobile-optimized Additional info about save process */}
        {isLoading && (
          <div className="px-4 pb-4 sm:px-4 sm:pb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <p className="text-xs text-blue-800 dark:text-blue-300 text-center">
                💾 Saving document and optimizing image...
              </p>
            </div>
          </div>
        )}

        {/* Mobile: Add safe area padding at bottom */}
        <div className="h-4 sm:hidden"></div>
      </div>
    </div>
  );
};

export default SaveDocumentModal;