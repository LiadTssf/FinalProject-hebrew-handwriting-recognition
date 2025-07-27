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

Maintenance Guide – Digi-Ktav
9.1 Hardware and Software Requirements
To run Digi-Ktav locally or on a server, the following are recommended:

✅ Operating System
Linux (Ubuntu 20.04+) or Windows 10+

✅ Software Dependencies
Python 3.10+

Node.js (for frontend)

Git

Modern Web Browser (e.g., Chrome, Firefox, Edge)

9.2 Installation Instructions
Clone the Repository

git clone https://github.com/LiadTssf/FinalProject-hebrew-handwriting-recognition.git
cd FinalProject-hebrew-handwriting-recognition
Backend Setup

pip install -r backend/requirements.txt
Frontend Setup

cd src
npm install
Start the Servers
Backend (FastAPI):


cd ..
uvicorn backend.main:app --reload
Frontend (React):


cd src
npm run dev
9.3 How to Extend or Modify the System
Add a New OCR Model
Place model files inside backend/, e.g.:


backend/my_new_model/
Update the model path in ocr_pipeline.py:


VIT_MODEL_PATH = "./my_new_model"
Adjust preprocessing in load_models() to fit your model’s input shape and normalization.

Improve Segmentation
Modify the functions:

segment_image_to_lines()

segment_line_to_items()

Adjust parameters: spacing thresholds, character merge rules.

Optional: Integrate learned models like CRAFT, MMOCR, or PaddleOCR.

Expand Gemini Post-Processing
Update correct_text_gemini() in text_enhancement.py or ocr_pipeline.py.

Add a new API route in main.py.

Implement new prompt logic in text_enhancement.py.

Personalize Handwriting Styles
Add a calibration UI flow.

Save user-specific samples.

Fine-tune models using a training service.

Support Additional Formats (e.g., DOCX, TIFF)
Update file upload handling and type parsing in:

Frontend

Backend

9.4 Rebuild and Redeploy Guide
A.  Rebuild & Run Locally (Docker)
Build Docker Image (from backend/):


docker build -t digiktav-local .
Run Container:


docker run -p 8000:8000 -e GEMINI_API_KEY="your_api_key" digiktav-local
B.  Deploy to Google Cloud Run
Submit Build to Artifact Registry (from root):


gcloud builds submit --tag me-west1-docker.pkg.dev/digi-ktav-ocr-project/digiktav-repo/digiktav-backend:latest .
Deploy to Cloud Run:


gcloud run deploy digiktav-backend-service \
  --image me-west1-docker.pkg.dev/digi-ktav-ocr-project/digiktav-repo/digiktav-backend:latest \
  --platform managed \
  --region me-west1 \
  --allow-unauthenticated \
  --port 8000 \
  --cpu 1 \
  --memory 2Gi \
  --min-instances 0 \
  --set-env-vars GEMINI_API_KEY="your_api_key" \
  --timeout=900
 When to Rebuild & Redeploy?
After changing any of the following:

ocr_pipeline.py

text_enhancement.py

main.py

Model files

requirements.txt

Dockerfile

9.5 Package and Architecture Overview
 Backend
Package	Purpose
uvicorn, fastapi	API Server
torch, transformers, Pillow	Model Inference
opencv-python	Image Preprocessing
google-generativeai	Gemini Text Enhancement

Frontend
Package	Purpose
react, tailwindcss	UI and Styling
axios	API Communication

Project Structure

FinalProject-hebrew-handwriting-recognition/
├── backend/
│   ├── main.py               # FastAPI entry
│   ├── ocr_pipeline.py       # Segmentation + OCR logic
│   ├── text_enhancement.py   # Gemini integration
│   ├── requirements.txt      # Backend dependencies
│   └── vit-hebrew-final/     # Pretrained ViT model
│
├── src/                      # Frontend (React)
│   ├── components/           # UI Components
│   ├── pages/                # Main Pages
│   ├── services/
│   │   ├── enhancementService.js  # Gemini API calls
│   │   └── firebaseService.js     # Firebase auth/save
│   └── main.jsx              # Frontend entry point
│
├── public/                   # Static assets
├── index.html                # HTML shell
├── vite.config.js            # Frontend config
├── package.json              # Frontend dependencies
└── README.md                 # Project docs






















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
