
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SearchFilters as SearchFiltersType } from '@/types/ride';
import { Search, MapPin, Calendar, Clock, User } from 'lucide-react';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onClearFilters: () => void;
}

const SearchFilters = ({ filters, onFiltersChange, onClearFilters }: SearchFiltersProps) => {
  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const updateTimeRange = (key: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      timeRange: { ...filters.timeRange, [key]: value }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div>
          <Label htmlFor="search" className="text-sm font-medium text-gray-700 mb-2 block">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="search"
              placeholder="Search rides..."
              value={filters.query}
              onChange={(e) => updateFilter('query', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="departure" className="text-sm font-medium text-gray-700 mb-2 block">
            From
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="departure"
              placeholder="Departure location"
              value={filters.departure}
              onChange={(e) => updateFilter('departure', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="destination" className="text-sm font-medium text-gray-700 mb-2 block">
            To
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="destination"
              placeholder="Destination"
              value={filters.destination}
              onChange={(e) => updateFilter('destination', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2 block">
            Date
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="date"
              type="date"
              value={filters.date}
              onChange={(e) => updateFilter('date', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="timeStart" className="text-sm font-medium text-gray-700 mb-2 block">
            Time Range
          </Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="timeStart"
                type="time"
                value={filters.timeRange.start}
                onChange={(e) => updateTimeRange('start', e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative flex-1">
              <Input
                type="time"
                value={filters.timeRange.end}
                onChange={(e) => updateTimeRange('end', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="driver" className="text-sm font-medium text-gray-700 mb-2 block">
            Driver
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="driver"
              placeholder="Driver name"
              value={filters.driverName}
              onChange={(e) => updateFilter('driverName', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-4">
          <Label htmlFor="maxDistance" className="text-sm font-medium text-gray-700">
            Max Distance: {filters.maxDistance} miles
          </Label>
          <input
            id="maxDistance"
            type="range"
            min="5"
            max="100"
            value={filters.maxDistance}
            onChange={(e) => updateFilter('maxDistance', parseInt(e.target.value))}
            className="w-32"
          />
        </div>
        <Button variant="outline" onClick={onClearFilters} size="sm">
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
