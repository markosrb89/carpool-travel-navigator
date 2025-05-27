
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type TabType = 'upcoming' | 'past' | 'offers';

const MyRides = () => {
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Upcoming Ride Card */}
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
                <Button className="w-full mt-4">
                  View Details
                </Button>
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
                <Button onClick={() => navigate('/add-ride')}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        );

      case 'past':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Past Ride Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Completed
                  </span>
                  <span className="text-sm text-gray-500">Dec 15, 2024</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-900 font-medium">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-900 font-medium">Los Angeles, CA</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">Sarah Smith</span>
                  </div>
                  <span className="text-lg font-bold text-gray-600">$45</span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    Rate Driver
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Completed
                  </span>
                  <span className="text-sm text-gray-500">Dec 10, 2024</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-900 font-medium">Austin, TX</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-900 font-medium">Dallas, TX</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-600">Mike Johnson</span>
                  </div>
                  <span className="text-lg font-bold text-gray-600">$30</span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    Rate Driver
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'offers':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Offered Ride Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Active
                  </span>
                  <span className="text-sm text-gray-500">Tomorrow, 8:00 AM</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-900 font-medium">Chicago, IL</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-900 font-medium">Milwaukee, WI</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">2/4 seats filled</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">$20</span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    Edit Ride
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Applications
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Recurring
                  </span>
                  <span className="text-sm text-gray-500">Mon-Fri, 7:30 AM</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-900 font-medium">Downtown</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-900 font-medium">Tech Campus</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">3/3 seats filled</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">$15</span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    Manage
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Messages
                  </Button>
                </div>
              </div>
            </div>

            {/* Offer New Ride Card */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-dashed border-green-300 hover:border-green-400 transition-colors duration-200">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">+</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Offer New Ride</h3>
                <p className="text-gray-600 mb-4">Share your journey with others</p>
                <Button onClick={() => navigate('/add-ride')} className="bg-green-600 hover:bg-green-700">
                  Offer Ride
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getEmptyState = () => {
    const states = {
      upcoming: {
        icon: '🚗',
        title: 'No upcoming rides',
        description: 'Start by searching for a ride or offering one',
        buttonText: 'Find a Ride',
        buttonAction: () => navigate('/')
      },
      past: {
        icon: '📋',
        title: 'No past rides',
        description: 'Your completed rides will appear here',
        buttonText: 'Find a Ride',
        buttonAction: () => navigate('/')
      },
      offers: {
        icon: '🚙',
        title: 'No ride offers',
        description: 'Start offering rides to help others commute',
        buttonText: 'Offer a Ride',
        buttonAction: () => navigate('/add-ride')
      }
    };

    const state = states[activeTab];
    
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-400 text-4xl">{state.icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{state.title}</h3>
        <p className="text-gray-600 mb-4">{state.description}</p>
        <Button onClick={state.buttonAction}>
          {state.buttonText}
        </Button>
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
              onClick={() => setActiveTab('upcoming')}
              className={`border-b-2 py-2 px-1 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Rides
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`border-b-2 py-2 px-1 font-medium text-sm ${
                activeTab === 'past'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Past Rides
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`border-b-2 py-2 px-1 font-medium text-sm ${
                activeTab === 'offers'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Offers
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </Layout>
  );
};

export default MyRides;
