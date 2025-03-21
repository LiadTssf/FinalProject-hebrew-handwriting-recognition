//LoginForm
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// 1) Import auth + signInWithEmailAndPassword:
import { auth } from '../../lib/firebase/firebaseinit'; // adjust the path
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
  // 2) rename "username" to "email":
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      
      navigate('/home');
    } catch (error) {
      // If error (bad password, no user found, etc.):
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div>
      <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
          Email
        </label>
        <input 
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@digitizeme.io"
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Password</label>
        <input 
          type="password" 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••••"
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
        Log In
      </button>
      
      <div className="text-center text-sm text-gray-400">
        <p>enhance accuracy with personalized model calibration</p>
      </div>
      
      <Link 
        to="/signup" 
        className="w-full bg-transparent border border-blue-600 text-white py-3 rounded-md hover:bg-blue-700 hover:bg-opacity-20 transition-colors flex items-center justify-center font-medium mt-2"
      >
        Sign Up
      </Link>
    </form>
  );
};

export default LoginForm;