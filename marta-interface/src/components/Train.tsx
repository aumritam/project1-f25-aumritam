// src/components/Train.tsx
import React from 'react';
import type { TrainData } from '../types';

interface TrainProps {
  train: TrainData;
}

const Train: React.FC<TrainProps> = ({ train }) => {
  const isDelayed = train.DELAY !== "T0S";

  const statusClass = isDelayed ? 'status-delayed' : 'status-on-time';
  const statusText = isDelayed ? 'DELAYED' : 'ON TIME';
  
  const directionMap: { [key: string]: string } = {
    N: 'NB', S: 'SB', E: 'EB', W: 'WB',
  };
  const directionAbbr = directionMap[train.DIRECTION] || train.DIRECTION;

  return (
    <div className="train-card">
      
      {/* Status Tag */}
      <div className={`status-tag ${statusClass}`}>
        {statusText}
      </div>

      {/* Main Info */}
      <div className="main-info">
        
        {/* Destination & Station */}
        <div className="destination-info">
          <p>{train.DESTINATION}</p>
          <p>{train.STATION}</p>
        </div>

        {/* Waiting Time & Direction */}
        <div className="time-direction">
          <p>{train.WAITING_TIME}</p>
          <p>{directionAbbr}</p>
        </div>
      </div>
    </div>
  );
};

export default Train;