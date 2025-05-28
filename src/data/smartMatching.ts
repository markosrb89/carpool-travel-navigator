// Dummy data
export const users = [
  {
    id: "u1",
    name: "Alice Driver",
    email: "alice@company.com",
    role: "driver",
    points: 120,
    badges: ["eco-starter"],
    sustainabilityScore: 85,
    vehicle: { make: "Toyota", model: "Prius", capacity: 3 },
    home: { lat: 37.77, lng: -122.41 },
    work: { lat: 37.79, lng: -122.39 },
    schedule: { departure: "08:00", return: "17:00" },
  },
  {
    id: "u2",
    name: "Bob Passenger",
    email: "bob@company.com",
    role: "passenger",
    points: 80,
    badges: [],
    sustainabilityScore: 60,
    home: { lat: 37.76, lng: -122.43 },
    work: { lat: 37.79, lng: -122.39 },
    schedule: { departure: "08:10", return: "17:10" },
  },
];

export const rides = [
  {
    id: "r1",
    driverId: "u1",
    passengerIds: ["u2"],
    start: { lat: 37.77, lng: -122.41 },
    end: { lat: 37.79, lng: -122.39 },
    departure: "08:00",
    eta: "08:25",
    status: "scheduled",
  },
];

export const leaderboard = [
  { userId: "u1", name: "Alice Driver", points: 120 },
  { userId: "u2", name: "Bob Passenger", points: 80 },
];
