import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import { User, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

const SettingsPage = () => {
  const { currentUser } = useAuth();
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [hasChanges, setHasChanges] = useState(false);
  const isGuest = !currentUser;

  // Initialize nickname from current user
  useEffect(() => {
    if (currentUser) {
      setNickname(currentUser.displayName || '');
    }
  }, [currentUser]);

  // Check if there are unsaved changes
  useEffect(() => {
    if (currentUser) {
      setHasChanges(nickname !== (currentUser.displayName || ''));
    }
  }, [nickname, currentUser]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    // Clear any existing messages when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleSaveNickname = async (e) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    // Validate nickname
    if (nickname.trim().length < 2) {
      setMessage({ 
        type: 'error', 
        text: 'Nickname must be at least 2 characters long.' 
      });
      return;
    }

    if (nickname.trim().length > 30) {
      setMessage({ 
        type: 'error', 
        text: 'Nickname must be less than 30 characters long.' 
      });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await updateProfile(currentUser, {
        displayName: nickname.trim()
      });
      
      setMessage({ 
        type: 'success', 
        text: 'Nickname updated successfully!' 
      });
      setHasChanges(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Error updating nickname:', error);
      setMessage({ 
        type: 'error', 
        text: 'Failed to update nickname. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your account preferences and personal information.
            </p>
          </div>

          {/* Guest User Notice */}
          {isGuest && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center mb-6">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Account Required
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You need to be logged in to access account settings.
              </p>
              <div className="space-x-4">
                <Link 
                  to="/login"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}

          {/* Profile Settings Card - Only show for logged in users */}
          {!isGuest && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {/* Card Header */}
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Profile Information
                    </h2>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <form onSubmit={handleSaveNickname} className="space-y-6">
                    {/* Email Display (Read-only) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400">
                        {currentUser.email}
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Email address cannot be changed.
                      </p>
                    </div>

                    {/* Nickname Input */}
                    <div>
                      <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Display Name / Nickname
                      </label>
                      <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={handleNicknameChange}
                        placeholder="Enter your display name"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        disabled={loading}
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        This name will be displayed throughout the application.
                      </p>
                    </div>

                    {/* Message Display */}
                    {message.text && (
                      <div className={`p-3 rounded-md flex items-center ${
                        message.type === 'success' 
                          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                          : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                      }`}>
                        {message.type === 'success' ? (
                          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        )}
                        <span className="text-sm">{message.text}</span>
                      </div>
                    )}

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={loading || !hasChanges}
                        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          hasChanges && !loading
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Account Info Card */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Account Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Account Type:</span>
                    <span className="text-gray-900 dark:text-white font-medium">Registered User</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Member Since:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {currentUser.metadata?.creationTime 
                        ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                        : 'Unknown'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Last Sign In:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {currentUser.metadata?.lastSignInTime 
                        ? new Date(currentUser.metadata.lastSignInTime).toLocaleDateString()
                        : 'Unknown'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;