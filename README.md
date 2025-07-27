# Project Timeline

| Weeks | Dates | Main Goals | Tasks | Deliverables | Meeting |
|-------|-------|------------|-------|-------------|---------|
| 1 | Apr 10-17 | Research, Setup & Approach Finalization | • Investigate trOCR setup<br>• Explore RCNN roboflow setup<br>• Compare results<br>• Select best approach<br>• Implement full pipeline | • Research findings<br>• Working model prototype<br>• Pipeline architecture | Apr 10 |
| 2 | Apr 18-24 | Initial Implementation | • Refine selected approach<br>• Refine website pages<br>• Start writing Introduction (2.1, 2.2) | • Improved model<br>• Website Fix<br>• Introduction draft | Apr 24 |
| 3,4 | Apr 25-May 8 | Core Implementation & Documentation | • Write System Overview (3.1)<br>• Architecture documentation (3.2)<br>• Complete Use Case (3.3) & Activity Diagrams (3.4)<br>• Continue model tuning | • System documentation<br>• Complete diagrams<br>• Enhanced model | May 8 |
| 5,6 | May 9-22 | End-to-End Beta & Documentation | • Integrate website with model<br>• End-to-end testing<br>• Document Tools and Technologies<br>• Write Development Process section | • Working beta version<br>• Tools section<br>• Development process | May 22 |
| 7,8 | May 23-Jun 5 | Testing, Evaluation & Guides | • System testing<br>• Document challenges and solutions<br>• Complete user guide<br>• Create maintenance guide<br>• Write Results and Evaluation | • Test results<br>• User & maintenance guides<br>• Results section | Jun 5 |
| 9 | Jun 6-12 | Finalization | • Write Conclusions section<br>• Final editing and proofreading<br>• Prepare presentation/poster<br>• Create demo video | • Complete project book<br>• Final system<br>• Poster/presentation<br>• Demo video | Jun 12 |

# לוז פרויקט

| שבועות | תאריכים | מטרות עיקריות | משימות | תוצרים | פגישה |
|--------|----------|----------------|--------|---------|--------|
| 1 | 10-17 אפריל | מחקר, התקנה וגיבוש גישה | • בדיקת מערכת trOCR<br>• חקירת RCNN roboflow<br>• השוואת תוצאות<br>• בחירת הגישה המיטבית<br>• יישום צנרת מלאה | • מסמך ממצאי מחקר<br>• אב-טיפוס עובד<br>• תרשים ארכיטקטורה | 10 אפריל |
| 2 | 18-24 אפריל | יישום ראשוני | • שיפור הגישה הנבחרת<br>• שינוי האתר לפי המודל החדש<br>• התחלת כתיבת ההקדמה | • שיפור המודל<br>• אתר עדכני<br>• טיוטת הקדמה | 24 אפריל |
| 3,4 | 25 אפריל-8 מאי | יישום ליבה ותיעוד | • כתיבת סקירת מערכת<br>• תיעוד ארכיטקטורה<br>• השלמת דיאגרמות שימוש ופעילות<br>• המשך כיוון המודל | • תיעוד מערכת<br>• דיאגרמות מלאות<br>• מודל משופר | 8 מאי |
| 5,6 | 9-22 מאי | גרסת בטא ותיעוד | • אינטגרציה של האתר והמודל<br>• בדיקות מקצה לקצה<br>• תיעוד כלים וטכנולוגיות<br>• כתיבת תהליך הפיתוח | • גרסת בטא עובדת<br>• תיעוד כלים<br>• תיאור תהליך פיתוח | 22 מאי |
| 7,8 | 23 מאי-5 יוני | בדיקות, הערכה ומדריכים | • בדיקות מערכת<br>• תיעוד אתגרים ופתרונות<br>• השלמת מדריך למשתמש<br>• יצירת מדריך תחזוקה<br>• כתיבת תוצאות והערכה | • תוצאות בדיקות<br>• מדריכי משתמש ותחזוקה<br>• פרק תוצאות | 5 יוני |
| 9 | 6-12 יוני | סיום | • כתיבת מסקנות<br>• עריכה סופית והגהה<br>• הכנת מצגת/פוסטר<br>• יצירת סרטון הדגמה | • ספר פרויקט מלא<br>• מערכת סופית<br>• פוסטר/מצגת<br>• סרטון הדגמה | 12 יוני |
showcase and quick explenation of the site https://youtu.be/HmeZhrD8rA4?feature=shared
9. Maintenance Guide -DIGIKTAV
9.1 Hardware and Software Requirements
To run Digi-Ktav locally or on a server, the following software components are recommended:
●	OS: Linux (Ubuntu 20.04+) or Windows 10+
●	Python 3.10+
●	Node.js (for frontend development) 
●	Git
●	Modern web browser (Chrome, Firefox, Edge)
9.2 Installation Instructions
1.	Clone the repo:
git clone https://github.com/LiadTssf/FinalProject-hebrew-handwriting-recognition.git
cd FinalProject-hebrew-handwriting-recognition
2.	Backend setup:
pip install -r backend/requirements.txt
3.	Frontend setup:
cd src
npm install
4.	Start backend server:
cd ..
uvicorn backend.main:app --reload
5.	Start frontend:
cd src
npm run dev
9.3 How to Extend or Modify the System
Add a New OCR Model:
●	Place model files inside the backend/ directory. For example: backend/my_new_model/ with model weights, config.
●	Update model path in backend/ocr_pipeline.py: 
o	VIT_MODEL_PATH = "./my_new_model"
●	Adjust preprocessing in load_models() to match the model’s expected input size and normalization.
●	Rebuild and redeploy if you use Docker or Google Cloud (see 9.5).
To improve segmentation:
●	Edit segmentation logic in ocr_pipeline.py, particularly the segment_image_to_lines() and segment_line_to_items() functions.
●	Tune parameters like spacing thresholds or character merge rules.
●	Optional: Replace the projection/contour-based method with a learned model like CRAFT, MMOCR, or PaddleOCR. 
To expand the Gemini post-processing logic:
●	Modify the prompt in text_enhancement.py or ocr_pipeline.py under the function correct_text_gemini().
●	Add an API route in main.py
●	Create prompt logic per feature in text_enhancement.py
To personalize handwriting styles:
●	Add a calibration flow in the frontend UI.
●	Store user-specific samples and fine-tune models via a training service.
To support additional formats (e.g., DOCX, TIFF):
●	Update the upload handler and file-type parsing logic in both the frontend and backend.
9.4 Rebuild and Redeploy Guide (Docker & Google Cloud)
A. Rebuild & Run Locally with Docker
Step 1: Build the Docker image
Open terminal in the backend/ folder and run: 
	docker build -t digiktav-local .
