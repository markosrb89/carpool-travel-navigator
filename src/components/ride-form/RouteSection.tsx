import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { MapPin } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { RideFormData } from './types';
import { LocationSelector } from '@/components/location';

interface RouteSectionProps {
  form: UseFormReturn<RideFormData>;
}

const RouteSection: React.FC<RouteSectionProps> = ({ form }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <MapPin className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Route Information</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="departureLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Location</FormLabel>
              <FormControl>
                <LocationSelector
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter pickup location"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="destinationLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination Location</FormLabel>
              <FormControl>
                <LocationSelector
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter destination"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RouteSection; 