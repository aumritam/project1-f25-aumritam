// src/components/NavBar.tsx
import React from 'react';
import type { LineColor, StationData } from '../types';
import { NavLink } from 'react-router-dom';

interface NavBarProps {
  line: LineColor;
  stations: StationData[];
  onStationSelect: (stationName: string | null) => void;
  selectedStation: string | null;
}

const NavBar: React.FC<NavBarProps> = ({ line, stations, onStationSelect, selectedStation }) => {
  const allLines: LineColor[] = ['gold', 'red', 'blue', 'green'];
  
  return (
    <nav className="navbar">
      {/* MARTA Logo/Title */}
      <NavLink to="/" className="navbar-title">
        MARTA Transit Monitor
      </NavLink>

      {/* Line Selection Buttons */}
      <div className="line-buttons-container">
        {allLines.map((l) => (
          <NavLink
            key={l}
            to={`/lines/${l}`}
            className={({ isActive }) => `line-link ${isActive ? 'active' : ''}`}
          >
            <button className={`retro-btn btn-${l} btn-marta`}>
              {l.toUpperCase()} Line
            </button>
          </NavLink>
        ))}
      </div>

      {/* Station Filter (Horizontal Scroll) */}
      <div className="station-filter-container">
        <div className="station-filter-inner">
          {/* Clear Filter Button */}
          <button
            onClick={() => onStationSelect(null)}
            className={`retro-btn station-btn ${selectedStation === null ? 'station-btn-active' : ''}`}
          >
            All Stations
          </button>
          
          {/* Station Buttons */}
          {stations.map((station) => (
            <button
              key={station.id}
              onClick={() => onStationSelect(station.name)}
              className={`retro-btn station-btn ${selectedStation === station.name ? 'station-btn-active' : ''}`}
            >
              {station.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;