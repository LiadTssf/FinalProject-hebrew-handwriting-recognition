import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="flex items-center px-2 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
    >
      {/* The logout icon on the left */}
      <svg 
        className="w-5 h-5 mr-3" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>Log out</span>
    </button>
  );
}
