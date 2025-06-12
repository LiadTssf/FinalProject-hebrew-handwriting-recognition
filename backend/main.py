# backend/main.py - DEBUG VERSION
from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, Optional
import uvicorn
import traceback
import os
import base64
from PIL import Image
import io

# Import your processing pipeline function from ocr_pipeline.py
try:
    from ocr_pipeline import process_image_pipeline, load_models
    print("✅ OCR pipeline imported successfully")
except ImportError as e:
    print(f"❌ FATAL ERROR: Could not import from ocr_pipeline.py: {e}")
    print("Ensure ocr_pipeline.py exists and all its dependencies are met.")
    import sys
    sys.exit(1)

# Import text enhancement functions with DETAILED error handling
text_enhancement_available = False
text_enhancement_error = "Not attempted"
try:
    print("🔍 Attempting to import google.generativeai...")
    import google.generativeai as genai
    print("✅ google.generativeai imported successfully")
    
    print("🔍 Attempting to import text_enhancement module...")
    from text_enhancement import initialize_gemini, enhance_text_with_gemini, parse_gemini_response
    text_enhancement_available = True
    text_enhancement_error = "Success"
    print("✅ Text enhancement module imported successfully")
except ImportError as e:
    text_enhancement_error = f"ImportError: {str(e)}"
    print(f"❌ ImportError importing text_enhancement: {e}")
    print("Full traceback:")
    traceback.print_exc()
    text_enhancement_available = False
except Exception as e:
    text_enhancement_error = f"Exception: {str(e)}"
    print(f"❌ Exception importing text_enhancement: {e}")
    print("Full traceback:")
    traceback.print_exc()
    text_enhancement_available = False

app = FastAPI(title="Digi-Ktav OCR & Enhancement API", version="1.0.0")

