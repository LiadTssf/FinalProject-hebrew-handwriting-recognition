// src/services/enhancementService.js

// Use your backend URL - update this based on your deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Call server-side text enhancement instead of client-side Gemini API
 * @param {string} text - The user's corrected text
 * @param {object} options - Selected enhancement options
 * @returns {Promise<string>} - Enhanced text from server
 */
export const callServerForEnhancements = async (text, options) => {
  try {
    console.log("🔄 Calling server for text enhancement...");
    console.log("📝 Text to enhance:", text.substring(0, 100) + "...");
    console.log("⚙️ With options:", options);

    const response = await fetch(`${API_BASE_URL}/enhance-text/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        options: options
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Server error: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Enhancement failed on server');
    }

    console.log("✅ Received enhanced text from server");
    return result.enhanced_text;

  } catch (error) {
    console.error("❌ Error calling server for enhancement:", error);
    
    // Provide a fallback response that shows what would have been processed
    let fallbackResponse = `--- SERVER ENHANCEMENT FAILED (${error.message}) ---\n\n`;
    
    fallbackResponse += `ORIGINAL TEXT:\n${text}\n\n`;
    
    let currentText = text;
    
    if (options.enableSpellingCorrection) {
      // Apply some basic "corrections" for demo
      currentText = currentText.replace(/וואלה/g, 'ואללה'); // Example correction
      fallbackResponse += `AFTER SPELLING CORRECTION:\n${currentText}\n[DEMO: Corrected "וואלה" to "ואללה"]\n\n`;
    }
    
    if (options.enableStructuring) {
      // Add some structure improvements for demo
      currentText = currentText.replace(/\. /g, '.\n'); // Add line breaks
      fallbackResponse += `AFTER RESTRUCTURING:\n${currentText}\n[DEMO: Improved paragraph structure]\n\n`;
    }
    
    if (options.enableSummarization) {
      // Create a shorter version for demo
      const words = currentText.split(' ');
      const summaryLength = Math.max(1, Math.floor(words.length * options.summaryLength / 100));
      currentText = words.slice(0, summaryLength).join(' ') + '...';
      fallbackResponse += `AFTER SUMMARIZATION:\n${currentText}\n[DEMO: ${options.summaryLength}% summary]\n\n`;
    }
    
    if (options.enableTranslation) {
      let englishText;
      if (options.translationStyle === 'literal') {
        englishText = "I write text beautiful. [DEMO: Literal word-for-word translation]";
      } else if (options.translationStyle === 'natural') {
        englishText = "I'm writing beautiful text. [DEMO: Natural fluent translation]";
      } else {
        englishText = "This document demonstrates Hebrew text composition. [DEMO: Formal translation]";
      }
      fallbackResponse += `FINAL ENGLISH TRANSLATION:\n${englishText}\n`;
    }
    
    if (!options.enableSummarization && !options.enableTranslation && 
        !options.enableSpellingCorrection && !options.enableStructuring) {
      fallbackResponse += `No enhancements selected - original text returned.`;
    }
    
    fallbackResponse += `\n--- END FALLBACK RESPONSE ---`;
    
    return fallbackResponse;
  }
};

/**
 * Compress image on server side instead of client side
 * @param {string} imageData - Base64 image data
 * @param {number} maxSizeKB - Maximum size in KB (default 800)
 * @param {number} maxDimension - Maximum width/height (default 1200)
 * @returns {Promise<string>} - Compressed base64 image data
 */
export const compressImageOnServer = async (imageData, maxSizeKB = 800, maxDimension = 1200) => {
  try {
    console.log("🗜️ Compressing image on server...");
    
    const response = await fetch(`${API_BASE_URL}/compress-image/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_data: imageData,
        max_size_kb: maxSizeKB,
        max_dimension: maxDimension
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Server error: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Image compression failed on server');
    }

    console.log(`✅ Image compressed on server: ${result.original_size_kb?.toFixed(1)}KB → ${result.compressed_size_kb?.toFixed(1)}KB`);
    return result.compressed_image;

  } catch (error) {
    console.error("❌ Error compressing image on server:", error);
    // Return original image data as fallback
    return imageData;
  }
};

/**
 * Parse Gemini response into structured pipeline steps
 * @param {string} response - Raw response from server
 * @returns {object} - Parsed pipeline steps
 */
export const parseServerResponse = (response) => {
  const sections = {
    original: '',
    afterSpelling: '',
    afterRestructuring: '',
    afterSummarization: '',
    finalTranslation: '',
    fullResponse: response
  };
  
  // Extract original text
  const originalMatch = response.match(/ORIGINAL TEXT:\s*([\s\S]*?)(?=\n\nAFTER|$)/i);
  if (originalMatch) {
    sections.original = originalMatch[1].trim();
  }
  
  // Extract after spelling correction
  const spellingMatch = response.match(/AFTER SPELLING CORRECTION:\s*([\s\S]*?)(?=\n\nAFTER|$)/i);
  if (spellingMatch) {
    sections.afterSpelling = spellingMatch[1].trim();
  }
  
  // Extract after restructuring
  const restructuringMatch = response.match(/AFTER RESTRUCTURING:\s*([\s\S]*?)(?=\n\nAFTER|$)/i);
  if (restructuringMatch) {
    sections.afterRestructuring = restructuringMatch[1].trim();
  }
  
  // Extract after summarization
  const summarizationMatch = response.match(/AFTER SUMMARIZATION:\s*([\s\S]*?)(?=\n\nFINAL|$)/i);
  if (summarizationMatch) {
    sections.afterSummarization = summarizationMatch[1].trim();
  }
  
  // Extract final translation
  const translationMatch = response.match(/FINAL ENGLISH TRANSLATION:\s*([\s\S]*?)(?=\n\n|$)/i);
  if (translationMatch) {
    sections.finalTranslation = translationMatch[1].trim();
  }
  
  return sections;
};