import React from 'react';

const CalibrationStep = ({ title, description, children }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
};

export default CalibrationStep;