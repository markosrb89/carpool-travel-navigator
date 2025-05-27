
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const LocationSelector = ({ value, onChange, placeholder }: LocationSelectorProps) => {
  const [showMap, setShowMap] = useState(false);

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // In a real app, you'd reverse geocode these coordinates
          onChange(`Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleUseCurrentLocation}
          title="Use current location"
        >
          <Navigation className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setShowMap(!showMap)}
          title="Select on map"
        >
          <MapPin className="w-4 h-4" />
        </Button>
      </div>
      
      {showMap && (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">Interactive map coming soon!</p>
          <p className="text-sm text-gray-500">Click and drag to select pickup location</p>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
