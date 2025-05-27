import { PersonalInfo, VehicleInfo, PreferencesInfo } from '../pages/Profile';

export const mockPersonalData: PersonalInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: "I'm a frequent traveler who loves meeting new people and sharing rides. Always punctual and enjoy good conversation!"
};

export const mockVehicleData: VehicleInfo = {
    make: 'Toyota',
    model: 'Camry',
    year: '2020',
    color: 'Silver',
    licensePlate: 'ABC-1234'
  };

  export const mockPreferences: PreferencesInfo = {
    emailNotifications: true,
    smsNotifications: true,
    showPhoneNumber: false,
    preferredLocation: '123 Main St, City, Country'
  };