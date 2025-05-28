export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  rating: number;
  verified: boolean;
  totalRides: number;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  };
  preferences: {
    smoking: boolean;
    pets: boolean;
    music: boolean;
    chatty: boolean;
  };
}

export const mockUser: User = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  phoneNumber: "+1234567890",
  rating: 4.8,
  verified: true,
  totalRides: 42,
  vehicleInfo: {
    make: "Toyota",
    model: "Camry",
    year: 2020,
    color: "Silver",
    licensePlate: "ABC123",
  },
  preferences: {
    smoking: false,
    pets: true,
    music: true,
    chatty: true,
  },
}; 