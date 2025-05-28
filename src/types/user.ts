export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  verified: boolean;
  rating: number;
  joinedDate: string;
  preferences: {
    smoking: boolean;
    pets: boolean;
    music: boolean;
    chatty: boolean;
  };
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
  };
} 