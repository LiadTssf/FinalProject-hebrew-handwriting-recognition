//SignUpForm
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';
import LoginForm from '../auth/LoginForm';
import GuestButton from '../auth/GuestButton';
import ParticlesBackground from '../common/ParticlesBackground';

import { auth } from '../../lib/firebase/firebaseinit'; // Adjust path
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpForm = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const navigate = useNavigate();

  // 1) Update handleSubmit to actually sign up
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // 2) Call Firebase to create user:
      await createUserWithEmailAndPassword(auth, email, password);
      
      // If you want to store 'username' in user’s profile or Firestore, do that here
      // e.g., updateProfile(auth.currentUser, { displayName: username })

      // 3) navigate on success:
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label htmlFor="username" className="block text-white text-sm font-medium mb-2">
          Username
        </label>
        <input 
          type="text" 
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
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
        <label htmlFor="password" className="block text-white text-sm font-medium mb-2">
          Password
        </label>
        <input 
          type="password" 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••••"
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-white text-sm font-medium mb-2">
          Confirm Password
        </label>
        <input 
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••••••••"
          className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
      >
        Sign Up
      </button>
      
      <div className="text-center text-sm text-gray-400 mt-6">
        <p>Already have an account?</p>
        <Link to="/auth" className="text-blue-500 hover:text-blue-400">
          Log In
        </Link>
      </div>
    </form>
  );
};

const AuthPage = () => {
  const location = useLocation();
  const isSignUp = location.pathname === '/signup';
  
  return (
    <div className="relative min-h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <ParticlesBackground />
      
      <div className="relative z-10 w-full max-w-md px-8 py-10 mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <Logo />
            
            {isSignUp ? (
              <SignUpForm />
            ) : (
              <>
                <LoginForm />
                <GuestButton />
              </>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-0 right-0 z-10 w-48 h-48">
          <img 
            src="/illustration.svg" 
            alt="Person with document" 
            className="w-full h-full"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
