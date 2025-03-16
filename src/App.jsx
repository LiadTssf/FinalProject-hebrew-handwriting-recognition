import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/theme.css';
import { ThemeProvider } from './contexts/ThemeContext';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CalibrationPage from './pages/CalibrationPage';
import CalibrationProcessPage from './pages/CalibrationProcessPage';
import MyDocumentsPage from './pages/MyDocumentsPage';
import ProcessingOptionsPage from './pages/ProcessingOptionsPage';
import ModelsDescriptionPage from './pages/info/ModelsDescriptionPage';
import BasicScanningPage from './pages/info/BasicScanningPage';
import ExtraFeaturesPage from './pages/info/ExtraFeaturesPage';
import AdvancedScanningPage from './pages/info/AdvancedScanningPage';
import GeminiApiPage from './pages/info/GeminiApiPage';

function App() {
  return (
    <ThemeProvider>
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
          <Route path="/info/extra-features" element={<ExtraFeaturesPage />} />
          <Route path="/info/advanced-scanning" element={<AdvancedScanningPage />} />
          <Route path="/info/gemini-api" element={<GeminiApiPage />} />
          
          <Route path="*" element={<Navigate replace to="/auth" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;