# --- CORS Configuration ---
origins = [
    "http://localhost:5173",    # Your local React dev server (Vite)
    "http://localhost:3000",    # Another common local React dev server port
    "https://digi-ktav-git-main-liadtssfs-projects.vercel.app",  # Your Vercel frontend URL
    "https://*.vercel.app",     # Allow all Vercel preview deployments
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models for Request/Response ---
class TextEnhancementRequest(BaseModel):
    text: str
    options: Dict[str, Any]

class TextEnhancementResponse(BaseModel):
    success: bool
    enhanced_text: Optional[str] = None
    parsed_result: Optional[Dict[str, str]] = None
    error: Optional[str] = None

class ImageCompressionRequest(BaseModel):
    image_data: str  # base64 encoded image
    max_size_kb: int = 800
    max_dimension: int = 1200

class ImageCompressionResponse(BaseModel):
    success: bool
    compressed_image: Optional[str] = None
    original_size_kb: Optional[float] = None
    compressed_size_kb: Optional[float] = None
    error: Optional[str] = None

# --- Load models on startup ---
@app.on_event("startup")
async def startup_event():
    print("🚀 FastAPI server starting up...")
    
    # Initialize OCR models
    if not load_models():
        print("⚠️ CRITICAL WARNING: OCR model initialization failed during startup!")
    else:
        print("✅ OCR model initialization complete")
    
    # Initialize Gemini for text enhancement
    if text_enhancement_available:
        try:
            if not initialize_gemini():
                print("⚠️ WARNING: Gemini initialization failed. Text enhancement will not work.")
            else:
                print("✅ Gemini API initialized for text enhancement")
        except Exception as e:
            print(f"❌ Exception during Gemini initialization: {e}")
    else:
        print(f"⚠️ Text enhancement module not available. Error: {text_enhancement_error}")

# --- Helper Functions ---
def compress_image_data(image_data: str, max_size_kb: int = 800, max_dimension: int = 1200) -> tuple:
    """
    Compress base64 image data to fit size constraints
    
    Returns:
        (success: bool, compressed_data: str, original_size_kb: float, compressed_size_kb: float, error: str)
    """
    try:
        # Decode base64
        if image_data.startswith('data:image'):
            # Remove data URL prefix
            image_data = image_data.split(',')[1]
        
        image_bytes = base64.b64decode(image_data)
        original_size_kb = len(image_bytes) / 1024
        
        # Open image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Calculate new dimensions
        width, height = image.size
        if width > height:
            if width > max_dimension:
                height = int((height * max_dimension) / width)
                width = max_dimension
        else:
            if height > max_dimension:
                width = int((width * max_dimension) / height)
                height = max_dimension
        
        # Resize image
        if (width, height) != image.size:
            image = image.resize((width, height), Image.Resampling.LANCZOS)
        
        # Convert to RGB if necessary
        if image.mode in ('RGBA', 'P'):
            image = image.convert('RGB')
        
        # Compress with different quality levels
        for quality in range(80, 10, -10):
            output = io.BytesIO()
            image.save(output, format='JPEG', quality=quality, optimize=True)
            compressed_bytes = output.getvalue()
            compressed_size_kb = len(compressed_bytes) / 1024
            
            if compressed_size_kb <= max_size_kb:
                compressed_data = base64.b64encode(compressed_bytes).decode('utf-8')
                return True, f"data:image/jpeg;base64,{compressed_data}", original_size_kb, compressed_size_kb, None
        
        # If still too large, return the most compressed version
        output = io.BytesIO()
        image.save(output, format='JPEG', quality=10, optimize=True)
        compressed_bytes = output.getvalue()
        compressed_size_kb = len(compressed_bytes) / 1024
        compressed_data = base64.b64encode(compressed_bytes).decode('utf-8')
        
        return True, f"data:image/jpeg;base64,{compressed_data}", original_size_kb, compressed_size_kb, None
        
    except Exception as e:
        return False, None, 0, 0, str(e)

# --- API Endpoints ---

@app.get("/")
async def root():
    return {
        "message": "Digi-Ktav OCR & Enhancement API is running",
        "text_enhancement_available": text_enhancement_available,
        "text_enhancement_error": text_enhancement_error,
        "gemini_api_key_configured": bool(os.getenv('GEMINI_API_KEY')),
        "endpoints": {
            "ocr": "/process-image/ (POST)",
            "text_enhancement": "/enhance-text/ (POST)",
            "image_compression": "/compress-image/ (POST)",
            "health": "/health/ (GET)",
            "debug": "/debug/ (GET)"
        }
    }

@app.get("/debug/")
async def debug_info():
    """Debug endpoint to check what's going wrong"""
    debug_info = {
        "text_enhancement_available": text_enhancement_available,
        "text_enhancement_error": text_enhancement_error,
        "gemini_api_key_set": bool(os.getenv('GEMINI_API_KEY')),
        "environment_variables": {
            key: "***SET***" if key in os.environ else "NOT_SET"
            for key in ['GEMINI_API_KEY', 'GOOGLE_APPLICATION_CREDENTIALS', 'PORT']
        },
        "python_version": os.sys.version,
        "installed_packages": {}
    }
    
    # Try to get package versions
    try:
        import google.generativeai
        debug_info["installed_packages"]["google-generativeai"] = "INSTALLED"
    except ImportError:
        debug_info["installed_packages"]["google-generativeai"] = "NOT_INSTALLED"
    
    try:
        import fastapi
        debug_info["installed_packages"]["fastapi"] = fastapi.__version__
    except:
        debug_info["installed_packages"]["fastapi"] = "UNKNOWN"
    
    return debug_info

@app.get("/health/")
async def health_check():
    return {
        "status": "healthy",
        "ocr_available": True,
        "text_enhancement_available": text_enhancement_available,
        "text_enhancement_error": text_enhancement_error,
        "gemini_available": text_enhancement_available and os.getenv('GEMINI_API_KEY') is not None
    }

@app.post("/process-image/")
async def ocr_image_endpoint(file: UploadFile = File(...)):
    """
    Receives an image, processes it through the OCR pipeline,
    and returns the recognized text.
    """
    allowed_mime_types = ["image/jpeg", "image/png", "image/bmp", "image/webp"]
    if file.content_type not in allowed_mime_types:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid file type. Allowed: {', '.join(allowed_mime_types)}"
        )

    try:
        image_bytes = await file.read()
        print(f"📤 Received image: {file.filename}, size: {len(image_bytes)} bytes, type: {file.content_type}")
        
        # Call your main OCR processing function
        recognized_text = process_image_pipeline(image_bytes, original_filename=file.filename)

        if recognized_text is None:
            print(f"❌ OCR processing returned None for {file.filename}")
            raise HTTPException(status_code=500, detail="OCR processing failed and returned no result.")
        elif isinstance(recognized_text, str) and recognized_text.startswith("Error:"):
            print(f"❌ OCR processing error for {file.filename}: {recognized_text}")
            raise HTTPException(status_code=500, detail=recognized_text)

        print(f"✅ OCR processing completed for {file.filename}")
        return {"filename": file.filename, "recognized_text": recognized_text}

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print(f"❌ Unhandled error processing file {file.filename}: {e}")
        traceback.print_exc()
        error_detail = f"An unexpected error occurred on the server: {str(e)}"
        raise HTTPException(status_code=500, detail=error_detail)

