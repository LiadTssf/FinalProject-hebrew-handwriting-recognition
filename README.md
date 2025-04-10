# Project Timeline: Hebrew Handwriting Recognition (8 Weeks - Object Detection Approach)

| Week | Main Focus                      | Key Tasks & Goals                                                                                                                                                                                                                                                                   | Deliverables/Milestones                                       | Notes                                                                                                   |
| :--- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------ |
| **1** | **Finalize Approach & Setup**   | - **Confirm:** Decide definitively on Object Detection (`YOLO`) approach. <br> - **Setup:** `Colab` environment ready, annotation tool chosen & working (`LabelImg`/`Roboflow` export), `classes.txt` finalized.<br> - **Pilot Annotation:** Fully annotate 5-10 diverse images (`Bounding Box` + `Label`).<br> - **Pipeline Test:** Run the test training script (`Test Training`) successfully to ensure code runs end-to-end (ignore accuracy).<br> - **Meet Supervisor:** Discuss chosen approach and initial plan. | Working basic code pipeline (`Data Load` -> `Train` -> `Save`). <br> First small annotated dataset.          | High priority: Get the code skeleton running. Resolve any setup issues immediately.                       |
| **2** | **Dataset Build & Basic Model** | - **Intensive Annotation:** Annotate a significant batch (aim for 50-100+ total images). Ensure quality and consistency.<br> - **Train/Val Split:** Create proper train/validation sets.<br> - **Initial Meaningful Training:** Train `YOLO` (e.g., `yolov8n/s`) on this initial dataset for more `Epochs` (50-100). Aim for *some* basic detection capability.<br> - **Basic Sorting/Output Code:** Implement Python code to load the trained model, run `Inference`, sort detections (`Y` then `X`, `RTL`), and output a raw text string. | Trained `.pt` model v0.1. <br> Basic Python script for `Inference` & sorting. <br> ~100 annotated images. | **Goal: Have a *basic* end-to-end system working**, even with low accuracy. Prove the concept (`Proof of Concept`).          |
| **3** | **Website Integration & Refine** | - **Core Website:** Ensure basic website structure (upload, display area) is functional.<br> - **Backend Integration:** Connect the Python `Inference`/sorting script (from Week 2) to the website backend (e.g., using `Flask`/`Django`). Upload image -> run model -> display sorted text.<br> - **Evaluate Model v0.1:** Analyze where the model fails. Identify common errors.<br> - **Continue Annotation:** Add more images focusing on types where the model struggled. | Basic functional website prototype. <br> Model integrated into `Backend`. <br> More annotated images.       | Focus on making the pieces connect. Don't worry excessively about perfect accuracy *yet*.                   |
| **4** | **Model Improvement & Features** | - **Expand Dataset:** Continue annotation (aim for 150-200+ images if possible).<br> - **Retrain Model v0.2:** Train with the larger dataset, possibly experiment with slightly larger `YOLO` model (e.g., `yolov8m`) or more `Epochs`.<br> - **Improve Sorting/Spacing:** Refine the `Post-processing` logic to better handle line breaks and word spacing.<br> - **User Adaptation Concept:** *Plan* how user adaptation/`Fine-tuning` will work technically (API for upload, triggering fine-tuning script). *Start coding* the basic structure if time allows. | Improved model v0.2 (`.pt`). <br> Better sorting/spacing logic. <br> Design for `User Adaptation` finalized. | Accuracy should be noticeably better now. Adaptation might just be a plan/basic code structure at this stage. |
| **5** | **Documentation - Part 1**      | - **Start Project Book:** Write initial drafts for General Description, Solution Description (Architecture, `YOLO` choice rationale, Sorting logic), Development Process, Tools Used.<br> - **Start User Guide:** Draft basic instructions for using the website (upload, view results).<br> - **Testing:** Perform basic functional testing of the website and model. Fix obvious bugs. | Draft sections of `Project Book` & `User Guide`. <br> Basic test report/bug list.                      | Shift focus slightly towards documentation while model training might run in background/overnight.        |
| **6** | **Documentation - Part 2 & Video**| - **Refine Project Book:** Detail Challenges & Solutions, Results & Conclusions, Lessons Learned, Project Metrics.<br> - **Complete User Guide:** Add screenshots, cover main usage scenarios.<br> - **Start Maintenance Guide:** Document setup, dependencies, how to run/retrain the model.<br> - **Create Video Script & Storyboard:** Plan the 2-minute video demonstrating the software. | Near-final drafts of documentation. <br> Video `Storyboard`/script.                                    | Documentation takes time – allocate significant effort this week.                                          |
| **7** | **Presentation/Poster & Polish** | - **Create Poster/Presentation:** Design based on requirements (English, key sections). Focus on clarity and visuals.<br> - **Record & Edit Video:** Film screen recordings, add voiceover/text, edit to under 2 minutes.<br> - **Final Model Training (Optional):** One last training run if significant data was added or major improvements identified.<br> - **Final Testing & Bug Fixes:** Thoroughly test the entire system. Fix remaining critical bugs.<br> - **Prepare Demo:** Ensure a smooth live demo/video playback for presentation. | Final Poster/Presentation slides. <br> Final Video file (`.mp4`). <br> Final Model v1.0 (`.pt`).                | Practice the presentation/demo. Ensure all components (code, docs, visuals) are cohesive.                 |
| **8** | **Final Submission Prep**       | - **Finalize Documentation:** Proofread all documents (`Project Book`, `User Guide`, `Maintenance Guide`). Ensure formatting is correct.<br> - **Code Cleanup & Readme:** Add comments to code, ensure `requirements.txt` is accurate, write clear `README.md` with setup/run instructions for the `Git` repo.<br> - **Package Submission:** Organize all files (Code, `.pt` weights, Documentation `PDF`s, Poster/`PPT`, Video `MP4`) into the required `GIT` structure.<br> - **Submit!** | Final, polished documentation. <br> Clean code repository. <br> Complete submission package.            | Double-check all submission requirements. Backup everything. Relax (a little)!                         |




## לו"ז מקוצר (עברית)

*   **שבוע 1:** סגירת גישה (`YOLO`), התקנות, אנוטציית פיילוט (5-10 תמונות), הרצת אימון-בדיקה ראשונית.
*   **שבוע 2:** אנוטציה מוגברת (50-100+), אימון מודל בסיסי (`v0.1`), קוד מיון ראשוני. -> **פרוטוטייפ עובד ראשוני**.
*   **שבוע 3:** אינטגרציה בסיסית לאתר, המשך אנוטציה, ניתוח תוצאות ראשוני.
*   **שבוע 4:** הרחבת דאטהסט (150-200+), אימון מודל משופר (`v0.2`), שיפור לוגיקת מיון/ריווח, תכנון `User Adaptation`.
*   **שבוע 5:** התחלת תיעוד עיקרי (`Project Book`, `User Guide`), בדיקות פונקציונליות.
*   **שבוע 6:** השלמת טיוטות תיעוד, התחלת `Maintenance Guide`, תכנון/תסריט לווידאו.
*   **שבוע 7:** יצירת פוסטר/מצגת, הקלטה ועריכת וידאו, אימון סופי (אופציונלי), בדיקות אחרונות.
*   **שבוע 8:** סיום וליטוש תיעוד, ניקוי קוד ו-`README`, אריזת הגשה סופית ב-`GIT`.




























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
