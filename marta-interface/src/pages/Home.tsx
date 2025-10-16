// src/pages/Home.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import type { LineColor } from '../types';

const Home: React.FC = () => {
  const lineLinks: { line: LineColor; colorClass: string }[] = [
    { line: 'gold', colorClass: 'btn-gold' },
    { line: 'red', colorClass: 'btn-red' },
    { line: 'blue', colorClass: 'btn-blue' },
    { line: 'green', colorClass: 'btn-green' },
  ];

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <NavLink to="/about">
          About MARTA mobile
        </NavLink>
      </header>
      
      {/* Hero Section */}
      <main className="hero-section">
        <h1>MARTA mobile</h1>
        <h2>Your Pocket Transit Interface</h2>
      </main>

      {/* Line Selection */}
      <section style={{ maxWidth: '700px', width: '100%' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', borderBottom: '1px solid var(--color-retro-white)', paddingBottom: '10px' }}>
          Select a Transit Line
        </h3>
        <div className="line-selection-grid">
          {lineLinks.map(({ line, colorClass }) => (
            <NavLink
              key={line}
              to={`/lines/${line}`}
              className="line-link"
            >
              <button className={`retro-btn ${colorClass} btn-marta`}>
                {line.toUpperCase()} Line
              </button>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;