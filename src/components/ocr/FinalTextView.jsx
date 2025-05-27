// src/components/info/FinalTextView.jsx
import React from 'react';
// You'll need libraries for DOCX and TXT download if you implement them
// For DOCX: import { Packer } from 'docx'; import { saveAs } from 'file-saver';
// For TXT: Just a simple anchor tag trick

const FinalTextView = ({ originalImageSrc, enhancedText, filename, onBackToUpload }) => {

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([enhancedText], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `${filename}_enhanced.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  // DOCX download is more complex and requires a library like 'docx'
  const handleDownloadDocx = () => {
    alert("DOCX download functionality to be implemented using a library like 'docx'.");
    // Example using 'docx' (requires installation and more setup):
    // const doc = new Document({
    //   sections: [{
    //     properties: {},
    //     children: [new Paragraph({ children: [new TextRun(enhancedText)] })],
    //   }],
    // });
    // Packer.toBlob(doc).then(blob => {
    //   saveAs(blob, `${filename}_enhanced.docx`);
    // });
  };


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Enhanced Document: {filename}</h2>
        {onBackToUpload && (
          <button 
            onClick={onBackToUpload}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Process Another
          </button>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow bg-white dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Original Document</h3>
          <div className="overflow-auto" style={{ maxHeight: '75vh' }}>
            <img 
              src={originalImageSrc} 
              alt={filename || "Original Document"} 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="md:w-1/2 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow bg-white dark:bg-gray-800">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">Final Enhanced Text</h3>
          <div 
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 overflow-y-auto"
            style={{ 
              height: 'calc(75vh - 50px)', 
              minHeight: '300px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '16px',
              whiteSpace: 'pre-wrap',
              direction: 'rtl',
              textAlign: 'right'
            }}
          >
            {enhancedText}
          </div>
          <div className="mt-4 flex gap-2">
            <button 
                onClick={handleDownloadTxt}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Download as .txt
            </button>
            <button 
                onClick={handleDownloadDocx}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Download as .docx (WIP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalTextView;