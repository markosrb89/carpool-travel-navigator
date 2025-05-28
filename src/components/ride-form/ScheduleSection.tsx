import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { RideFormData } from './types';

interface ScheduleSectionProps {
  form: UseFormReturn<RideFormData>;
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({ form }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <CalendarIcon className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Schedule</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="departureDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="departureTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="pickupWindow"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>Pickup Window (minutes)</FormLabel>
            <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select pickup window" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>How long will you wait for passengers at pickup?</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ScheduleSection; 