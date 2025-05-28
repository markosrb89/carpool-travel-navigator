import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { RideFormData } from './types';

interface RideDetailsSectionProps {
  form: UseFormReturn<RideFormData>;
}

const RideDetailsSection: React.FC<RideDetailsSectionProps> = ({ form }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Users className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Ride Details</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="availableSeats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Seats</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  max="8" 
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>Message for Passengers</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Add any additional information for potential passengers..."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Share any preferences, requirements, or additional details about your ride.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RideDetailsSection; 