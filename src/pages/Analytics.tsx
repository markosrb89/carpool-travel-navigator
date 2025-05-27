
import React from 'react';
import Layout from '@/components/Layout';

const Analytics = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-gray-600">Track your travel statistics and savings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Rides</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-2xl">🚗</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+12% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Money Saved</p>
                <p className="text-3xl font-bold text-gray-900">$342</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-2xl">💰</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+8% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CO2 Saved</p>
                <p className="text-3xl font-bold text-gray-900">145kg</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-2xl">🌱</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+15% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Distance</p>
                <p className="text-3xl font-bold text-gray-900">1,240mi</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-2xl">📍</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">+22% from last month</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Rides Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Rides</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - Monthly rides data</p>
            </div>
          </div>

          {/* Savings Over Time Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Savings Over Time</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - Savings progression</p>
            </div>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Popular Routes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-gray-900">New York → Boston</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">8 trips</span>
                <span className="text-sm font-medium text-green-600">$120 saved</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Boston → Philadelphia</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">5 trips</span>
                <span className="text-sm font-medium text-green-600">$85 saved</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium text-gray-900">Philadelphia → Washington DC</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">3 trips</span>
                <span className="text-sm font-medium text-green-600">$45 saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
