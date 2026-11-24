import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import HomeDashboard from './pages/HomeDashboard';
import LiveMonitoring from './pages/LiveMonitoring';
import ControlPanel from './pages/ControlPanel';
import WorkingPrinciple from './pages/WorkingPrinciple';
import Components from './pages/Components';
import Assembly from './pages/Assembly';
import PerformanceTesting from './pages/PerformanceTesting';
import AdvantagesLimitations from './pages/AdvantagesLimitations';
import FutureImprovements from './pages/FutureImprovements';
import TeamInfo from './pages/TeamInfo';
import PresentationMode from './pages/PresentationMode';
import { SimulationProvider } from './context/SimulationContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && presentationMode) {
        setPresentationMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode]);

  if (presentationMode) {
    return (
      <SimulationProvider>
        <PresentationMode onExit={() => setPresentationMode(false)} />
      </SimulationProvider>
    );
  }

  return (
    <SimulationProvider>
      <Router>
        <div className="min-h-screen bg-[#020818] grid-pattern relative">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
            onPresentationMode={() => setPresentationMode(true)}
          />
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<HomeDashboard onPresentationMode={() => setPresentationMode(true)} />} />
              <Route path="/monitoring" element={<LiveMonitoring />} />
              <Route path="/control" element={<ControlPanel />} />
              <Route path="/working-principle" element={<WorkingPrinciple />} />
              <Route path="/components" element={<Components />} />
              <Route path="/assembly" element={<Assembly />} />
              <Route path="/performance" element={<PerformanceTesting />} />
              <Route path="/advantages" element={<AdvantagesLimitations />} />
              <Route path="/future" element={<FutureImprovements />} />
              <Route path="/team" element={<TeamInfo />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SimulationProvider>
  );
}

export default App;
