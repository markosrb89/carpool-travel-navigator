
export interface Ride {
  id: string;
  driver: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    verified: boolean;
  };
  departure: {
    location: string;
    coordinates: [number, number];
    time: string;
    date: string;
  };
  destination: {
    location: string;
    coordinates: [number, number];
    time: string;
  };
  availableSeats: number;
  totalSeats: number;
  price: number;
  distance: number;
  duration: string;
  description?: string;
  preferences: string[];
  recurring?: {
    days: string[];
    endDate?: string;
  };
  waitlistCount: number;
}

export type ViewMode = 'grid' | 'list' | 'map';

export interface SearchFilters {
  query: string;
  departure: string;
  destination: string;
  date: string;
  timeRange: {
    start: string;
    end: string;
  };
  maxDistance: number;
  driverName: string;
}
