import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import HouseSelection from './pages/HouseSelection';
import HouseActivities from './pages/HouseActivities';
import LeaderboardPage from './pages/LeaderboardPage';
import { useLenis } from './hooks/useLenis';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Ultra-smooth 60fps momentum scroll
  useLenis();

  return (
    <div
      className="aaveg-app-root"
      style={{
        position: 'relative',
        backgroundColor: '#040507',
        color: '#EDE8E1',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'clip',
      }}
    >
      <ScrollToTop />
      {/* Fixed Header with college logo, anchors, sound toggle & Select House CTA */}
      <Header />

      {/* Main Experience Router */}
      <main style={{ width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/houses" element={<HouseSelection />} />
          <Route path="/house/:houseId" element={<HouseActivities />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Cinematic Footer */}
      <Footer />
    </div>
  );
}
