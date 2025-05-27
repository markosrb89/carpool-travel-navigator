
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RotateCcw, Calendar, Clock } from 'lucide-react';

interface SchedulingOptionsProps {
  form: UseFormReturn<any>;
}

const SchedulingOptions = ({ form }: SchedulingOptionsProps) => {
  const watchIsRecurring = form.watch('isRecurring');
  const watchHasReturnTrip = form.watch('hasReturnTrip');

  const daysOfWeek = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Advanced Scheduling</h3>
      </div>

      {/* Recurring Ride Option */}
      <FormField
        control={form.control}
        name="isRecurring"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Recurring ride</FormLabel>
              <FormDescription>
                Create a recurring ride schedule for regular commutes
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {/* Recurring Days Selection */}
      {watchIsRecurring && (
        <div className="ml-6 mb-4 p-4 bg-gray-50 rounded-lg">
          <FormField
            control={form.control}
            name="recurringDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Days</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {daysOfWeek.map((day) => (
                    <div key={day.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={day.id}
                        checked={field.value?.includes(day.id) || false}
                        onCheckedChange={(checked) => {
                          const currentDays = field.value || [];
                          if (checked) {
                            field.onChange([...currentDays, day.id]);
                          } else {
                            field.onChange(currentDays.filter((d: string) => d !== day.id));
                          }
                        }}
                      />
                      <label htmlFor={day.id} className="text-sm font-medium">
                        {day.label}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recurringEndDate"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>End Date (Optional)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormDescription>
                  When should this recurring ride schedule end?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {/* Return Trip Option */}
      <FormField
        control={form.control}
        name="hasReturnTrip"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="flex items-center">
                <RotateCcw className="w-4 h-4 mr-1" />
                Return trip
              </FormLabel>
              <FormDescription>
                Schedule a return trip for the same day
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      {/* Return Trip Details */}
      {watchHasReturnTrip && (
        <div className="ml-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="returnDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Return Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="returnTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Return Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulingOptions;