@app.post("/enhance-text/", response_model=TextEnhancementResponse)
async def enhance_text_endpoint(request: TextEnhancementRequest):
    """
    Enhance Hebrew text using Gemini API with specified options.
    This replaces client-side Gemini API calls for security.
    """
    if not text_enhancement_available:
        raise HTTPException(
            status_code=503, 
            detail=f"Text enhancement service not available. Error: {text_enhancement_error}"
        )
    
    if not os.getenv('GEMINI_API_KEY'):
        raise HTTPException(
            status_code=503,
            detail="Text enhancement service not available. Gemini API key not configured."
        )

    try:
        print(f"🔤 Text enhancement request - text length: {len(request.text)} chars")
        print(f"⚙️ Options: {request.options}")
        
        # Call Gemini API
        enhanced_text = enhance_text_with_gemini(request.text, request.options)
        
        if enhanced_text is None:
            return TextEnhancementResponse(
                success=False,
                error="Failed to enhance text with Gemini API"
            )
        
        # Parse the response
        parsed_result = parse_gemini_response(enhanced_text)
        
        print(f"✅ Text enhancement completed successfully")
        return TextEnhancementResponse(
            success=True,
            enhanced_text=enhanced_text,
            parsed_result=parsed_result
        )

    except Exception as e:
        print(f"❌ Error in text enhancement: {e}")
        traceback.print_exc()
        return TextEnhancementResponse(
            success=False,
            error=f"Text enhancement failed: {str(e)}"
        )

@app.post("/compress-image/", response_model=ImageCompressionResponse)
async def compress_image_endpoint(request: ImageCompressionRequest):
    """
    Compress base64 image data to fit size constraints.
    This replaces client-side image compression.
    """
    try:
        print(f"🖼️ Image compression request - max size: {request.max_size_kb}KB")
        
        success, compressed_data, original_size, compressed_size, error = compress_image_data(
            request.image_data, 
            request.max_size_kb, 
            request.max_dimension
        )
        
        if not success:
            return ImageCompressionResponse(
                success=False,
                error=f"Image compression failed: {error}"
            )
        
        print(f"✅ Image compressed from {original_size:.1f}KB to {compressed_size:.1f}KB")
        return ImageCompressionResponse(
            success=True,
            compressed_image=compressed_data,
            original_size_kb=original_size,
            compressed_size_kb=compressed_size
        )

    except Exception as e:
        print(f"❌ Error in image compression: {e}")
        traceback.print_exc()
        return ImageCompressionResponse(
            success=False,
            error=f"Image compression failed: {str(e)}"
        )

if __name__ == "__main__":
    # For local development
    uvicorn.run(app, host="0.0.0.0", port=8000)