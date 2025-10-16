// src/types.ts

// Define the structure of a single train/arrival
export interface TrainData {
  LINE: 'BLUE' | 'GOLD' | 'RED' | 'GREEN';
  STATION: string;
  DESTINATION: string;
  DIRECTION: 'N' | 'S' | 'E' | 'W';
  DELAY: 'T0S' | string; // 'T0S' means on time
  WAITING_TIME: string;
  NEXT_ARR: string;
  TRAIN_ID: string;
}

// Define the structure of station data
export interface StationData {
  line: string;
  name: string;
  id: string;
}

// Define the main data structure for API response
export interface MartaData {
  trains: TrainData[];
  stations: StationData[];
}

export type LineColor = 'blue' | 'gold' | 'red' | 'green';