import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { DollarSign } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { RideFormData } from './types';

interface CostSharingSectionProps {
  form: UseFormReturn<RideFormData>;
}

const CostSharingSection: React.FC<CostSharingSectionProps> = ({ form }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Cost Sharing</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="fuelCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fuel Cost ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>Cost per passenger for fuel</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="parkingCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parking Cost ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>Cost per passenger for parking</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="hasFreeParking"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Free parking available</FormLabel>
              <FormDescription>
                Check if parking is free at the destination
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CostSharingSection; 