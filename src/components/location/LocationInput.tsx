import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  onUseCurrentLocation: () => void;
  onToggleMap: () => void;
  showMap: boolean;
  isSearching: boolean;
  placeholder?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  value,
  onChange,
  onUseCurrentLocation,
  onToggleMap,
  showMap,
  isSearching,
  placeholder,
}) => {
  return (
    <div className="relative flex items-center">
      <div className="relative flex-1">
        <MapPin className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9"
          placeholder={placeholder}
        />
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="ml-2"
        onClick={onUseCurrentLocation}
        disabled={isSearching}
      >
        <Navigation className={cn(
          "h-4 w-4",
          isSearching && "animate-spin"
        )} />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="ml-2"
        onClick={onToggleMap}
      >
        <Map className={cn(
          "h-4 w-4",
          showMap && "text-blue-600"
        )} />
      </Button>
    </div>
  );
};

export default LocationInput; 