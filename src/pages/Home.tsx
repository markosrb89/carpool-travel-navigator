import React, { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import RideCard from "@/components/RideCard";
import SearchFilters from "@/components/SearchFilters";
import RideApplicationDialog from "@/components/RideApplicationDialog";
import ViewToggle from "@/components/ViewToggle";
import FloatingAddButton from "@/components/FloatingAddButton";

import {
  Ride,
  ViewMode,
  SearchFilters as SearchFiltersType,
} from "@/types/ride";
import { useToast } from "@/hooks/use-toast";
import { saveToLocalStorage, getFromLocalStorage } from "@/data/localStorage";
import {useNavigate} from "react-router-dom";

interface ApplicationData {
  message: string;
  contactInfo: string;
  preferences?: string[];
}

const Home = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [isWaitlistMode, setIsWaitlistMode] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const saveMockedDataToLocalStorage = async () => {
      saveToLocalStorage();
    };
    saveMockedDataToLocalStorage();
  }, []);

  const mockRides = getFromLocalStorage().mockRides.mockRides ?? [];

  const [filters, setFilters] = useState<SearchFiltersType>({
    query: "",
    departure: "",
    destination: "",
    date: "",
    timeRange: {
      start: "",
      end: "",
    },
    maxDistance: 50,
    driverName: "",
  });

  // Filter rides based on search criteria
  const filteredRides = useMemo(() => {
    return mockRides.filter((ride) => {
      // Text search
      if (filters.query) {
        const searchText = filters.query.toLowerCase();
        const searchableText = [
          ride.departure.location,
          ride.destination.location,
          ride.driver.name,
          ride.description || "",
          ...ride.preferences,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(searchText)) return false;
      }

      // Location filters
      if (
        filters.departure &&
        !ride.departure.location
          .toLowerCase()
          .includes(filters.departure.toLowerCase())
      ) {
        return false;
      }

      if (
        filters.destination &&
        !ride.destination.location
          .toLowerCase()
          .includes(filters.destination.toLowerCase())
      ) {
        return false;
      }

      // Driver name filter
      if (
        filters.driverName &&
        !ride.driver.name
          .toLowerCase()
          .includes(filters.driverName.toLowerCase())
      ) {
        return false;
      }

      // Date filter
      if (filters.date && ride.departure.date !== filters.date) {
        return false;
      }

      // Time range filter
      if (
        filters.timeRange.start &&
        ride.departure.time < filters.timeRange.start
      ) {
        return false;
      }

      if (
        filters.timeRange.end &&
        ride.departure.time > filters.timeRange.end
      ) {
        return false;
      }

      // Distance filter
      if (ride.distance > filters.maxDistance) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleApplyForRide = (ride: Ride) => {
    setSelectedRide(ride);
    setIsWaitlistMode(false);
    setIsApplicationDialogOpen(true);
  };

  const handleJoinWaitlist = (ride: Ride) => {
    setSelectedRide(ride);
    setIsWaitlistMode(true);
    setIsApplicationDialogOpen(true);
  };

  const handleSubmitApplication = (applicationData: ApplicationData) => {
    console.log("Application submitted:", applicationData);
    toast({
      title: isWaitlistMode ? "Added to Waitlist" : "Application Submitted",
      description: isWaitlistMode
        ? "You've been added to the waitlist. We'll notify you if a seat becomes available."
        : "Your ride application has been submitted. The driver will review and respond soon.",
    });
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      departure: "",
      destination: "",
      date: "",
      timeRange: {
        start: "",
        end: "",
      },
      maxDistance: 50,
      driverName: "",
    });
  };

  const renderRidesList = () => {
    if (viewMode === "map") {
      return (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Map View</h3>
          <p className="text-gray-500">Map integration coming soon!</p>
        </div>
      );
    }

    if (filteredRides.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-4xl">🔍</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No rides found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search filters or check back later
          </p>
        </div>
      );
    }

    const gridClass =
      viewMode === "grid"
        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        : "space-y-4";

    return (
      <div className={gridClass}>
        {filteredRides.map((ride) => (
          <RideCard
            key={ride.id}
            ride={ride}
            onApply={handleApplyForRide}
            onJoinWaitlist={handleJoinWaitlist}
            isCompact={viewMode === "list"}
          />
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Share Your Journey,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Save Money
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect with fellow travelers, share rides, and make your commute
            more affordable and sustainable.
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Find a ride
            </h2>
            <p className="text-gray-600">Find your perfect ride match</p>
          </div>
          <div>
            <button
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => navigate('/add-ride')}
            >
              Offer a Ride
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
        />

        {/* View Controls */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Rides ({filteredRides.length})
            </h2>
          </div>
          <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
        </div>

        {/* Rides List */}
        {renderRidesList()}

        {/* Floating Add Button */}
        <FloatingAddButton />

        {/* Application Dialog */}
        <RideApplicationDialog
          ride={selectedRide}
          isOpen={isApplicationDialogOpen}
          onClose={() => setIsApplicationDialogOpen(false)}
          onSubmit={handleSubmitApplication}
          isWaitlist={isWaitlistMode}
        />
      </div>
    </Layout>
  );
};

export default Home;
