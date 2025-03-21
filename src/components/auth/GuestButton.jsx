// GuestButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GuestButton() {
  const navigate = useNavigate();

  const handleGuestClick = () => {
    // Directly navigate to the home page demo without anonymous sign-in.
    navigate('/home');
  };

  return (
    <button
      onClick={handleGuestClick}
      className="w-full bg-transparent border border-blue-600 text-white py-3 rounded-md hover:bg-blue-700 hover:bg-opacity-20 transition-colors flex items-center justify-center font-medium mt-4"
    >
      Upload handwritten document as a guest
    </button>
  );
}
