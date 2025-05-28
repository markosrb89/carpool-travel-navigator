import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '@/data/mockUser';
import { syncWithAdditionalData, getFromLocalStorage } from '@/data/localStorage';
import { Ride } from '@/types/ride';
import {
  DriverInfoSection,
  VehicleInfoSection,
  RidePreferencesSection,
  RouteSection,
  ScheduleSection,
  RideDetailsSection,
  CostSharingSection,
  rideFormSchema,
  type RideFormData
} from '.';

interface AddRideFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

const AddRideForm: React.FC<AddRideFormProps> = ({ onCancel, onSuccess }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RideFormData>({
    resolver: zodResolver(rideFormSchema),
    defaultValues: {
      // Pre-fill user profile data
      driverName: mockUser.name,
      driverEmail: mockUser.email,
      driverPhone: mockUser.phoneNumber,
      vehicleMake: mockUser.vehicleInfo.make,
      vehicleModel: mockUser.vehicleInfo.model,
      vehicleYear: mockUser.vehicleInfo.year,
      vehicleColor: mockUser.vehicleInfo.color,
      licensePlate: mockUser.vehicleInfo.licensePlate,
      allowSmoking: mockUser.preferences.smoking,
      allowPets: mockUser.preferences.pets,
      allowMusic: mockUser.preferences.music,
      allowChatting: mockUser.preferences.chatty,
      
      // Default values
      availableSeats: 1,
      fuelCost: 0,
      parkingCost: 0,
      hasFreeParking: false,
      isRecurring: false,
      hasReturnTrip: false,
      pickupWindow: 15,
      recurringDays: [],
    },
  });

  const onSubmit = async (data: RideFormData) => {
    setIsSubmitting(true);
    
    try {
      // Get existing rides from localStorage
      const localStorageData = getFromLocalStorage();
      const existingRides = (localStorageData?.mockRides?.mockRides as Ride[]) || [];
      
      // Create new ride object
      const newRide: Ride = {
        id: `ride${existingRides.length + 1}`,
        driver: {
          id: mockUser.id,
          name: data.driverName,
          rating: mockUser.rating,
          verified: mockUser.verified,
          totalRides: mockUser.totalRides,
        },
        departure: {
          location: data.departureLocation,
          coordinates: [0, 0], // TODO: Get coordinates from LocationSelector
          time: data.departureTime,
          date: data.departureDate,
        },
        destination: {
          location: data.destinationLocation,
          coordinates: [0, 0], // TODO: Get coordinates from LocationSelector
          time: "", // TODO: Calculate based on distance
        },
        availableSeats: data.availableSeats,
        totalSeats: data.availableSeats,
        price: data.fuelCost + data.parkingCost,
        distance: 0, // TODO: Calculate distance
        duration: "", // TODO: Calculate duration
        description: data.message,
        preferences: [
          ...(data.allowSmoking ? ["Smoking allowed"] : []),
          ...(data.allowPets ? ["Pets allowed"] : []),
          ...(data.allowMusic ? ["Music allowed"] : []),
          ...(data.allowChatting ? ["Chatting welcome"] : []),
        ],
        recurring: data.isRecurring ? {
          days: data.recurringDays || [],
          endDate: data.recurringEndDate,
        } : undefined,
        waitlistCount: 0,
      };
      
      // Add new ride to existing rides
      const updatedRides = [...existingRides, newRide];
      
      // Save to localStorage
      await syncWithAdditionalData({
        mockRides: {
          mockRides: updatedRides,
        },
      });

      toast({
        title: "Success!",
        description: "Your ride has been created successfully.",
      });

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Call onCancel to close the dialog
      if (onCancel) {
        onCancel();
      }

    } catch (error) {
      console.error('Error creating ride:', error);
      toast({
        title: "Error",
        description: "There was a problem creating your ride. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DriverInfoSection form={form} />
          <VehicleInfoSection form={form} />
          <RidePreferencesSection form={form} />
          <RouteSection form={form} />
          <ScheduleSection form={form} />
          <RideDetailsSection form={form} />
          <CostSharingSection form={form} />

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? 'Creating...' : 'Create Ride'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddRideForm;
