// src/pages/LinesPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TrainList from '../components/TrainList';
import type { MartaData, LineColor, TrainData, StationData } from '../types';

const API_BASE_URL = "https://midsem-bootcamp-api.onrender.com";

const LinesPage: React.FC = () => {
  const { line } = useParams<{ line: LineColor }>();

  const [martaData, setMartaData] = useState<MartaData>({ trains: [], stations: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const currentLine: LineColor = line || 'gold';

  const handleStationSelect = (stationName: string | null) => {
    setSelectedStation(stationName);
  };

  useEffect(() => {
    // Reset state and selection when line changes
    setIsLoading(true);
    setError(null);
    setMartaData({ trains: [], stations: [] });
    setSelectedStation(null);

    const fetchMartaData = async () => {
      try {
        const trainUrl = `${API_BASE_URL}/arrivals/${currentLine}`;
        const stationUrl = `${API_BASE_URL}/stations/${currentLine}`;

        const [trainResponse, stationResponse] = await Promise.all([
          fetch(trainUrl),
          fetch(stationUrl),
        ]);

        if (!trainResponse.ok || !stationResponse.ok) {
          throw new Error('API request failed');
        }

        const trainData: TrainData[] = await trainResponse.json();
        const stationData: StationData[] = await stationResponse.json();

        setMartaData({ trains: trainData, stations: stationData });
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(`Failed to fetch data for ${currentLine.toUpperCase()} line. Please wait 15-30 seconds and refresh.`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMartaData();
  }, [currentLine]);


  if (error) {
    return (
      <div className="error-message" style={{ margin: '50px', padding: '30px', backgroundColor: 'var(--color-marta-red)', color: 'white', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Connection Error</h2>
        <p style={{ marginTop: '10px' }}>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="loader"></div>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-retro-white)' }}>Loading MARTA data for the {currentLine.toUpperCase()} line...</p>
      </div>
    );
  }

  return (
    <div className="lines-page-wrapper">
      <NavBar
        line={currentLine}
        stations={martaData.stations}
        onStationSelect={handleStationSelect}
        selectedStation={selectedStation}
      />
      <TrainList
        line={currentLine}
        trains={martaData.trains}
        selectedStation={selectedStation}
      />
    </div>
  );
};

export default LinesPage;