import React from 'react';

const RadioOption = ({ id, label, description, checked, onChange }) => {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={id}
          name="processing-option"
          type="radio"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium text-gray-900">
          {label}
        </label>
        {description && (
          <p className="text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
};

export default RadioOption;