from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import traceback
import os # For environment variables if needed by ocr_pipeline indirectly

# Import your processing pipeline function from ocr_pipeline.py
# Ensure ocr_pipeline.py is in the same directory or Python path
try:
    from ocr_pipeline import process_image_pipeline, load_models # Changed from load_all_models if you renamed it
except ImportError as e:
    print(f"FATAL ERROR: Could not import from ocr_pipeline.py: {e}")
    print("Ensure ocr_pipeline.py exists and all its dependencies are met.")
    sys.exit(1)


app = FastAPI()

# --- CORS Configuration ---
# Adjust origins to match your React development server and production frontend URL
origins = [
    "http://localhost:5173",  # Default Vite dev server port
    "http://localhost:3000",  # Common React dev server port
    # "https://your-deployed-frontend.com", # Example for production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load models on startup (Gemini, Roboflow client setup via ocr_pipeline) ---
@app.on_event("startup")
async def startup_event():
    print("FastAPI server starting up...")
    # The load_models function in ocr_pipeline should handle
    # initializing Gemini and any Roboflow client setup if needed globally.
    # If Roboflow client is created per request in recognize_text_roboflow, this might only do Gemini.
    if not load_models(): # Ensure this function exists and is named correctly in ocr_pipeline.py
        print("CRITICAL WARNING: Model initialization (e.g., Gemini) failed during startup! API might not function correctly.")
    else:
        print("Model initialization attempt complete during startup (Gemini, etc.).")


# --- API Endpoint for OCR ---
@app.post("/process-image/")
async def ocr_image_endpoint(file: UploadFile = File(...)):
    """
    Receives an image, processes it through the OCR pipeline
    (which now uses Roboflow for char reco and Gemini for correction),
    and returns the final text.
    """
    allowed_mime_types = ["image/jpeg", "image/png", "image/bmp", "image/webp"]
    if file.content_type not in allowed_mime_types:
        raise HTTPException(status_code=400, detail=f"Invalid file type. Allowed: {', '.join(allowed_mime_types)}")

    try:
        image_bytes = await file.read()
        print(f"Received image: {file.filename}, size: {len(image_bytes)} bytes, type: {file.content_type}")
        
        # Call your main OCR processing function from ocr_pipeline.py
        # This function should handle everything from resize to Gemini correction
        recognized_text = process_image_pipeline(image_bytes, original_filename=file.filename)

        if recognized_text is None:
             print(f"OCR processing returned None for {file.filename}")
             raise HTTPException(status_code=500, detail="OCR processing failed and returned no result.")
        # Check for your custom error string prefix
        elif isinstance(recognized_text, str) and recognized_text.startswith("Error:"):
            print(f"OCR processing error for {file.filename}: {recognized_text}")
            raise HTTPException(status_code=500, detail=recognized_text)

        return {"filename": file.filename, "recognized_text": recognized_text}

    except HTTPException as http_exc:
        raise http_exc # Re-raise already formed HTTPExceptions
    except Exception as e:
        print(f"Unhandled error processing file {file.filename}: {e}")
        traceback.print_exc()
        error_detail = f"An unexpected error occurred on the server: {str(e)}"
        raise HTTPException(status_code=500, detail=error_detail)

# --- Root endpoint for testing ---
@app.get("/")
async def root():
    return {"message": "OCR Backend with Roboflow & Gemini is running. Use /process-image/ endpoint."}

# --- To run the server (from the 'backend' directory where this main.py is): ---
# Ensure your venv is activated: .\venv\Scripts\activate
# Then run: uvicorn main:app --reload
# It will usually run on http://127.0.0.1:8000