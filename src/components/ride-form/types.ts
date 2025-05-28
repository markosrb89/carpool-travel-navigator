import { z } from 'zod';

export const rideFormSchema = z.object({
  // Driver Info
  driverName: z.string().min(1, 'Name is required'),
  driverEmail: z.string().email('Invalid email address'),
  driverPhone: z.string().min(1, 'Phone number is required'),
  vehicleMake: z.string().min(1, 'Vehicle make is required'),
  vehicleModel: z.string().min(1, 'Vehicle model is required'),
  vehicleYear: z.number().min(1900).max(new Date().getFullYear() + 1),
  vehicleColor: z.string().min(1, 'Vehicle color is required'),
  licensePlate: z.string().min(1, 'License plate is required'),
  
  // Route Info
  departureLocation: z.string().min(3, 'Departure location is required'),
  destinationLocation: z.string().min(3, 'Destination location is required'),
  departureDate: z.string().min(1, 'Departure date is required'),
  departureTime: z.string().min(1, 'Departure time is required'),
  returnDate: z.string().optional(),
  returnTime: z.string().optional(),
  availableSeats: z.number().min(1, 'At least 1 seat must be available').max(8, 'Maximum 8 seats'),
  fuelCost: z.number().min(0, 'Fuel cost must be positive'),
  parkingCost: z.number().min(0, 'Parking cost must be positive'),
  hasFreeParking: z.boolean(),
  message: z.string().optional(),
  isRecurring: z.boolean(),
  recurringDays: z.array(z.string()).optional(),
  recurringEndDate: z.string().optional(),
  hasReturnTrip: z.boolean(),
  pickupWindow: z.number().min(5, 'Minimum pickup window is 5 minutes').max(60, 'Maximum pickup window is 60 minutes'),
  
  // Ride Preferences
  allowSmoking: z.boolean(),
  allowPets: z.boolean(),
  allowMusic: z.boolean(),
  allowChatting: z.boolean(),
}).refine((data) => {
  // If it's a return trip, validate return date and time
  if (data.hasReturnTrip) {
    if (!data.returnDate || !data.returnTime) {
      return false;
    }
    
    const departureDateTime = new Date(`${data.departureDate}T${data.departureTime}`);
    const returnDateTime = new Date(`${data.returnDate}T${data.returnTime}`);
    
    return returnDateTime >= departureDateTime;
  }
  return true;
}, {
  message: "Return trip must be scheduled after departure",
  path: ["returnDate"]
}).refine((data) => {
  // If it's a recurring ride, validate recurring days and end date
  if (data.isRecurring) {
    if (!data.recurringDays || data.recurringDays.length === 0) {
      return false;
    }
    
    if (data.recurringEndDate) {
      const startDate = new Date(data.departureDate);
      const endDate = new Date(data.recurringEndDate);
      return endDate >= startDate;
    }
  }
  return true;
}, {
  message: "Please select at least one recurring day and ensure end date is after start date",
  path: ["recurringDays"]
});

export type RideFormData = z.infer<typeof rideFormSchema>; 