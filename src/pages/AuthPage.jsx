// AuthPage.jsx  maybe no longer needed
import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../components/common/Logo';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm'; // import from the new file
import GuestButton from '../components/auth/GuestButton';
import ParticlesBackground from '../components/common/ParticlesBackground';

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
      </div>
    </div>
  );
};

export default AuthPage;