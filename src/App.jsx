import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CalibrationPage from './pages/CalibrationPage';
import CalibrationProcessPage from './pages/CalibrationProcessPage';
import MyDocumentsPage from './pages/MyDocumentsPage';
import ProcessingOptionsPage from './pages/ProcessingOptionsPage';
import ModelsDescriptionPage from './pages/info/ModelsDescriptionPage';
import BasicScanningPage from './pages/info/BasicScanningPage';
import LogicalCorrectionsPage from './pages/info/LogicalCorrectionsPage';
import GeminiApiPage from './pages/info/GeminiApiPage';
import PersonalCalibrationPage from './pages/info/PersonalCalibrationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/auth" />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/documents" element={<MyDocumentsPage />} />
        <Route path="/calibration" element={<CalibrationPage />} />
        <Route path="/calibration/process" element={<CalibrationProcessPage />} />
        <Route path="/processing-options" element={<ProcessingOptionsPage />} />
        
        {/* Info pages */}
        <Route path="/info/models-description" element={<ModelsDescriptionPage />} />
        <Route path="/info/basic-scanning" element={<BasicScanningPage />} />
        <Route path="/info/logical-corrections" element={<LogicalCorrectionsPage />} />
        <Route path="/info/gemini-api" element={<GeminiApiPage />} />
        <Route path="/info/personal-calibration" element={<PersonalCalibrationPage />} />
        
        <Route path="*" element={<Navigate replace to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;