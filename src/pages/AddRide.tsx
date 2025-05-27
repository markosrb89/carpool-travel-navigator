
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddRide = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Ride</h1>
          <p className="text-gray-600">Offer a ride to fellow travelers</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-4xl">🚗</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Ride Form</h3>
            <p className="text-gray-600 mb-4">Ride creation form will be implemented in the next phase</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddRide;
