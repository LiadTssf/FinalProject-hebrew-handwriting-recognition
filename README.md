# Project Timeline (8 Weeks)

This timeline outlines the planned phases for developing the Hebrew Handwriting Recognition system, incorporating parallel exploration of recognition models in the initial weeks.

| Week  | Main Focus                                      | Key Tasks & Goals                                                                                                                                                                                                                                                                                                 | Documentation Focus (Project Book Sections unless noted)                                     | Milestones / Goals                                                                                                                                     |
| :---- | :---------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Parallel Setup & Exploration**                | - Setup environments for `TrOCR` & `YOLO` (`RCNN`-based Object Detection).<br>- Prepare minimal datasets for both (line+text for TrOCR, char boxes for YOLO on 1-5 images).<br>- Run basic "does it train?" tests for both pipelines.<br>- Define clear evaluation criteria for comparison.<br>- Meet supervisor.                               | 1. Abstract (Draft), 2. Introduction (Draft), 2.1 Project Background and Goals (Start)          | Basic code runnable for both approaches. Initial small datasets prepared. Decision criteria defined.                                              |
| **2** | **Evaluation, Decision & Basic End-to-End**     | - Evaluate results/complexity of `TrOCR` vs `YOLO` from Week 1.<br>- **DECIDE** on the primary approach.<br>- **IF NEEDED (Fallback):** Quickly implement classical Segmentation + `CNN` pipeline.<br>- Implement the chosen/fallback pipeline fully (basic inference + sorting/assembly).<br>- Basic integration into the website (upload -> process -> display raw text). | 2.1 Project Background and Goals (Finalize), 2.2 Target Users                                | **Decision Made.** One working end-to-end pipeline (chosen or fallback) integrated with basic website functionality. Low accuracy is acceptable here. |
| **3** | **Refine Chosen Path & Core System Docs**       | - Add more data (annotate/transcribe) for the chosen path.<br>- Retrain model for initial accuracy improvement.<br>- Debug/improve website integration & basic text output formatting (sorting/spacing/line breaks).<br>- Start documenting the *actual implemented* solution.                                            | 3.1 System Overview, 3.2 System Architecture (High-level), 3.3 Use Case Diagram              | Improved prototype v0.1. Core system documentation started reflecting the chosen path. More data prepared.                                        |
| **4** | **Achieve Beta & Complete Initial Docs**        | - Significant dataset expansion & model retraining. Aim for best possible accuracy within this phase.<br>- Stabilize the end-to-end website workflow.<br>- Implement core website features (beyond basic display).<br>- Finalize drafts of the initial Project Book sections.                                                 | 3.4 Activity Diagram, 4. Tools and Technologies Used, 5. Development Process (Start Overview) | **Working Beta Version v0.9.** Completed first major block of Project Book (Sections 1, 2.1, 2.2, 3.1-3.4, 4).                               |
| **5** | **Enhancement & User/Maintenance Guide Start**  | - Polish website UI/UX.<br>- Address bugs found in Beta.<br>- Further model tuning/data addition if needed.<br>- *Plan/Basic Code* for User Adaptation feature (if applicable to chosen model).<br>- Draft core User Guide sections.                                                                                        | 5.1 Implementation Details (Add specifics), 5.2 Testing (Plan/Start), **User Guide** (Start) | Polished Beta. User Guide drafted. Maintenance Guide started. User adaptation plan/structure in place.                                          |
| **6** | **Testing, Refinement & Doc Review**            | - Conduct more systematic testing.<br>- Fix identified bugs.<br>- Incorporate supervisor feedback on documentation/system.<br>- Refine all existing documentation sections.<br>- Draft sections on challenges & results.                                                                                                | 6. Challenges and Solutions, 7. Results and Evaluation, **Maintenance Guide** (Add detail)   | Stable, tested Beta v1.0. Near-final documentation drafts ready for review.                                                                        |
| **7** | **Presentation Materials & Final Polish**       | - Create Poster/Presentation slides (English).<br>- Script, record, and edit 2-minute demo video.<br>- Final code cleanup, commenting, `README.md` finalization.<br>- Final proofread of documentation.<br>- Prepare for live demo.                                                                                         | 8. Summary and Conclusions, 9. References. Final review of all docs.                         | Final presentation materials (Poster/PPT, Video). Clean, documented code repository. Final model weights.                                        |
| **8** | **Final Submission Assembly & Prep**            | - Final proofread and formatting check on all documents.<br>- Organize all deliverables (Code, Weights, Docs, Poster/PPT, Video) in `GIT` structure.<br>- Ensure compliance with all submission requirements.<br>- Submit project.<br>- Prepare for final defense/presentation Q&A.                                          | Final check of all documents.                                                                | Complete, organized submission package in `GIT`. Ready for presentation.                                                                         |

# Project Timeline

| Week | Dates | Main Goals | Tasks | Deliverables |
|------|-------|------------|-------|-------------|
| 1 | TBD | Research & Setup | • Investigate trOCR setup<br>• Explore RCNN roboflow setup<br>• Compare initial results | • Research findings document<br>• Initial setups tested |
| 2 | TBD | Approach Finalization | • Select best performing approach<br>• Implement full pipeline<br>• Fall back to regular segmentation if needed | • Working model prototype<br>• Pipeline architecture diagram |
| 3 | TBD | Book Writing & System Enhancement | • Write Introduction (2.1, 2.2)<br>• Document System Overview (3.1)<br>• Begin Architecture documentation (3.2)<br>• Refine model and code | • Introduction chapters draft<br>• System overview draft<br>• Initial diagrams |
| 4 | TBD | End-to-End Beta & Documentation | • Complete Use Case Diagram (3.3)<br>• Complete Activity Diagram (3.4)<br>• Integrate website with model<br>• End-to-end testing | • Working beta version<br>• Complete Project Description section<br>• Architecture diagrams |
| 5 | TBD | System Refinement & Documentation | • Document Tools and Technologies<br>• Write Development Process section<br>• Enhance UI/UX<br>• Performance optimization | • Tools section draft<br>• Development process draft |
| 6 | TBD | Testing & Challenges Documentation | • System testing<br>• Document challenges and solutions<br>• Begin user guide<br>• Fix identified issues | • Challenges section draft<br>• Test results<br>• User guide outline |
| 7 | TBD | Evaluation & Maintenance Guide | • Write Results and Evaluation section<br>• Create maintenance guide<br>• Final system improvements | • Results section draft<br>• Maintenance guide draft |
| 8 | TBD | Finalization | • Write Conclusions section<br>• Final editing and proofreading<br>• Prepare presentation/poster<br>• Create demo video | • Complete project book<br>• Final system version<br>• Poster/presentation<br>• Demo video |
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
