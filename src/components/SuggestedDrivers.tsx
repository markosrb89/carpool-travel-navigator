import React from "react";
import { mockRides } from "@/data/mockRides";
import { Avatar } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";

interface Driver {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
  totalRides: number;
}

export function renderSuggestedDrivers() {
  // Extract unique drivers from mock rides
  const uniqueDrivers = mockRides.reduce<Driver[]>((drivers, ride) => {
    const existingDriver = drivers.find(
      (driver) => driver.id === ride.driver.id
    );
    if (!existingDriver) {
      drivers.push(ride.driver);
    }
    return drivers;
  }, []);

  // Sort drivers by rating (highest first)
  const sortedDrivers = [...uniqueDrivers].sort((a, b) => b.rating - a.rating);

  return (
    <div className="space-y-4 py-4">
      <h2 className="text-2xl font-bold text-gray-900">Suggested Drivers</h2>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedDrivers.map((driver) => (
          <Card key={driver.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <div className="bg-primary text-primary-foreground rounded-full w-full h-full flex items-center justify-center">
                      {driver.name.charAt(0)}
                    </div>
                  </Avatar>
                  <CardTitle className="text-lg">{driver.name}</CardTitle>
                </div>
                <div className="space-x-2">
                  {driver.totalRides >= 100 ? (
                    <Badge
                      variant="outline"
                      className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      🥇 Gold
                    </Badge>
                  ) : driver.totalRides >= 50 ? (
                    <Badge
                      variant="outline"
                      className="bg-gray-200 text-gray-700 border-gray-400">
                      🥈 Silver
                    </Badge>
                  ) : driver.totalRides >= 10 ? (
                    <Badge
                      variant="outline"
                      className="bg-amber-200 text-amber-800 border-amber-400">
                      🥉 Bronze
                    </Badge>
                  ) : null}
                  {driver.verified && (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{driver.rating.toFixed(1)}</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {
                  mockRides.filter((ride) => ride.driver.id === driver.id)
                    .length
                }{" "}
                rides available
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
