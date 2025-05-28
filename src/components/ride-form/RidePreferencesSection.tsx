import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Users } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { RideFormData } from './types';

interface RidePreferencesSectionProps {
  form: UseFormReturn<RideFormData>;
}

const RidePreferencesSection: React.FC<RidePreferencesSectionProps> = ({ form }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Users className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold">Ride Preferences</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="allowSmoking"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Allow Smoking</FormLabel>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="allowPets"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Allow Pets</FormLabel>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="allowMusic"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Allow Music</FormLabel>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="allowChatting"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Open to Conversation</FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RidePreferencesSection; 