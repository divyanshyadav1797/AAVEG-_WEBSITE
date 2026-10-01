import React from 'react';
import Hero from '../components/hero/Hero';
import FestivalMovieJourney from '../components/home/FestivalMovieJourney';

export default function Home() {
  return (
    <div className="home-page-container">
      {/* 01. The Uppermost Part: Master Cinematic Hero matching authentic media title */}
      <Hero />

      {/* 02. The Scrolling Movie Thing: 4-Act Cinematic Festival Journey */}
      <FestivalMovieJourney />
    </div>
  );
}
