import React from 'react';
import Layout from '@/components/Layout';
import { TimeFilter, type TimeRange } from '@/components/analytics/TimeFilter';
import { Leaderboard } from '@/components/analytics/Leaderboard';
import { ImpactMetrics } from '@/components/analytics/ImpactMetrics';
import { Achievements } from '@/components/analytics/Achievements';
import { PersonalStats } from '@/components/analytics/PersonalStats';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = React.useState<TimeRange>('month');

  // Mock data - In a real app, this would come from your backend
  const mockChartData = [
    { name: 'Jan', rides: 4, savings: 120 },
    { name: 'Feb', rides: 6, savings: 180 },
    { name: 'Mar', rides: 8, savings: 240 },
    { name: 'Apr', rides: 12, savings: 360 },
  ];

  const mockLeaderboardData = [
    { id: '1', name: 'John Doe', score: 24, rank: 1, badge: 'Top Driver' },
    { id: '2', name: 'Jane Smith', score: 20, rank: 2 },
    { id: '3', name: 'Bob Johnson', score: 18, rank: 3 },
  ];

  const mockImpactMetrics = [
    {
      label: 'CO2 Savings',
      value: 145,
      target: 200,
      unit: 'kg',
      icon: '🌱'
    },
    {
      label: 'Cost Savings',
      value: 342,
      target: 500,
      unit: '$',
      icon: '💰'
    },
    {
      label: 'Parking Spots Saved',
      value: 12,
      target: 20,
      unit: 'spots',
      icon: '🅿️'
    },
    {
      label: 'Total Distance Shared',
      value: 1240,
      target: 2000,
      unit: 'mi',
      icon: '📍'
    }
  ];

  const mockAchievements = [
    {
      id: '1',
      name: 'Early Adopter',
      description: 'One of the first 100 users',
      icon: '🌟',
      earnedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Road Warrior',
      description: 'Complete 50 trips',
      icon: '🛣️',
      progress: 24,
      total: 50
    },
    {
      id: '3',
      name: 'Earth Saver',
      description: 'Save 1000kg of CO2',
      icon: '🌍',
      progress: 145,
      total: 1000
    },
    {
      id: '4',
      name: 'Community Leader',
      description: 'Help 20 different people',
      icon: '👥',
      progress: 15,
      total: 20
    }
  ];

  const mockPersonalStats = {
    totalTrips: 24,
    totalDistance: 1240,
    totalSavings: 342,
    totalCo2Saved: 145,
    frequentRoutes: [
      {
        route: 'New York → Boston',
        trips: 8,
        distance: 480,
        costSaved: 120,
        co2Saved: 60
      },
      {
        route: 'Boston → Philadelphia',
        trips: 5,
        distance: 350,
        costSaved: 85,
        co2Saved: 45
      },
      {
        route: 'Philadelphia → DC',
        trips: 3,
        distance: 180,
        costSaved: 45,
        co2Saved: 25
      }
    ]
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
            <p className="text-gray-600">Track your carpool impact and statistics</p>
          </div>
          <TimeFilter value={timeRange} onChange={setTimeRange} />
        </div>

        <Tabs defaultValue="personal" className="space-y-8">
          <TabsList>
            <TabsTrigger value="personal">Personal Analytics</TabsTrigger>
            <TabsTrigger value="company">Company Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-8">
            <PersonalStats {...mockPersonalStats} />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Your Rides Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="rides" stroke="#2563eb" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Cost Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="savings" stroke="#16a34a" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Achievements achievements={mockAchievements} />
          </TabsContent>

          <TabsContent value="company" className="space-y-8">
            {/* Impact Metrics */}
            <ImpactMetrics metrics={mockImpactMetrics} />

            {/* Leaderboards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Leaderboard
                title="Most Rides Offered"
                entries={mockLeaderboardData}
                metric="rides"
              />
              <Leaderboard
                title="Most Rides Taken"
                entries={mockLeaderboardData}
                metric="rides"
              />
              <Leaderboard
                title="Highest Impact"
                entries={mockLeaderboardData}
                metric="kg CO2"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
