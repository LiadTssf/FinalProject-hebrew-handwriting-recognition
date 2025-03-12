import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import DocumentCard from '../components/documents/DocumentCard';

const MyDocumentsPage = () => {
  // Mock documents data - this would come from your API/Firebase
  const documents = [
    {
      id: '1',
      title: 'Research Notes',
      createdAt: new Date('2023-06-15T14:32:00'),
      thumbnail: '/path/to/thumbnail1.jpg',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Meeting Minutes',
      createdAt: new Date('2023-06-10T09:15:00'),
      thumbnail: '/path/to/thumbnail2.jpg',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Personal Letter',
      createdAt: new Date('2023-06-05T11:48:00'),
      thumbnail: '/path/to/thumbnail3.jpg',
      status: 'completed'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Documents</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map(doc => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
          
          {documents.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by uploading a handwritten document.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyDocumentsPage;