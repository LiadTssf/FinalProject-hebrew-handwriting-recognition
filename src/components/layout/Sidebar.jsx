import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';
import LogoutButton from '../auth/LogOutButton'; 
import SettingsButton from '../common/SettingsButton';
import { useAuth } from '../../contexts/AuthContext'; 
import { ScanLine, Boxes  } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [infoExpanded, setInfoExpanded] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useAuth();  // get the logged-in user from context
  const isGuest = !currentUser;

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarOpen && 
          !event.target.closest('.sidebar') && 
          !event.target.closest('.sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [sidebarOpen]);
  
  const navigationItems = [
    {
      title: 'Upload Docs',
      path: '/home',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Processing Options',
      path: '/processing-options',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
      )
    },
    {
      title: 'My Documents',
      path: '/documents',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  // Modified filter to keep "Calibrate Model" for guest users
  const filteredNavigationItems = isGuest
    ? navigationItems.filter(item =>
        item.title !== 'My Documents'
      )
    : navigationItems;
    
const infoItems = [
  {
    title: 'Photo Instructions',
    path: '/info/photo-instructions',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    title: 'How Digi-Ktav Works',
    path: '/info/basic-scanning',
    icon: <ScanLine className="w-5 h-5" />
  },
  {
    title: 'Extra Features',
    path: '/info/extra-features',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Gemini API',
    path: '/info/gemini-api',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'The Technologies',
    path: '/info/models-description',
    icon: <Boxes className="w-5 h-5" />
  }
];

  const renderNavItem = (item) => (
    <li key={item.path}>
      <Link
        to={item.path}
        className={`flex items-center px-5 py-3 text-base text-gray-300 hover:bg-gray-700 hover:text-white ${
          location.pathname === item.path ? 'bg-gray-700 text-white' : ''
        }`}
      >
        <span className="w-6 h-6 mr-4 flex-shrink-0">{item.icon}</span>
        <span>{item.title}</span>
      </Link>
    </li>
  );
  
  const renderInfoItem = (item) => (
    <li key={item.path}>
      <Link
        to={item.path}
        className={`flex items-center pl-11 pr-5 py-2 text-gray-400 hover:bg-gray-700 hover:text-white text-base ${
          location.pathname === item.path ? 'bg-gray-700 text-white' : ''
        }`}
      >
        <span className="w-5 h-5 mr-3 flex-shrink-0">{item.icon}</span>
        <span>{item.title}</span>
      </Link>
    </li>
  );
  
  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sidebar-toggle fixed top-4 left-4 z-40 md:hidden bg-gray-800 p-2 rounded-md text-gray-200 hover:bg-gray-700 focus:outline-none"
        aria-label="Toggle sidebar"
      >
        <svg 
          className="w-7 h-7" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {sidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {/* Backdrop overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`sidebar fixed md:static inset-y-0 left-0 z-40 bg-gray-800 text-white w-80 min-h-screen flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-7 h-7 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h1 className="text-2xl font-bold">Digi-Ktav</h1>
          </div>
          
          {/* Close button only on mobile */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="flex-1 py-3 overflow-y-auto">
          <ul className="space-y-1">
            {filteredNavigationItems.map(renderNavItem)}
          </ul>
          
          <div className="mx-5 my-4 border-t border-gray-700 opacity-70"></div>
          
          <div className="px-5 py-3">
            <div 
              className="flex items-center text-base text-gray-400 cursor-pointer"
              onClick={() => setInfoExpanded(!infoExpanded)}
            >
              <span className="w-5 h-5 mr-3 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <span>Models Description</span>
              <svg 
                className={`w-5 h-5 ml-auto transition-transform duration-200 ${infoExpanded ? 'transform rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {infoExpanded && (
              <ul className="mt-2 space-y-1">
                {infoItems.map(renderInfoItem)}
              </ul>
            )}
          </div>
        </nav>
        
        {/* Border line separation above user profile box */}
        <div className="border-t border-gray-700 p-5">
          <div className="flex items-center mb-5">
            <div className="w-10 h-10 bg-gray-600 rounded-full overflow-hidden mr-4">
              <svg className="w-full h-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-base font-medium">
                {isGuest ? "Guest User" : (currentUser?.displayName || "User")}
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-4 space-y-1">
            {/* Theme toggle with text label */}
            <button 
              onClick={toggleTheme}
              className="w-full flex items-center px-4 py-3 text-base text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
            >
              <ThemeToggle />
              <span className="ml-4">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
            
            {/* Settings button - only show for logged in users */}
            {!isGuest && <SettingsButton />}
            
            {/* Logout button */}
            <LogoutButton />
          </div>
        </div>
      </div>
      
      {/* Main content padding for mobile */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default Sidebar;