Step 2: Run the container 
	docker run -p 8000:8000 -e GEMINI_API_KEY="your_api_key" digiktav-local
B. Deploy to Google Cloud Run
Step 1: Submit build to Artifact Registry
Run this from the root project folder:
	gcloud builds submit --tag me-west1-docker.pkg.dev/digi-ktav-ocr-project/digiktav-repo/digiktav-backend:latest .




Step 2: Deploy to Cloud Run:
gcloud run deploy digiktav-backend-service `  
--image me-west1-docker.pkg.dev/digi-ktav-ocr-project/digiktav-repo/digiktav-backend:latest `
  --platform managed `
  --region me-west1 `
  --allow-unauthenticated `
  --port 8000 `
  --cpu 1 `
  --memory 2Gi `
  --min-instances 0 `
  --set-env-vars GEMINI_API_KEY="your_api_key" `
  --timeout=900	

When Should I Rebuild & Redeploy?
After changing:
•	ocr_pipeline.py
•	text_enhancement.py
•	main.py
•	Model files
•	requirements.txt
•	Dockerfile

9.5 Package and Architecture Overview
Backend Packages:
●	uvicorn, fastapi - API server
●	torch, transformers, Pillow - Model loading and inference
●	opencv-python - Image preprocessing
●	google-generativeai- Post-processing with Gemini API
Frontend Packages:
●	react, tailwindcss- UI rendering and styling
●	axios- Client-server communication
High-Level Structure:
FinalProject-hebrew-handwriting-recognition/         // Main project folder
├── backend/                                         // Backend logic and OCR pipeline
│   ├── main.py                                      // FastAPI entry point
│   ├── ocr_pipeline.py                              // Segmentation and recognition logic
│   ├── text_enhancement.py                          // Gemini post-processing logic
│   ├── requirements.txt                             // Backend dependencies
│   └── vit-hebrew-final/                            // Pretrained ViT model weights

├── src/                                             // Frontend - React app
│   ├── components/                                  // Reusable UI components
│   ├── pages/                                       // Main UI pages
│   ├── services/                                    // API utilities
│   │   ├── enhancementService.js                    // Sends enhancement requests to backend
│   │   └── firebaseService.js                       // Manages document saving and Firebase auth
│   └── main.jsx                                     // Entry point for the React app

├── public/                                          // Static frontend assets
├── index.html                                       // HTML template for the React app
├── vite.config.js                                   // Frontend build configuration
├── package.json                                     // Frontend dependencies and scripts
└── README.md                                        // Project instructions and documentation




























<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# FinalProject-hebrew-handwriting-recognition
The focus is on achieving precise recognition through contextual understanding, enabling seamless digitization and editing of Hebrew documents.
>>>>>>> 328ec67017b9c95a228b7305935bf2cfed5a0f2c
