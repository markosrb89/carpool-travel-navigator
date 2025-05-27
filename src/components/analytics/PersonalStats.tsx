import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface RouteStats {
  route: string;
  trips: number;
  distance: number;
  costSaved: number;
  co2Saved: number;
}

interface PersonalStatsProps {
  totalTrips: number;
  totalDistance: number;
  totalSavings: number;
  totalCo2Saved: number;
  frequentRoutes: RouteStats[];
}

export function PersonalStats({
  totalTrips,
  totalDistance,
  totalSavings,
  totalCo2Saved,
  frequentRoutes,
}: PersonalStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">Total Trips</div>
            <div className="text-2xl font-bold">{totalTrips}</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600 font-medium">Distance Covered</div>
            <div className="text-2xl font-bold">{totalDistance} mi</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="text-sm text-yellow-600 font-medium">Money Saved</div>
            <div className="text-2xl font-bold">${totalSavings}</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-600 font-medium">CO2 Saved</div>
            <div className="text-2xl font-bold">{totalCo2Saved} kg</div>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead className="text-right">Trips</TableHead>
                <TableHead className="text-right">Distance (mi)</TableHead>
                <TableHead className="text-right">Savings ($)</TableHead>
                <TableHead className="text-right">CO2 Saved (kg)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {frequentRoutes.map((route, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{route.route}</TableCell>
                  <TableCell className="text-right">{route.trips}</TableCell>
                  <TableCell className="text-right">{route.distance}</TableCell>
                  <TableCell className="text-right">${route.costSaved}</TableCell>
                  <TableCell className="text-right">{route.co2Saved}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}