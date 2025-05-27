import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Ride } from "@/types/ride";
import GoogleMapComponent from "./GoogleMaps";
import { Clock, MapPin } from "lucide-react";

interface RouteMapDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ride: Ride | null;
}

const RouteMapDialog = ({ isOpen, onClose, ride }: RouteMapDialogProps) => {
  if (!ride) return null;

  // These would normally come from your ride data
  // For now using mock coordinates
  const departureCoords = {
    lat: 40.712776,
    lng: -74.005974,
    label: "A",
  };

  const destinationCoords = {
    lat: 40.73061,
    lng: -73.935242,
    label: "B",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Route Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{ride.departure.location}</span>
              </div>
              <div className="text-sm text-gray-600">
                {ride.departure.date} at {ride.departure.time}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-green-500" />
                <span className="font-medium">{ride.destination.location}</span>
              </div>
              <div className="text-sm text-gray-600">
                Estimated arrival: {ride.destination.time}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Duration: {ride.duration}</span>
          </div>
        </div>

        <div className="h-[400px] w-full my-4">
          <GoogleMapComponent
            markers={[departureCoords, destinationCoords]}
            showRoute={true}
            origin={departureCoords}
            destination={destinationCoords}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RouteMapDialog;
