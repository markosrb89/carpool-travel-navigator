import React, { useState } from "react";
import { Ride } from "@/types/ride";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Star, Shield } from "lucide-react";
import { RouteMapModal } from "./RouteMapModal";

interface RideCardProps {
  ride: Ride;
  onApply: (ride: Ride) => void;
  onJoinWaitlist: (ride: Ride) => void;
  isCompact?: boolean;
}

const RideCard = ({
  ride,
  onApply,
  onJoinWaitlist,
  isCompact = false,
}: RideCardProps) => {
  const [isRouteMapOpen, setIsRouteMapOpen] = useState(false);
  const hasAvailableSeats = ride.availableSeats > 0;

  return (
    <>
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6 space-y-6">
          {/* Header: Driver Info and Price */}
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-medium">
                  {ride.driver.name.charAt(0)}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-medium">{ride.driver.name}</span>
                  {ride.driver.verified && (
                    <Shield className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-gray-600 text-lg">{ride.driver.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                ${ride.price}
              </div>
              <div className="text-gray-500">per person</div>
            </div>
          </div>

          {/* Route Information */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <div className="font-medium text-gray-900">{ride.departure.location}</div>
                <div className="text-gray-500">{ride.departure.date} at {ride.departure.time}</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
              <div>
                <div className="font-medium text-gray-900">{ride.destination.location}</div>
                <div className="text-gray-500">Estimated arrival:</div>
              </div>
            </div>
          </div>

          {/* View Route Button */}
          <Button
            variant="ghost"
            onClick={() => setIsRouteMapOpen(true)}
            className="w-full text-blue-600 hover:text-blue-700"
          >
            View Route
          </Button>

          {/* Available Seats */}
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span>{ride.availableSeats} of {ride.totalSeats} seats available</span>
          </div>

          {/* Preferences */}
          <div className="flex flex-wrap gap-2">
            {ride.preferences.map((pref, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
              >
                {pref}
              </Badge>
            ))}
          </div>

          {/* Apply Button */}
          <Button 
            onClick={() => hasAvailableSeats ? onApply(ride) : onJoinWaitlist(ride)}
            className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white py-6 text-lg font-medium"
          >
            {hasAvailableSeats ? "Apply for Ride" : `Join Waitlist (${ride.waitlistCount})`}
          </Button>
        </CardContent>
      </Card>

      <RouteMapModal
        isOpen={isRouteMapOpen}
        onClose={() => setIsRouteMapOpen(false)}
        startPoint={{
          lat: ride.departure.coordinates[0],
          lng: ride.departure.coordinates[1],
          name: ride.departure.location,
        }}
        endPoint={{
          lat: ride.destination.coordinates[0],
          lng: ride.destination.coordinates[1],
          name: ride.destination.location,
        }}
      />
    </>
  );
};

export default RideCard;
