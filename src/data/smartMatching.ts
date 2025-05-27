// Dummy data
const users = [
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

const rides = [
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

const leaderboard = [
  { userId: "u1", name: "Alice Driver", points: 120 },
  { userId: "u2", name: "Bob Passenger", points: 80 },
];

// Mock API helpers
const delay = (data, ms = 500) =>
  new Promise((res) => setTimeout(() => res(data), ms));

// Route analysis algorithm (dummy: returns drivers within 2km of passenger)
export function analyzeRoutes(passengerHome) {
  const matches = users.filter(
    (u) =>
      u.role === "driver" &&
      Math.abs(u.home.lat - passengerHome.lat) < 0.02 &&
      Math.abs(u.home.lng - passengerHome.lng) < 0.02
  );
  return delay(matches);
}

// Driver suggestion functionality
export function suggestDrivers(passengerId) {
  const passenger = users.find((u) => u.id === passengerId);
  return analyzeRoutes(passenger.home);
}

// ETA calculation with traffic (dummy: adds 10 min for "traffic")
export function calculateETA(start, end, time) {
  // Dummy: always 25 min with traffic
  return delay({ eta: "08:25", trafficDelay: 10 });
}

// Points system for ride participation
export function addRidePoints(userId, points) {
  const user = users.find((u) => u.id === userId);
  if (user) user.points += points;
  return delay({ userId, newPoints: user.points });
}

// Badges and achievements (dummy: badge for 100+ points)
export function checkBadges(userId) {
  const user = users.find((u) => u.id === userId);
  if (user && user.points >= 100 && !user.badges.includes("century-rider")) {
    user.badges.push("century-rider");
  }
  return delay(user.badges);
}

// Leaderboard functionality
export function getLeaderboard() {
  return delay(leaderboard);
}

// Sustainability integration (dummy: returns company CO2 saved)
export function getSustainabilityStats() {
  return delay({ co2SavedKg: 250 });
}

// Employee verification (dummy: checks email domain)
export function verifyEmployee(email) {
  return delay({ verified: email.endsWith("@company.com") });
}

// Single sign-on (dummy: always successful)
export function singleSignOn(token) {
  return delay({ success: true, userId: "u1" });
}

// Secure logout (dummy)
export function logout(userId) {
  return delay({ success: true });
}

// User profile data model
export function getUserProfile(userId) {
  return delay(users.find((u) => u.id === userId));
}

// Ride scheduling data model
export function getRidesForUser(userId) {
  return delay(
    rides.filter(
      (r) => r.driverId === userId || r.passengerIds.includes(userId)
    )
  );
}

// Application and waitlist processing (dummy: always approved)
export function applyForRide(rideId, passengerId) {
  const ride = rides.find((r) => r.id === rideId);
  if (ride && !ride.passengerIds.includes(passengerId)) {
    ride.passengerIds.push(passengerId);
  }
  return delay({ status: "approved" });
}

// Messaging data model (dummy)
const messages = [
  {
    id: "m1",
    from: "u2",
    to: "u1",
    rideId: "r1",
    content: "Hi, can I join?",
    timestamp: Date.now(),
  },
];
export function getMessages(rideId) {
  return delay(messages.filter((m) => m.rideId === rideId));
}
