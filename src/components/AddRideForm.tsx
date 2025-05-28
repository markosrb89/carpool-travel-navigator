import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon, MapPin, Users, Euro } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import LocationSelector from "./location/LocationSelector";
import SchedulingOptions from "./SchedulingOptions";
import { getFromLocalStorage, updateModuleProperty } from "@/data/localStorage";
import { StoredData } from "@/types/ride";
import { DriverInfoSection } from "./ride-form";
import { rideFormSchema, RideFormData } from "./ride-form/types";

const AddRideForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const data = getFromLocalStorage();
  const { firstName, lastName, phone, email } = data.userProfile
    .mockPersonalData as {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  const { color, licensePlate, make, model, year } = data.userProfile
    .mockVehicleData as {
    color: string;
    licensePlate: string;
    make: string;
    model: string;
    year: number;
  };

  const calculateRidePrice = (
    fuelCost: number,
    parkingCost: number,
    seats: number
  ) => {
    const totalBaseCost = fuelCost + parkingCost;
    const totalWithMarkup = totalBaseCost * 1.3; // 30% markup
    const pricePerPerson = totalWithMarkup / (seats + 1);
    return Math.ceil(pricePerPerson);
  };

  const form = useForm<RideFormData>({
    // resolver: zodResolver(rideFormSchema),
    defaultValues: {
      availableSeats: 1,
      fuelCost: 0,
      parkingCost: 0,
      hasFreeParking: false,
      isRecurring: false,
      hasReturnTrip: false,
      pickupWindow: 15,
      driverName: `${firstName} ${lastName}`,
      driverEmail: email,
      driverPhone: phone,
      vehicleMake: make,
      vehicleModel: model,
      vehicleYear: year,
      vehicleColor: color,
      licensePlate: licensePlate,
    },
  });

  // Watch the values needed for price calculation
  const watchFuelCost = form.watch("fuelCost");
  const watchParkingCost = form.watch("parkingCost");
  const watchSeats = form.watch("availableSeats");
  const watchHasFreeParking = form.watch("hasFreeParking");

  // Calculate the price whenever relevant values change
  const calculatedPrice = useMemo(() => {
    const parkingCost = watchHasFreeParking ? 0 : watchParkingCost;
    return calculateRidePrice(watchFuelCost, parkingCost, watchSeats);
  }, [watchFuelCost, watchParkingCost, watchSeats, watchHasFreeParking]);

  const onSubmit = async (data: RideFormData) => {
    setIsSubmitting(true);

    const departureLocation = form.getValues("departureLocation");
    const destinationLocation = form.getValues("destinationLocation");
    const departureDate = form.getValues("departureDate");
    const departureTime = form.getValues("departureTime");
    const availableSeats = form.getValues("availableSeats");
    const isRecurring = form.getValues("isRecurring");

    // Simulate API call
    await new Promise((resolve) =>
      setTimeout(() => {
        const data = getFromLocalStorage() as unknown as StoredData | null;
        updateModuleProperty("mockRides", "myOffers", [
          ...(data?.mockRides?.myOffers || []),
          {
            date: departureDate,
            time: departureTime,
            departure: departureLocation,
            destination: destinationLocation,
            status: isRecurring ? "Recurring" : "Active",
            price: `${calculatedPrice} EUR`,
            seats: availableSeats,
          },
        ]);
        resolve(true);
      }, 1000)
    );

    toast({
      title: "Ride Created Successfully!",
      description:
        "Your ride has been posted and is now available for passengers to book.",
      variant: "success",
    });

    setIsSubmitting(false);
    navigate("/my-rides");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <DriverInfoSection form={form} />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Location Section */}
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

          {/* Date & Time Section */}
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
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                  >
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
                  <FormDescription>
                    How long will you wait for passengers at pickup?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Advanced Scheduling */}
          <SchedulingOptions form={form} />

          {/* Ride Details Section */}
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
                    Share any preferences, requirements, or additional details
                    about your ride.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Cost Sharing Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Euro className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Cost Sharing</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fuelCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Cost (EUR)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Cost per passenger for fuel
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parkingCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parking Cost (EUR)</FormLabel>
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
                    <FormDescription>
                      Cost per passenger for parking
                    </FormDescription>
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

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? "Creating..." : "Create Ride"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddRideForm;
