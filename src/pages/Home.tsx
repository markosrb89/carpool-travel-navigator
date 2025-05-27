
import React from 'react';
import Layout from '@/components/Layout';

const Home = () => {
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
            Connect with fellow travelers, share rides, and make your commute more affordable and sustainable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Find a Ride
            </button>
            <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Offer a Ride
            </button>
          </div>
        </div>

        {/* Quick Search */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Search</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <input
                type="text"
                placeholder="Departure city"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <input
                type="text"
                placeholder="Destination city"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 text-2xl">🚗</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Booking</h3>
            <p className="text-gray-600">Book your ride in just a few clicks. Quick, simple, and secure.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Money</h3>
            <p className="text-gray-600">Split the cost of travel and save up to 70% compared to other transport.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Go Green</h3>
            <p className="text-gray-600">Reduce your carbon footprint by sharing rides with fellow travelers.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
