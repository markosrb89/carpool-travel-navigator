import React, { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { mockDrivers, Driver } from "@/data/mockDrivers";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";

type SortField = "rating" | "totalRides" | "co2Saved" | "score";
type SortOrder = "asc" | "desc";

interface ScoredDriver extends Driver {
  score: number;
}

const Leaderboard = () => {
  const [sortField, setSortField] = useState<SortField>("score");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const calculateScore = (driver: Driver): number => {
    // Normalize each metric to a scale of 0-100 and then combine them
    // Rating: Scale 0-5 to 0-100
    const ratingScore = (driver.rating / 5) * 100;

    // Total Rides: Use a logarithmic scale to reduce the impact of very high numbers
    // log10(x+1) * 20 will give ~0 for 0 rides, ~20 for 10 rides, ~40 for 100 rides, ~60 for 1000 rides
    const ridesScore = Math.min(Math.log10(driver.totalRides + 1) * 20, 100);

    // CO2 Saved: Similar logarithmic scale
    const co2Score = Math.min(Math.log10(driver.co2Saved + 1) * 20, 100);

    // Combine scores with different weights
    // Rating has higher weight since it's a direct measure of driver quality
    return Math.round(ratingScore * 0.5 + ridesScore * 0.25 + co2Score * 0.25);
  };

  const scoredDrivers: ScoredDriver[] = useMemo(() => {
    return mockDrivers.map((driver) => ({
      ...driver,
      score: calculateScore(driver),
    }));
  }, []);

  const sortedDrivers = useMemo(() => {
    return [...scoredDrivers].sort((a, b) => {
      if (sortField === "score") {
        return sortOrder === "asc" ? a.score - b.score : b.score - a.score;
      } else {
        return sortOrder === "asc"
          ? Number(a[sortField as keyof Driver]) -
              Number(b[sortField as keyof Driver])
          : Number(b[sortField as keyof Driver]) -
              Number(a[sortField as keyof Driver]);
      }
    });
  }, [sortField, sortOrder, scoredDrivers]);

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;

    return sortOrder === "asc" ? (
      <ChevronUpIcon className="h-4 w-4 inline ml-1" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 inline ml-1" />
    );
  };

  const getOrdinalSuffix = (i: number) => {
    const j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">
            Top drivers based on ride ratings, completed rides, and
            environmental impact.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("rating")}>
                  Rating {renderSortIcon("rating")}
                </th>
                <th
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("totalRides")}>
                  Total Rides {renderSortIcon("totalRides")}
                </th>
                <th
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("co2Saved")}>
                  CO2 Saved {renderSortIcon("co2Saved")}
                </th>
                <th
                  className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("score")}>
                  Total Score {renderSortIcon("score")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedDrivers.map((driver, index) => (
                <tr key={driver.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {driver.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {driver.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {driver.totalRides}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {driver.co2Saved}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {driver.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
