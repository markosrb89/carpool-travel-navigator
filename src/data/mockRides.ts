import { Ride, StoredDataRide } from "@/types/ride";

export const allRides: Ride[] = [
  {
    id: "1",
    driver: {
      id: "driver1",
      name: "Sarah Johnson",
      rating: 4.8,
      verified: true,
      totalRides: 150,
    },
    departure: {
      location: "Downtown Seattle, WA",
      coordinates: [47.6062, -122.3321],
      time: "08:00",
      date: "2024-01-15",
    },
    destination: {
      location: "Microsoft Campus, Redmond, WA",
      coordinates: [47.6398, -122.1286],
      time: "08:45",
    },
    availableSeats: 2,
    totalSeats: 3,
    price: 12,
    distance: 25,
    duration: "45 min",
    description: "Daily commute to Microsoft. Non-smoking, music okay.",
    preferences: ["Non-smoking", "Music okay", "Punctual"],
    recurring: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    waitlistCount: 1,
  },
  {
    id: "2",
    driver: {
      id: "driver2",
      name: "Mike Chen",
      rating: 4.9,
      verified: true,
      totalRides: 52,
    },
    departure: {
      location: "Capitol Hill, Seattle, WA",
      coordinates: [47.6205, -122.3212],
      time: "17:30",
      date: "2024-01-15",
    },
    destination: {
      location: "Bellevue Downtown, WA",
      coordinates: [47.6101, -122.2015],
      time: "18:15",
    },
    availableSeats: 1,
    totalSeats: 3,
    price: 15,
    distance: 18,
    duration: "45 min",
    description: "Evening ride to Bellevue. Air conditioning, quiet ride.",
    preferences: ["Quiet ride", "AC", "No food"],
    waitlistCount: 0,
  },
  {
    id: "3",
    driver: {
      id: "driver3",
      name: "Emma Rodriguez",
      rating: 4.7,
      verified: false,
      totalRides: 12,
    },
    departure: {
      location: "University District, Seattle, WA",
      coordinates: [47.6587, -122.3138],
      time: "09:15",
      date: "2024-01-16",
    },
    destination: {
      location: "Amazon Spheres, Seattle, WA",
      coordinates: [47.6154, -122.3385],
      time: "09:45",
    },
    availableSeats: 3,
    totalSeats: 4,
    price: 8,
    distance: 12,
    duration: "30 min",
    description: "Morning ride to Amazon. Pet-friendly car.",
    preferences: ["Pet-friendly", "Conversation welcome"],
    waitlistCount: 2,
  },
];

export const upcomingRides: StoredDataRide[] = [
  {
    date: "Today",
    time: "5:30 PM",
    departure: "Divcibare",
    destination: "Belgrade",
    name: "Petar Petrovic",
    status: "Confirmed",
    price: "12 EUR",
  },
];

export const pastRides: StoredDataRide[] = [
  {
    date: "Yesterday",
    time: "7:30 AM",
    departure: "Belgrade",
    destination: "Divcibare",
    name: "Petar Petrovic",
    status: "Confirmed",
    price: "15 EUR",
  },
];

export const myOffers = [
  // {
  //   date: "Yesterday",
  //   time: "7:30 AM",
  //   departure: "Belgrade",
  //   destination: "Divcibare",
  //   status: "Recurring",
  //   price: "1000 din",
  //   seats: "3/3 seats filled",
  // },
];
