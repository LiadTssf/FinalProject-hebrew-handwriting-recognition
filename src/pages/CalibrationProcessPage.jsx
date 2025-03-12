import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CalibrationProcessPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Simulate calibration process
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isComplete ? 'Calibration Complete!' : 'Calibrating Model...'}
        </h1>
        
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-right mt-1 text-sm text-gray-600">{progress}%</p>
        </div>
        
        {isComplete ? (
          <div>
            <p className="text-center text-green-600 mb-6">
              Your model has been successfully personalized and is now ready to use.
            </p>
            <button
              onClick={() => navigate('/home')}
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Return to Home
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-600">
            Please wait while we train the model with your handwriting samples. 
            This may take a few minutes.
          </p>
        )}
      </div>
    </div>
  );
};

export default CalibrationProcessPage;