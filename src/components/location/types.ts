export interface SearchResult {
  place_id?: number;
  lat: string;
  lon: string;
  display_name: string;
  type: string;
  address?: {
    city?: string;
    town?: string;
    county?: string;
    country: string;
  };
}

export interface LocationData {
  address: string;
  lat: number;
  lng: number;
}

export interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
} 