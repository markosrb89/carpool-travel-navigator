import React, { useState, useRef, useEffect } from 'react';
import { LocationSelectorProps, SearchResult, LocationData } from './types';
import LocationInput from './LocationInput';
import SearchResults from './SearchResults';
import LocationMap from './LocationMap';

const LocationSelector: React.FC<LocationSelectorProps> = ({
  value,
  onChange,
  placeholder,
  className
}) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);
  const [showMap, setShowMap] = useState(false);
  const searchTimeoutRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (searchValue: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchValue.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchValue
        )}&limit=5&addressdetails=1`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'CarPoolApp/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Search results:', data); // Debug log
      setSearchResults(data);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

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
    setShowMap(true);
  };

  const handleMarkerDrag = async (position: { lat: number; lng: number }) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'CarPoolApp/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setSelectedLocation({
        address: data.display_name,
        lat: position.lat,
        lng: position.lng
      });
      
      onChange(data.display_name);
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };

  const handleMapCenter = (center: [number, number]) => {
    setMapCenter(center);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsSearching(true);
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              {
                headers: {
                  'Accept': 'application/json',
                  'User-Agent': 'CarPoolApp/1.0'
                }
              }
            );
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            setSelectedLocation({
              address: data.display_name,
              lat: latitude,
              lng: longitude
            });
            
            setMapCenter([latitude, longitude]);
            onChange(data.display_name);
            setShowMap(true);
          } catch (error) {
            console.error('Error getting location:', error);
          } finally {
            setIsSearching(false);
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
          setIsSearching(false);
        }
      );
    }
  };

  const handleInputChange = (inputValue: string) => {
    onChange(inputValue);
    // Remove the debounce for now to debug the search
    handleSearch(inputValue);
  };

  const handleToggleMap = () => {
    setShowMap(!showMap);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={className} ref={containerRef}>
      <div className="relative w-full">
        <LocationInput
          value={value}
          onChange={handleInputChange}
          onUseCurrentLocation={handleUseCurrentLocation}
          onToggleMap={handleToggleMap}
          showMap={showMap}
          isSearching={isSearching}
          placeholder={placeholder}
        />
        
        <SearchResults
          results={searchResults}
          onSelect={handleLocationSelect}
          showDropdown={showDropdown}
        />
      </div>
      
      {showMap && (
        <LocationMap
          center={mapCenter}
          markerPosition={selectedLocation}
          onMarkerDrag={handleMarkerDrag}
          onMapCenter={handleMapCenter}
        />
      )}
    </div>
  );
};

export default LocationSelector;