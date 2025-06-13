// src/utils/geminiIntegration.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API - You'll need to add VITE_GEMINI_API_KEY to your .env file
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Creates a detailed prompt based on user's selected enhancement options
 * @param {string} text - The user's corrected text
 * @param {object} options - Selected enhancement options
 * @returns {string} - Engineered prompt for Gemini
 */
export const createEnhancementPrompt = (text, options) => {
  let prompt = `You are a professional Hebrew text processing assistant. Process the following Hebrew text in a SEQUENTIAL PIPELINE where each step builds on the previous step's output.

ORIGINAL TEXT:
"""
${text}
"""

PROCESSING PIPELINE (apply in this exact order):
`;

  let stepNumber = 1;
  let currentTextRef = "original text";

  // Step 1: Spelling correction (if enabled)
  if (options.enableSpellingCorrection) {
    prompt += `
STEP ${stepNumber}: SPELLING CORRECTION
- Fix Hebrew spelling errors in the ${currentTextRef} ONLY if there are actual mistakes
- Do NOT mark correctly spelled words as corrections
- Only correct obvious misspellings, OCR errors, or grammatical mistakes
${options.trackChanges ? '- Mark real corrections as [CORRECTED: old→new]' : ''}
`;
    currentTextRef = "spell-corrected text";
    stepNumber++;
  }

  // Step 2: Text restructuring (if enabled)
  if (options.enableStructuring) {
    prompt += `
STEP ${stepNumber}: TEXT RESTRUCTURING
- Improve structure and formatting of the ${currentTextRef} ONLY if needed
- Add paragraph breaks, improve flow, fix punctuation
- Do NOT mark restructuring if no actual changes were made
${options.trackChanges ? '- Mark real changes as [RESTRUCTURED]' : ''}
`;
    currentTextRef = "restructured text";
    stepNumber++;
  }

  // Step 3: Summarization (if enabled)
  if (options.enableSummarization) {
    prompt += `
STEP ${stepNumber}: SUMMARIZATION
- Create a ${options.summaryLength}% summary of the ${currentTextRef}
- Maintain key information and main points in Hebrew
`;
    currentTextRef = "summarized text";
    stepNumber++;
  }

  // Step 4: Translation (if enabled)
  if (options.enableTranslation) {
    prompt += `
STEP ${stepNumber}: TRANSLATION
- Translate the ${currentTextRef} to English using ${options.translationStyle} style
${options.translationStyle === 'literal' ? '- Provide word-for-word translation' : ''}
${options.translationStyle === 'natural' ? '- Create fluent, readable English' : ''}
${options.translationStyle === 'formal' ? '- Use formal, academic language' : ''}
`;
    stepNumber++;
  }

  // Add output format instructions
  prompt += `

OUTPUT FORMAT - Show the result after each processing step:

ORIGINAL TEXT:
${text}
`;

  if (options.enableSpellingCorrection) {
    prompt += `
AFTER SPELLING CORRECTION:
[Hebrew text after spell checking]
`;
  }

  if (options.enableStructuring) {
    prompt += `
AFTER RESTRUCTURING:
[Hebrew text after structure improvements]
`;
  }

  if (options.enableSummarization) {
    prompt += `
AFTER SUMMARIZATION:
[Hebrew summary of the processed text]
`;
  }

  if (options.enableTranslation) {
    prompt += `
FINAL ENGLISH TRANSLATION:
[English translation of the final processed text]
`;
  }

  prompt += `
Do not provide explanations or commentary. Show only the results after each processing step.`;

  return prompt;
};

/**
 * Calls Gemini API with the enhanced prompt
 * @param {string} text - The user's corrected text
 * @param {object} options - Selected enhancement options
 * @returns {Promise<string>} - Enhanced text from Gemini
 */
export const callGeminiForEnhancements = async (text, options) => {
  try {
    // Check if API key is available
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      console.warn("VITE_GEMINI_API_KEY not found in environment variables. Using demo mode.");
      throw new Error('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
    }

    console.log("✅ Gemini API key found, calling actual API...");
    console.log("📝 Text to enhance:", text);
    console.log("⚙️ Selected options:", options);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = createEnhancementPrompt(text, options);
    
    console.log("🚀 Sending prompt to Gemini API...");
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const enhancedText = response.text();
    
    console.log("✅ Received response from Gemini API:", enhancedText);
    
    return enhancedText;
    
  } catch (error) {
    console.error("❌ Error calling Gemini API:", error);
    console.log("🔄 Using demo mode instead...");
    
    // Provide a realistic demo response in pipeline format
    let fallbackResponse = `--- DEMO MODE RESPONSE (Set VITE_GEMINI_API_KEY for real AI) ---\n\n`;
    
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
    
    if (!options.enableSummarization && !options.enableTranslation && !options.enableSpellingCorrection && !options.enableStructuring) {
      fallbackResponse += `No enhancements selected - original text returned.`;
    }
    
    fallbackResponse += `\n--- END DEMO RESPONSE ---`;
    
    return fallbackResponse;
  }
};

/**
 * Parse Gemini response into structured pipeline steps
 * @param {string} response - Raw response from Gemini
 * @returns {object} - Parsed pipeline steps
 */
export const parseGeminiResponse = (response) => {
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