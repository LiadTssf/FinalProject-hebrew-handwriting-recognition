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
    prompt = f"""You are a professional Hebrew text processing assistant. You will process the following Hebrew text through a SEQUENTIAL PIPELINE where each step builds on the previous step's output.

CRITICAL FORMATTING RULES:
- NEVER use markdown formatting like ** or __ or any bold/italic markers
- NEVER use semicolons (;) in Hebrew text - use only commas (,) or periods (.)
- Write in natural, flowing Hebrew
- Preserve the original writing style and tone
- Do not add explanations or commentary
- Output clean, plain text only

SOURCE TEXT:
\"\"\"{text}\"\"\"

PROCESSING PIPELINE (apply in this exact sequential order):
"""

    step_number = 1
    current_text_ref = "the original text"

    # Step 1: Spelling correction (if enabled)
    if options.get('enableSpellingCorrection'):
        prompt += f"""
STEP {step_number}: SPELLING CORRECTION
- Fix ONLY actual spelling mistakes in {current_text_ref}
- Do NOT mark correctly spelled words as corrections
- Correct only obvious misspellings, OCR errors, or grammatical mistakes
- Maintain the exact same meaning and content
- Write in standard, natural Hebrew without any formatting markers
- Use commas and periods only, never semicolons
"""
        
        current_text_ref = "the spell-corrected text"
        step_number += 1

    # Step 2: Text restructuring (if enabled)
    if options.get('enableStructuring'):
        prompt += f"""
STEP {step_number}: TEXT RESTRUCTURING
You are an academic writing expert. Your goal is to help restructure the text as if it were a well-organized university paper. Clarify the logic, connect ideas clearly, and ensure every paragraph expresses one coherent idea. Never change or drop information — only restructure and rephrase slightly where necessary.

RESTRUCTURING GOALS:
- Make {current_text_ref} SUPER understandable and SUPER well-structured
- Improve paragraph breaks, sentence flow, and logical organization
- Enhance readability and clarity like a master teacher would
- You may slightly modify word choices ONLY if absolutely necessary for clarity
- PRESERVE every single idea and piece of information - lose nothing
- Do not add new information or remove any concepts
- Maintain the author's voice and intended meaning
- Create smooth transitions between ideas
- Organize thoughts in the most logical sequence
- Write in flowing, natural Hebrew without any formatting markers
"""
        
        current_text_ref = "the restructured text"
        step_number += 1

    # Step 3: Summarization (if enabled)
    if options.get('enableSummarization'):
        summary_length = options.get('summaryLength', 20)
        prompt += f"""
STEP {step_number}: SUMMARIZATION
- Create a {summary_length}% summary of {current_text_ref}
- Target length: approximately {summary_length}% of the original text length
- Preserve the most important information and key points in Hebrew
- Maintain the essential meaning and main ideas
- Write a flowing, readable summary in standard Hebrew
- No formatting markers, no semicolons - only natural Hebrew text
- Keep the original tone and style
"""
        current_text_ref = "the summary"
        step_number += 1

    # Step 4: Translation (if enabled)
    if options.get('enableTranslation'):
        translation_style = options.get('translationStyle', 'natural')
        prompt += f"""
STEP {step_number}: HEBREW TO ENGLISH TRANSLATION
- Translate {current_text_ref} to English using {translation_style} style
"""
        if translation_style == 'literal':
            prompt += "- Provide word-for-word accurate translation\n- Stay as close to Hebrew structure as possible\n"
        elif translation_style == 'natural':
            prompt += "- Create fluent, readable English that sounds natural to English speakers\n- Adapt cultural references and expressions\n"
        elif translation_style == 'formal':
            prompt += "- Use formal, academic language\n- Employ sophisticated vocabulary and sentence structures\n"
        
        prompt += "- No formatting markers in English either\n- Write in natural, flowing English\n"
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
REMEMBER: Output only clean, plain text results after each processing step. No explanations, no commentary, no formatting markers whatsoever."""

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
        # Create the model with better parameters
        model = genai.GenerativeModel(
            'gemini-1.5-flash',
            generation_config=genai.types.GenerationConfig(
                temperature=0.3,  # Lower temperature for more consistent output
                top_p=0.8,       # Reduce randomness
                top_k=20,        # Limit token choices
                max_output_tokens=2048,
            )
        )
        
        # Generate the prompt
        prompt = create_enhancement_prompt(text, options)
        
        print(f"🚀 Sending text to Gemini API...")
        print(f"📝 Text length: {len(text)} characters")
        print(f"⚙️ Options: {options}")
        
        # Generate content
        response = model.generate_content(prompt)
        
        if response.text:
            print(f"✅ Received response from Gemini API")
            # Clean up the response to remove any unwanted formatting
            cleaned_response = clean_gemini_output(response.text)
            return cleaned_response
        else:
            print(f"❌ Empty response from Gemini API")
            return None
            
    except Exception as e:
        print(f"❌ Error calling Gemini API: {e}")
        return None

def clean_gemini_output(text: str) -> str:
    """
    Clean Gemini output to remove unwanted formatting
    
    Args:
        text: Raw text from Gemini
        
    Returns:
        Cleaned text without markdown formatting
    """
    # Remove markdown bold formatting
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    text = re.sub(r'__(.*?)__', r'\1', text)
    
    # Remove markdown italic formatting
    text = re.sub(r'\*(.*?)\*', r'\1', text)
    text = re.sub(r'_(.*?)_', r'\1', text)
    
    # Replace semicolons with commas in Hebrew text (but preserve in English)
    # This is a simple approach - you might want to make it more sophisticated
    lines = text.split('\n')
    cleaned_lines = []
    
    for line in lines:
        # If line contains Hebrew characters, replace semicolons
        if re.search(r'[\u0590-\u05FF]', line):
            line = line.replace(';', ',')
        cleaned_lines.append(line)
    
    text = '\n'.join(cleaned_lines)
    
    # Remove excessive whitespace
    text = re.sub(r'\n\s*\n\s*\n', '\n\n', text)
    
    return text.strip()

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
    
    # Hebrew section patterns
    patterns = {
        'original': r'הטקסט המקורי:\s*(.*?)(?=\n\nאחרי|$)',
        'afterSpelling': r'אחרי תיקון כתיב:\s*(.*?)(?=\n\nאחרי|$)',
        'afterRestructuring': r'אחרי שיפור מבנה:\s*(.*?)(?=\n\nאחרי|$)',
        'afterSummarization': r'אחרי תקציר:\s*(.*?)(?=\n\nהתרגום|$)',
        'finalTranslation': r'התרגום הסופי לאנגלית:\s*(.*?)(?=\n\n|$)'
    }
    
    # Fallback to English patterns if Hebrew patterns don't match
    english_patterns = {
        'original': r'ORIGINAL TEXT:\s*(.*?)(?=\n\nAFTER|$)',
        'afterSpelling': r'AFTER SPELLING CORRECTION:\s*(.*?)(?=\n\nAFTER|$)',
        'afterRestructuring': r'AFTER RESTRUCTURING:\s*(.*?)(?=\n\nAFTER|$)',
        'afterSummarization': r'AFTER SUMMARIZATION:\s*(.*?)(?=\n\nFINAL|$)',
        'finalTranslation': r'FINAL ENGLISH TRANSLATION:\s*(.*?)(?=\n\n|$)'
    }
    
    # Try Hebrew patterns first, then English
    for key, pattern in patterns.items():
        match = re.search(pattern, response, re.DOTALL | re.IGNORECASE)
        if match:
            sections[key] = match.group(1).strip()
        else:
            # Try English pattern as fallback
            english_match = re.search(english_patterns[key], response, re.DOTALL | re.IGNORECASE)
            if english_match:
                sections[key] = english_match.group(1).strip()
    
    return sections