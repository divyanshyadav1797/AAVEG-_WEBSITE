import React from 'react';
import Hero from '../components/hero/Hero';
import FestivalMovieJourney from '../components/home/FestivalMovieJourney';
import AavegGamesSection from '../components/games/AavegGamesSection';

export default function Home() {
  return (
    <div className="home-page-container">
      {/* 01. The Uppermost Part: Master Cinematic Hero matching authentic media title */}
      <Hero />

      {/* 02. The Scrolling Movie Thing: 4-Act Cinematic Festival Journey with Three.js */}
      <FestivalMovieJourney />

      {/* 03. The Climax: Two Fun Endless Single-Player Horror Games (Thunder Shield & Pumpkin Jump) */}
      <AavegGamesSection />
    </div>
  );
}

