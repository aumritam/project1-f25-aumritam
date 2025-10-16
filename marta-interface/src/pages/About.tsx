// src/pages/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About MARTA</h1>
        <Link to="/" className="retro-btn" style={{ backgroundColor: 'var(--color-retro-dark)', color: 'var(--color-retro-white)' }}>
          ← Back to Home
        </Link>
      </header>

      <div className="about-content">
        
        {/* Map Section */}
        <section>
          <h2 className="section-title">System Map</h2>
          <div className="map-placeholder">
            
          </div>
        </section>

        {/* Information Section */}
        <section className="about-info">
          <h2 className="section-title">MARTA's Purpose</h2>
          <p>
            The Metropolitan Atlanta Rapid Transit Authority (MARTA) provides bus, rail, and paratransit service in the Atlanta metropolitan area. The system is the eighth-largest transit system in the United States and serves as a vital artery for the region.
          </p>
          <p>
            Our purpose is to connect people to opportunity, drive economic development, and enhance the quality of life in the communities we serve. This retro interface is a tribute to the enduring nature and history of public transit.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;