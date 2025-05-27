
import React from 'react';
import Layout from '@/components/Layout';

const MyRides = () => {
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
            <button className="border-b-2 border-blue-600 text-blue-600 py-2 px-1 font-medium text-sm">
              Upcoming Rides
            </button>
            <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 font-medium text-sm">
              Past Rides
            </button>
            <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1 font-medium text-sm">
              My Offers
            </button>
          </nav>
        </div>

        {/* Rides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Ride Card */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Confirmed
                </span>
                <span className="text-sm text-gray-500">Today, 2:30 PM</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-900 font-medium">New York, NY</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-900 font-medium">Boston, MA</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">John Doe</span>
                </div>
                <span className="text-lg font-bold text-green-600">$25</span>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Add New Ride Card */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors duration-200">
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
        </div>

        {/* Empty State (when no rides) */}
        <div className="text-center py-12 hidden">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400 text-4xl">🚗</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No rides yet</h3>
          <p className="text-gray-600 mb-4">Start by searching for a ride or offering one</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Find a Ride
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MyRides;
