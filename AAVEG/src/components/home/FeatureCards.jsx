import React from 'react';
import SectionTitle from '../common/SectionTitle';
import FeatureCard from './FeatureCard';
import { FESTIVAL_CONFIG } from '../../data/config';

export default function FeatureCards() {
  const cards = [
    {
      id: 'events',
      title: 'EVENTS',
      subtitle: 'Music, Games, Competitions & More',
      image: '/assets/images/events-wheel.jpg',
      to: '#festival-movie',
      tag: 'COMPETE',
      badgeColor: '#FF4D00',
    },
    {
      id: 'experience',
      title: 'EXPERIENCE',
      subtitle: 'Friendship. Fun. Freedom.',
      image: '/assets/images/hero-reference.jpg',
      to: '#festival-movie',
      tag: 'IMMERSION',
      badgeColor: '#FFA04D',
    },
    {
      id: 'be-a-part',
      title: 'BE A PART',
      subtitle: 'Register via Google Form & Join',
      image: '/assets/images/hostel-portals.jpg',
      href: FESTIVAL_CONFIG.googleFormUrl,
      tag: 'GOOGLE FORM',
      badgeColor: '#FF3B00',
    },
    {
      id: 'memories',
      title: 'MEMORIES',
      subtitle: 'Moments That Last Forever',
      image: '/assets/images/hostel-leaderboard.jpg',
      to: '#hostels',
      tag: 'LEGACY',
      badgeColor: '#FF7A32',
    },
  ];

  return (
    <section
      className="cinematic-scene section-spacer py-24 relative z-10"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
        position: 'relative',
        zIndex: 10,
      }}
      id="feature-cards"
    >
      <div className="container">
        <SectionTitle
          subtitle="EXPLORE THE 4 REALMS"
          title="THE FOUR PILLARS OF AAVEG"
          description="Everything you need to know about the fest: from high-octane competitions and immersive midnight corridors to direct Google Form entry."
          align="center"
        />

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginTop: '2.5rem',
          }}
        >
          {cards.map((card) => (
            <FeatureCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
