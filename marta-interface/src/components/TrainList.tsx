// src/components/TrainList.tsx
import React, { useState, useMemo } from 'react';
import Train from './Train'; // <--- Ensure this path is correct
import type { TrainData, LineColor } from '../types';

interface TrainListProps {
  line: LineColor;
  trains: TrainData[];
  selectedStation: string | null;
}

type FilterKey = 'Arriving' | 'Scheduled' | 'Northbound' | 'Southbound' | 'Eastbound' | 'Westbound';

const TrainList: React.FC<TrainListProps> = ({ line, trains, selectedStation }) => {
  const [activeFilters, setActiveFilters] = useState<Set<FilterKey>>(new Set());

  // Define filter buttons based on line color
  const isNSLine = line === 'gold' || line === 'red';
  const direction1: FilterKey = isNSLine ? 'Northbound' : 'Eastbound';
  const direction2: FilterKey = isNSLine ? 'Southbound' : 'Westbound';

  const filterButtons: FilterKey[] = ['Arriving', 'Scheduled', direction1, direction2];

  // Function to toggle a filter
  const toggleFilter = (filter: FilterKey) => {
    setActiveFilters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(filter)) {
        newSet.delete(filter);
      } else {
        newSet.add(filter);
      }
      return newSet;
    });
  };

  // Memoized filtered trains (Logic remains the same)
  const filteredTrains = useMemo(() => {
    let list = trains;

    // 1. Filter by selected station (from NavBar)
    if (selectedStation) {
      list = list.filter(train => train.STATION === selectedStation);
    }

    // 2. Filter by functional buttons
    if (activeFilters.size > 0) {
      list = list.filter(train => {
        let matches = true;

        // Arriving filter
        if (activeFilters.has('Arriving')) {
          // If 'Arriving' is active, must match 'Arriving' or 'Boarding'
          matches = matches && (train.WAITING_TIME === 'Arriving' || train.WAITING_TIME === 'Boarding');
        }

        // Scheduled filter
        if (activeFilters.has('Scheduled')) {
          // If 'Scheduled' is active, must be non-Arriving/Boarding AND On Time ('T0S')
          matches = matches && (train.WAITING_TIME !== 'Arriving' && train.WAITING_TIME !== 'Boarding' && train.DELAY === 'T0S');
        }

        // Direction filter logic
        const isNorth = activeFilters.has('Northbound');
        const isSouth = activeFilters.has('Southbound');
        const isEast = activeFilters.has('Eastbound');
        const isWest = activeFilters.has('Westbound');

        if (isNorth) matches = matches && train.DIRECTION === 'N';
        if (isSouth) matches = matches && train.DIRECTION === 'S';
        if (isEast) matches = matches && train.DIRECTION === 'E';
        if (isWest) matches = matches && train.DIRECTION === 'W';
        
        return matches;
      });
    }

    return list;
  }, [trains, selectedStation, activeFilters]);

  // Map the line color to the CSS background class
  const lineBgClassMap: { [key in LineColor]: string } = {
    blue: 'bg-blue-line',
    gold: 'bg-gold-line',
    red: 'bg-red-line',
    green: 'bg-green-line',
  };

  return (
    // Applies the specific line background color and main container styles
    <div className={`train-list-container ${lineBgClassMap[line]}`}>
      
      {/* Filter Buttons Container */}
      <div className="filter-controls">
        {filterButtons.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            // Use the correct retro-btn and conditional filter-btn-active class
            className={`retro-btn filter-btn ${activeFilters.has(filter) ? 'filter-btn-active' : ''}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Train Cards Wrapper (for max-width and centering) */}
      <div className="train-cards-wrapper">
        {filteredTrains.length > 0 ? (
          filteredTrains.map((train) => (
            // The key must be unique, combining ID and waiting time helps ensure re-renders on arrival updates
            <Train key={train.TRAIN_ID + train.WAITING_TIME} train={train} />
          ))
        ) : (
          /* No Trains Message (Bonus Feature) */
          <div className="no-trains-message">
            <p>🚨 NO CURRENT TRAINS MATCH FILTERS 🚨</p>
            <p style={{ marginTop: '10px', fontSize: '1rem', color: 'var(--color-retro-dark)' }}>
              Try adjusting your station or filter selections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainList;