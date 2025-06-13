// src/components/documents/DocumentCard.jsx
import React from 'react';
import { Eye, Download, Trash2, Calendar, FileText } from 'lucide-react';

const DocumentCard = ({ document, onView, onDelete }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    
    // Handle Firestore timestamp
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    
    // Mobile-friendly date format
    const isMobile = window.innerWidth < 640;
    return date.toLocaleDateString('en-US', {
      year: isMobile ? '2-digit' : 'numeric',
      month: 'short',
      day: 'numeric',
      ...(isMobile ? {} : { hour: '2-digit', minute: '2-digit' })
    });
  };

  const getEnhancementCount = () => {
    if (!document.appliedOptions) return 0;
    return [
      document.appliedOptions.enableSummarization,
      document.appliedOptions.enableTranslation,
      document.appliedOptions.enableSpellingCorrection,
      document.appliedOptions.enableStructuring
    ].filter(Boolean).length;
  };

  const getEnhancementTags = () => {
    if (!document.appliedOptions) return [];
    
    const tags = [];
    if (document.appliedOptions.enableSummarization) {
      tags.push({ label: 'Summary', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' });
    }
    if (document.appliedOptions.enableTranslation) {
      tags.push({ label: 'Translation', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' });
    }
    if (document.appliedOptions.enableSpellingCorrection) {
      tags.push({ label: 'Spelling', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' });
    }
    if (document.appliedOptions.enableStructuring) {
      tags.push({ label: 'Structure', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' });
    }
    
    return tags;
  };

  const handleDownload = (e) => {
    e.stopPropagation(); // Prevent triggering the view action
    
    const content = document.finalResult || document.enhancedText || document.originalText;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = global.document.createElement('a');
    a.href = url;
    a.download = `${document.title}.txt`;
    global.document.body.appendChild(a);
    a.click();
    global.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent triggering the view action
    onDelete();
  };

  const enhancementTags = getEnhancementTags();

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden"
      onClick={onView}
    >
      {/* Mobile-optimized Thumbnail/Preview */}
      <div className="aspect-[4/3] sm:aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
        {document.originalImageSrc ? (
          <img
            src={document.originalImageSrc}
            alt={document.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // If image fails to load, show fallback icon
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Fallback icon */}
        <div 
          className={`w-full h-full flex flex-col items-center justify-center ${document.originalImageSrc ? 'hidden' : 'flex'}`}
        >
          <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-1 sm:mb-2" />
          {document.imageNote && (
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center px-2">
              <div className="font-medium">Text saved</div>
              <div className="text-xs opacity-75 hidden sm:block">{document.imageNote}</div>
            </div>
          )}
        </div>
        
        {/* Mobile-optimized status badge */}
        {document.imageNote && (
          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            <span className="sm:hidden">📄</span>
            <span className="hidden sm:inline">📄 Text only</span>
          </div>
        )}
        {document.originalImageSrc && (
          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
            <span className="sm:hidden">🖼️</span>
            <span className="hidden sm:inline">🖼️ With image</span>
          </div>
        )}
      </div>

      {/* Mobile-optimized Content */}
      <div className="p-3 sm:p-4">
        {/* Title - better mobile truncation */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 sm:line-clamp-1">
          {document.title}
        </h3>

        {/* Date - mobile-friendly format */}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span>{formatDate(document.createdAt)}</span>
        </div>

        {/* Enhancement Tags - mobile-optimized */}
        {enhancementTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
            {/* Show only 2 tags on mobile, 3 on desktop */}
            {enhancementTags.slice(0, window.innerWidth < 640 ? 2 : 3).map((tag, index) => (
              <span
                key={index}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${tag.color}`}
              >
                {tag.label}
              </span>
            ))}
            {enhancementTags.length > (window.innerWidth < 640 ? 2 : 3) && (
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                +{enhancementTags.length - (window.innerWidth < 640 ? 2 : 3)}
              </span>
            )}
          </div>
        )}

        {/* Text Preview - mobile-optimized */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-2">
          {document.finalResult || document.enhancedText || document.originalText || 'No content available'}
        </p>

        {/* Mobile-optimized Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 sm:gap-2 flex-1">
            <button
              onClick={onView}
              className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start px-2 sm:px-3 py-2 sm:py-1.5 text-xs sm:text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors min-h-[36px] sm:min-h-0"
            >
              <Eye className="w-4 h-4 sm:w-4 sm:h-4 sm:mr-1" />
              <span className="hidden sm:inline">View</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start px-2 sm:px-3 py-2 sm:py-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors min-h-[36px] sm:min-h-0"
            >
              <Download className="w-4 h-4 sm:w-4 sm:h-4 sm:mr-1" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
          
          <button
            onClick={handleDelete}
            className="flex items-center justify-center px-2 sm:px-2 py-2 sm:py-1.5 text-xs sm:text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors min-h-[36px] sm:min-h-0 min-w-[36px] sm:min-w-0"
          >
            <Trash2 className="w-4 h-4 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;