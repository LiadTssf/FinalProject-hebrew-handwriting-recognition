// src/pages/MyDocumentsPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserDocuments, deleteDocument } from '../services/firebaseService';
import Sidebar from '../components/layout/Sidebar';
import DocumentCard from '../components/documents/DocumentCard';
import DocumentViewModal from '../components/documents/DocumentViewModal';
import { AlertCircle, Upload, Loader, Plus } from 'lucide-react';

const MyDocumentsPage = () => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const isGuest = !currentUser;

  useEffect(() => {
    if (currentUser) {
      fetchDocuments();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError('');
      const userDocs = await getUserDocuments(currentUser.uid);
      setDocuments(userDocs);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError('Failed to load documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDocument = (document) => {
    setSelectedDocument(document);
    setShowViewModal(true);
  };

  const handleDeleteDocument = async (documentId) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      try {
        await deleteDocument(documentId);
        setDocuments(documents.filter(doc => doc.id !== documentId));
      } catch (err) {
        console.error('Error deleting document:', err);
        setError('Failed to delete document. Please try again.');
      }
    }
  };

  const handleDocumentUpdate = (updatedDocument) => {
    setDocuments(documents.map(doc => 
      doc.id === updatedDocument.id ? updatedDocument : doc
    ));
  };

  // Guest user view
  if (isGuest) {
    return (
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="text-center py-8 sm:py-12">
              <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Account Required
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 px-4">
                You need to be logged in to view your saved documents.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Link 
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Mobile-optimized Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white truncate">
                My Documents
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                Manage your saved Hebrew document processing results
              </p>
            </div>
            
            {/* Desktop Upload Button */}
            <div className="hidden sm:block flex-shrink-0">
              <Link
                to="/home"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload New Document
              </Link>
            </div>
          </div>

          {/* Mobile Upload Button */}
          <div className="sm:hidden mb-6">
            <Link
              to="/home"
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Upload New Document
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm sm:text-base text-red-800 dark:text-red-300">{error}</span>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12 sm:py-16">
              <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Loading your documents...</p>
            </div>
          ) : (
            <>
              {/* Documents Grid - Mobile Optimized */}
              {documents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {documents.map(doc => (
                    <DocumentCard 
                      key={doc.id} 
                      document={doc}
                      onView={() => handleViewDocument(doc)}
                      onDelete={() => handleDeleteDocument(doc.id)}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State - Mobile Optimized */
                <div className="text-center py-12 sm:py-16 px-4">
                  <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No documents yet
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Get started by processing your first handwritten Hebrew document.
                  </p>
                  <Link
                    to="/home"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Document
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Show total count on mobile */}
          {!loading && documents.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 sm:hidden">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                {documents.length} document{documents.length !== 1 ? 's' : ''} total
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Document View Modal - Mobile Optimized */}
      {selectedDocument && (
        <DocumentViewModal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          document={selectedDocument}
          onUpdate={handleDocumentUpdate}
          onDelete={() => handleDeleteDocument(selectedDocument.id)}
        />
      )}
    </div>
  );
};

export default MyDocumentsPage;