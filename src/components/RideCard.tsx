import React, { useState } from "react";
import { Ride } from "@/types/ride";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Star, Shield } from "lucide-react";
import RouteMapDialog from "./RouteMapDialog";

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

  const handleViewRoute = () => {
    setIsRouteMapOpen(true);
  };

  if (isCompact) {
    return (
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {ride.driver.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-sm">
                    {ride.driver.name}
                  </span>
                  {ride.driver.verified && (
                    <Shield className="w-4 h-4 text-blue-500" />
                  )}
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">
                      {ride.driver.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span className="truncate">{ride.departure.location}</span>
                </div>
                <span>→</span>
                <span className="truncate">{ride.destination.location}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{ride.departure.time}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">
                  ${ride.price}
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>
                    {ride.availableSeats}/{ride.totalSeats}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                {hasAvailableSeats ? (
                  <Button size="sm" onClick={() => onApply(ride)}>
                    Apply
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onJoinWaitlist(ride)}>
                    Waitlist ({ride.waitlistCount})
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={handleViewRoute}>
                  View Route
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <RouteMapDialog
          isOpen={isRouteMapOpen}
          onClose={() => setIsRouteMapOpen(false)}
          ride={ride}
        />
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {ride.driver.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{ride.driver.name}</span>
                {ride.driver.verified && (
                  <Shield className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600">
                  {ride.driver.rating}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              ${ride.price}
            </div>
            <div className="text-sm text-gray-600">per person</div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium">{ride.departure.location}</div>
              <div className="text-sm text-gray-600">
                {ride.departure.date} at {ride.departure.time}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium">{ride.destination.location}</div>
              <div className="text-sm text-gray-600">
                Estimated arrival: {ride.destination.time}
              </div>
            </div>
          </div>
          <div>
            <Button
              variant="ghost"
              onClick={handleViewRoute}
              className="flex-1">
              View Route
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>
                {ride.availableSeats} of {ride.totalSeats} seats available
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{ride.duration}</span>
            </div>
          </div>
        </div>

        {ride.description && (
          <p className="text-gray-600 text-sm mb-4">{ride.description}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {ride.preferences.map((pref, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {pref}
            </Badge>
          ))}
        </div>

        <div className="flex space-x-2">
          {hasAvailableSeats ? (
            <Button onClick={() => onApply(ride)} className="flex-1">
              Apply for Ride
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => onJoinWaitlist(ride)}
              className="flex-1">
              Join Waitlist ({ride.waitlistCount})
            </Button>
          )}
        </div>

        <RouteMapDialog
          isOpen={isRouteMapOpen}
          onClose={() => setIsRouteMapOpen(false)}
          ride={ride}
        />
      </CardContent>
    </Card>
  );
};

export default RideCard;
