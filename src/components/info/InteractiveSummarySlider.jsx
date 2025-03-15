import React, { useState } from 'react';

const InteractiveSummarySlider = () => {
  const [summaryLength, setSummaryLength] = useState(20);
  
  // Original text sample
  const originalText = "The history of writing traces the development of expressing language by systems of markings and how these markings became standardized across regions. In the history of how writing systems have evolved, there have been two main approaches to how symbols are used. The symbols may represent whole words or phrases directly (ideographic or logographic systems) like in Chinese or ancient Egyptian hieroglyphs. Alternatively, the symbols may represent sounds that form parts of words and sentences (phonetic systems) like our modern alphabets. The earliest writing systems evolved from economic necessity to record transactions, but eventually expanded for creative and educational purposes. Today, writing serves innumerable functions in society, from practical mundane tasks to creative expressions across all human activities.";
  
  // Multiple summary versions at different lengths
  const summaries = {
    5: "Writing systems evolved as either ideographic (symbols for whole words) or phonetic (symbols for sounds), expanding from practical to creative uses.",
    20: "Writing systems developed with two approaches: ideographic symbols representing whole words (like Chinese or Egyptian hieroglyphs) or phonetic symbols representing sounds (like modern alphabets). Originally created for economic record-keeping, writing later expanded to serve many societal functions.",
    35: "The history of writing follows the development of standardized marking systems across regions. Writing systems evolved with two main approaches: ideographic/logographic systems where symbols represent whole words (like Chinese or Egyptian hieroglyphs), or phonetic systems where symbols represent sounds (like modern alphabets). Initially driven by economic necessity for recording transactions, writing expanded to serve creative and educational purposes and now functions across all human activities.",
    50: "The history of writing traces how language expression through markings became standardized across regions. Writing systems evolved with two distinct approaches to symbols: representing whole words or phrases directly (ideographic/logographic systems) as in Chinese or ancient Egyptian hieroglyphs, or representing sounds that form parts of words (phonetic systems) like our modern alphabets. Initially, writing systems developed from economic necessity to record transactions, but they gradually expanded to serve creative and educational purposes. In contemporary society, writing serves countless functions, from everyday practical tasks to diverse creative expressions across human activities."
  };
  
  // Find the closest summary percentage based on slider value
  const getClosestSummaryPercentage = (value) => {
    const percentages = Object.keys(summaries).map(Number);
    return percentages.reduce((prev, curr) => 
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };
  
  // Handle slider change
  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setSummaryLength(value);
  };
  
  // Get the appropriate summary based on slider value
  const displayPercentage = getClosestSummaryPercentage(summaryLength);
  const currentSummary = summaries[displayPercentage];
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Adjustable Summary Length</h3>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Summary Length</span>
            <span className="text-sm font-medium text-purple-700">{displayPercentage}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={summaryLength}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #9333ea ${summaryLength}%, #e5e7eb ${summaryLength*2}%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Very Concise (5%)</span>
            <span>Detailed (50%)</span>
          </div>
          
          {/* Slider markers for specific percentages */}
          <div className="relative h-4 mt-1">
            {[5, 20, 35, 50].map(percent => (
              <div 
                key={percent} 
                className={`absolute transform -translate-x-1/2 cursor-pointer ${percent === displayPercentage ? 'text-purple-600 font-medium' : 'text-gray-400'}`}
                style={{ left: `${(percent - 5) / 45 * 100}%` }}
                onClick={() => setSummaryLength(percent)}
              >
                <div className={`h-2 w-1 mx-auto mb-1 ${percent === displayPercentage ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
                <span className="text-xs">{percent}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Original Text</h4>
            <p className="text-xs text-gray-600">
              {originalText}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded border border-purple-100">
            <h4 className="text-sm font-medium text-purple-700 mb-2">{displayPercentage}% Summary</h4>
            <p className="text-xs text-gray-600">
              {currentSummary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveSummarySlider;