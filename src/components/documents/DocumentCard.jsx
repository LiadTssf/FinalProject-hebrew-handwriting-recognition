import React from 'react';
import { format } from 'date-fns';

const DocumentCard = ({ document }) => {
  const { id, title, createdAt, thumbnail, status } = document;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-3 aspect-h-2">
        <img 
          src={thumbnail || '/placeholder-document.jpg'} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg truncate">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {format(createdAt, 'MMM d, yyyy')}
        </p>
        
        <div className="mt-4 flex justify-between">
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            View
          </button>
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            Download
          </button>
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;