import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogHeader } from '@/components/ui/dialog';
import AddRideForm from '@/components/ride-form/AddRideForm';
import { getFromLocalStorage } from '@/data/localStorage';
import { Ride } from '@/types/ride';
import RideCard from '@/components/RideCard';
import { mockUser } from '@/data/mockUser';

const MyRides = () => {
  const [isAddOpen, setAddOpen] = useState(false);
  const [rides, setRides] = useState<Ride[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'offers'>('upcoming');

  const loadRides = () => {
    const localStorageData = getFromLocalStorage();
    const allRides = (localStorageData?.mockRides?.mockRides as Ride[]) || [];
    
    // Filter rides where the user is the driver
    const userRides = allRides.filter(ride => ride.driver.id === mockUser.id);
    setRides(userRides);
  };

  useEffect(() => {
    loadRides();
  }, []);

  const handleViewDetails = (ride: Ride) => {
    // TODO: Implement ride details view
    console.log('View details for ride:', ride);
  };

  const handleFormSuccess = () => {
    loadRides(); // Reload rides after successful submission
  };

  const renderRides = () => {
    if (rides.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-4xl">🚗</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No rides yet</h3>
          <p className="text-gray-600 mb-4">Start by offering a ride</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rides.map((ride) => (
          <RideCard
            key={ride.id}
            ride={ride}
            onApply={() => handleViewDetails(ride)}
            onJoinWaitlist={() => handleViewDetails(ride)}
            isCompact
          />
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Rides</h1>
          <p className="text-gray-600">Manage your upcoming and past rides</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button 
              className={`border-b-2 py-2 px-1 font-medium text-sm ${
                activeTab === 'upcoming' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Rides
            </button>
            <button 
              className={`border-b-2 py-2 px-1 font-medium text-sm ${
                activeTab === 'past' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Past Rides
            </button>
            <button 
              className={`border-b-2 py-2 px-1 font-medium text-sm ${
                activeTab === 'offers' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('offers')}
            >
              My Offers
            </button>
          </nav>
        </div>

        <div className="space-y-8">
          {/* Rides Grid */}
          {renderRides()}

          {/* Add New Ride Card */}
          <Dialog open={isAddOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors duration-200 cursor-pointer">
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 text-2xl">+</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Add New Ride</h3>
                  <p className="text-gray-600 mb-4">Offer a ride or search for one</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            </DialogTrigger>

            <DialogPortal>
              <DialogOverlay className="fixed inset-0 bg-black/50 z-50" />
              <DialogContent 
                className="fixed top-1/2 left-1/2 w-full max-w-2xl
                          max-h-[90vh]         
                          -translate-x-1/2 -translate-y-1/2
                          overflow-y-auto   
                          rounded-lg bg-white p-6
                          shadow-lg
                          z-50"
              >
                <DialogClose asChild>
                  <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    ✕
                  </button>
                </DialogClose>

                <DialogTitle className="text-xl font-bold mb-2">Create a New Ride</DialogTitle>
                <DialogDescription className="text-gray-600 mb-6">
                  Fill out the details below to offer your ride.
                </DialogDescription>

                <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                  <AddRideForm 
                    onCancel={() => setAddOpen(false)}
                    onSuccess={handleFormSuccess}
                  />
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
};

export default MyRides;
