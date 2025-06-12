# backend/text_enhancement.py
import google.generativeai as genai
import os
from typing import Dict, Any, Optional
import re

def initialize_gemini():
    """Initialize Gemini API with environment variable"""
    api_key = os.getenv('GEMINI_API_KEY')
    if not api_key:
        print("WARNING: GEMINI_API_KEY not found in environment variables")
        return False
    
    try:
        genai.configure(api_key=api_key)
        print("✅ Gemini API initialized successfully")
        return True
    except Exception as e:
        print(f"❌ Failed to initialize Gemini API: {e}")
        return False

def create_enhancement_prompt(text: str, options: Dict[str, Any]) -> str:
    """Create a structured prompt for Gemini based on user options"""
    prompt = f"""You are a professional Hebrew text processing assistant. Process the following Hebrew text in a SEQUENTIAL PIPELINE where each step builds on the previous step's output.

ORIGINAL TEXT:
\"\"\"{text}\"\"\"

PROCESSING PIPELINE (apply in this exact order):
"""

    step_number = 1
    current_text_ref = "original text"

    # Step 1: Spelling correction (if enabled)
    if options.get('enableSpellingCorrection'):
        prompt += f"""
STEP {step_number}: SPELLING CORRECTION
- Fix Hebrew spelling errors in the {current_text_ref} ONLY if there are actual mistakes
- Do NOT mark correctly spelled words as corrections
- Only correct obvious misspellings, OCR errors, or grammatical mistakes
"""
        if options.get('trackChanges'):
            prompt += "- Mark real corrections as [CORRECTED: old→new]\n"
        
        current_text_ref = "spell-corrected text"
        step_number += 1

    # Step 2: Text restructuring (if enabled)
    if options.get('enableStructuring'):
        prompt += f"""
STEP {step_number}: TEXT RESTRUCTURING
- Improve structure and formatting of the {current_text_ref} ONLY if needed
- Add paragraph breaks, improve flow, fix punctuation
- Do NOT mark restructuring if no actual changes were made
"""
        if options.get('trackChanges'):
            prompt += "- Mark real changes as [RESTRUCTURED]\n"
        
        current_text_ref = "restructured text"
        step_number += 1

    # Step 3: Summarization (if enabled)
    if options.get('enableSummarization'):
        summary_length = options.get('summaryLength', 20)
        prompt += f"""
STEP {step_number}: SUMMARIZATION
- Create a {summary_length}% summary of the {current_text_ref}
- Maintain key information and main points in Hebrew
"""
        current_text_ref = "summarized text"
        step_number += 1

    # Step 4: Translation (if enabled)
    if options.get('enableTranslation'):
        translation_style = options.get('translationStyle', 'natural')
        prompt += f"""
STEP {step_number}: TRANSLATION
- Translate the {current_text_ref} to English using {translation_style} style
"""
        if translation_style == 'literal':
            prompt += "- Provide word-for-word translation\n"
        elif translation_style == 'natural':
            prompt += "- Create fluent, readable English\n"
        elif translation_style == 'formal':
            prompt += "- Use formal, academic language\n"
        
        step_number += 1

    # Add output format instructions
    prompt += f"""

OUTPUT FORMAT - Show the result after each processing step:

ORIGINAL TEXT:
{text}
"""

    if options.get('enableSpellingCorrection'):
        prompt += """
AFTER SPELLING CORRECTION:
[Hebrew text after spell checking]
"""

    if options.get('enableStructuring'):
        prompt += """
AFTER RESTRUCTURING:
[Hebrew text after structure improvements]
"""

    if options.get('enableSummarization'):
        prompt += """
AFTER SUMMARIZATION:
[Hebrew summary of the processed text]
"""

    if options.get('enableTranslation'):
        prompt += """
FINAL ENGLISH TRANSLATION:
[English translation of the final processed text]
"""

    prompt += """
Do not provide explanations or commentary. Show only the results after each processing step."""

    return prompt

def enhance_text_with_gemini(text: str, options: Dict[str, Any]) -> Optional[str]:
    """
    Process text through Gemini API with specified enhancement options
    
    Args:
        text: The Hebrew text to enhance
        options: Dictionary containing enhancement settings
        
    Returns:
        Enhanced text response from Gemini or None if failed
    """
    try:
        # Create the model
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Generate the prompt
        prompt = create_enhancement_prompt(text, options)
        
        print(f"🚀 Sending text to Gemini API...")
        print(f"📝 Text length: {len(text)} characters")
        print(f"⚙️ Options: {options}")
        
        # Generate content
        response = model.generate_content(prompt)
        
        if response.text:
            print(f"✅ Received response from Gemini API")
            return response.text
        else:
            print(f"❌ Empty response from Gemini API")
            return None
            
    except Exception as e:
        print(f"❌ Error calling Gemini API: {e}")
        return None

def parse_gemini_response(response: str) -> Dict[str, str]:
    """
    Parse Gemini response into structured sections
    
    Args:
        response: Raw response from Gemini
        
    Returns:
        Dictionary with parsed sections
    """
    sections = {
        'original': '',
        'afterSpelling': '',
        'afterRestructuring': '',
        'afterSummarization': '',
        'finalTranslation': '',
        'fullResponse': response
    }
    
    # Extract original text
    original_match = re.search(r'ORIGINAL TEXT:\s*(.*?)(?=\n\nAFTER|$)', response, re.DOTALL | re.IGNORECASE)
    if original_match:
        sections['original'] = original_match.group(1).strip()
    
    # Extract after spelling correction
    spelling_match = re.search(r'AFTER SPELLING CORRECTION:\s*(.*?)(?=\n\nAFTER|$)', response, re.DOTALL | re.IGNORECASE)
    if spelling_match:
        sections['afterSpelling'] = spelling_match.group(1).strip()
    
    # Extract after restructuring
    restructuring_match = re.search(r'AFTER RESTRUCTURING:\s*(.*?)(?=\n\nAFTER|$)', response, re.DOTALL | re.IGNORECASE)
    if restructuring_match:
        sections['afterRestructuring'] = restructuring_match.group(1).strip()
    
    # Extract after summarization
    summarization_match = re.search(r'AFTER SUMMARIZATION:\s*(.*?)(?=\n\nFINAL|$)', response, re.DOTALL | re.IGNORECASE)
    if summarization_match:
        sections['afterSummarization'] = summarization_match.group(1).strip()
    
    # Extract final translation
    translation_match = re.search(r'FINAL ENGLISH TRANSLATION:\s*(.*?)(?=\n\n|$)', response, re.DOTALL | re.IGNORECASE)
    if translation_match:
        sections['finalTranslation'] = translation_match.group(1).strip()
    
    return sections