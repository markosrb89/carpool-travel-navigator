
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Ride } from '@/types/ride';
import { MapPin, Clock, Users, DollarSign } from 'lucide-react';

interface RideApplicationDialogProps {
  ride: Ride | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (applicationData: ApplicationData) => void;
  isWaitlist?: boolean;
}

interface ApplicationData {
  pickupLocation: string;
  message: string;
  agreedToTerms: boolean;
  phoneNumber: string;
}

const RideApplicationDialog = ({ 
  ride, 
  isOpen, 
  onClose, 
  onSubmit, 
  isWaitlist = false 
}: RideApplicationDialogProps) => {
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    pickupLocation: '',
    message: '',
    agreedToTerms: false,
    phoneNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applicationData.agreedToTerms) {
      onSubmit(applicationData);
      setApplicationData({
        pickupLocation: '',
        message: '',
        agreedToTerms: false,
        phoneNumber: '',
      });
      onClose();
    }
  };

  if (!ride) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isWaitlist ? 'Join Waitlist' : 'Apply for Ride'}
          </DialogTitle>
          <DialogDescription>
            {isWaitlist 
              ? 'Join the waitlist for this ride. You\'ll be notified if a seat becomes available.'
              : 'Complete your application to join this ride.'
            }
          </DialogDescription>
        </DialogHeader>

        {/* Ride Summary */}
        <div className="bg-gray-50 rounded-lg p-4 my-4">
          <h4 className="font-semibold mb-3">Ride Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{ride.departure.location} → {ride.destination.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-500" />
              <span>{ride.departure.date} at {ride.departure.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span>Driver: {ride.driver.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-semibold">${ride.price} per person</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="pickupLocation">Pickup Location</Label>
            <Input
              id="pickupLocation"
              placeholder="Where should the driver pick you up?"
              value={applicationData.pickupLocation}
              onChange={(e) => setApplicationData({
                ...applicationData,
                pickupLocation: e.target.value
              })}
              required
            />
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Your phone number for coordination"
              value={applicationData.phoneNumber}
              onChange={(e) => setApplicationData({
                ...applicationData,
                phoneNumber: e.target.value
              })}
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message to Driver (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Any additional information or special requests..."
              value={applicationData.message}
              onChange={(e) => setApplicationData({
                ...applicationData,
                message: e.target.value
              })}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={applicationData.agreedToTerms}
              onCheckedChange={(checked) => setApplicationData({
                ...applicationData,
                agreedToTerms: checked as boolean
              })}
            />
            <Label htmlFor="terms" className="text-sm">
              I agree to the{' '}
              <button type="button" className="text-blue-600 hover:underline">
                terms and conditions
              </button>{' '}
              and cost-sharing arrangement
            </Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!applicationData.agreedToTerms}
            >
              {isWaitlist ? 'Join Waitlist' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RideApplicationDialog;
