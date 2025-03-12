import React from 'react';
import { Link } from 'react-router-dom';

const GuestButton = () => {
  return (
    <Link 
      to="/upload-guest" 
      className="w-full bg-transparent border border-blue-600 text-white py-3 rounded-md hover:bg-blue-700 hover:bg-opacity-20 transition-colors flex items-center justify-center font-medium mt-4"
    >
      Upload handwritten document as a guest
    </Link>
  );
};

export default GuestButton;