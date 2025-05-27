import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';

import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

interface SearchResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: string;
}

interface LocationData {
  address: string;
  lat: number;
  lng: number;
}

// Component to handle map clicks
const MapClickHandler = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });
  return null;
};

// Component to handle draggable marker
const DraggableMarker = ({ position, onDragEnd }: { position: [number, number], onDragEnd: (lat: number, lng: number) => void }) => {
  const map = useMap();
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (markerRef.current) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const pos = marker.getLatLng();
          onDragEnd(pos.lat, pos.lng);
        }
      },
    }),
    [onDragEnd],
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
};

const LocationSelector = ({ value, onChange, placeholder }: LocationSelectorProps) => {
  const [showMap, setShowMap] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]); // Default to NYC
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Handle location selection from search results
  const handleLocationSelect = async (result: SearchResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    
    setSelectedLocation({
      address: result.display_name,
      lat,
      lng
    });
    
    setMapCenter([lat, lng]);
    onChange(result.display_name);
    setShowDropdown(false);
    setSearchResults([]);
    setShowMap(true); // Automatically show map when location is selected
  };

  // Handle input change with debouncing
  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set new timeout for search
    searchTimeoutRef.current = setTimeout(async () => {
      if (inputValue.length >= 3) {
        setIsSearching(true);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputValue)}&limit=5&addressdetails=1`
          );
          const results = await response.json();
          
          if (results.length > 0) {
            // If we get a valid result, update the location and show the map
            const firstResult = results[0];
            const lat = parseFloat(firstResult.lat);
            const lng = parseFloat(firstResult.lon);
            
            setSelectedLocation({
              address: firstResult.display_name,
              lat,
              lng
            });
            setMapCenter([lat, lng]);
            setShowMap(true);
          }
          
          setSearchResults(results);
          setShowDropdown(results.length > 0);
        } catch (error) {
          console.error('Error searching locations:', error);
          setSearchResults([]);
        }
        setIsSearching(false);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    // Sync input value with map marker
    if (inputValue && selectedLocation) {
      setSelectedLocation({
        ...selectedLocation,
        address: inputValue
      });
    }
  };

  // Reverse geocode coordinates to get address
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const result = await response.json();
      return result.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  // Handle map click location selection
  const handleMapLocationSelect = async (lat: number, lng: number) => {
    const address = await reverseGeocode(lat, lng);
    
    setSelectedLocation({
      address,
      lat,
      lng
    });
    
    onChange(address);
  };

  // Use current location
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      // Show loading state
      setIsSearching(true);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await reverseGeocode(latitude, longitude);
          
          // Update selected location and map center
          setSelectedLocation({
            address,
            lat: latitude,
            lng: longitude
          });
          
          setMapCenter([latitude, longitude]);
          onChange(address);
          setShowMap(true); // Ensure map is shown
          setIsSearching(false); // Hide loading state
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsSearching(false);
          // Show error message to user
          alert('Could not get your current location. Please make sure location services are enabled.');
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 5000, // Wait up to 5 seconds
          maximumAge: 0 // Don't use cached position
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle marker drag end
  const handleMarkerDragEnd = async (lat: number, lng: number) => {
    const address = await reverseGeocode(lat, lng);
    setSelectedLocation({
      address,
      lat,
      lng
    });
    onChange(address);
  };

  return (
    <div className="space-y-2 relative">
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Search Results Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-[1000] max-h-60 overflow-y-auto">
              {isSearching ? (
                <div className="p-3 text-center text-gray-500">Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <button
                    key={result.place_id}
                    className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLocationSelect(result);
                    }}
                  >
                    <div className="font-medium text-sm">{result.display_name}</div>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500">No results found</div>
              )}
            </div>
          )}
        </div>
        
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
        <div className="bg-gray-100 rounded-lg overflow-hidden relative" style={{ height: '300px' }}>
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            key={`${mapCenter[0]}-${mapCenter[1]}`}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {selectedLocation && (
              <DraggableMarker
                position={[selectedLocation.lat, selectedLocation.lng]}
                onDragEnd={handleMarkerDragEnd}
              />
            )}
            
            <MapClickHandler onLocationSelect={handleMapLocationSelect} />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
