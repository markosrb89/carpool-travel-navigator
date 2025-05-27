export interface Driver {
  id: string;
  name: string;
  rating: number;
  verified: boolean;
  totalRides: number;
  profileImage?: string;
  joinedDate: string;
  co2Saved: number;
}

export const mockDrivers: Driver[] = [
  {
    id: "driver1",
    name: "Sarah Johnson",
    rating: 4.8,
    verified: true,
    totalRides: 150,
    profileImage: "/avatars/sarah.jpg",
    joinedDate: "2022-03-15",
    co2Saved: 750,
  },
  {
    id: "driver2",
    name: "Mike Chen",
    rating: 4.9,
    verified: true,
    totalRides: 52,
    profileImage: "/avatars/mike.jpg",
    joinedDate: "2023-01-22",
    co2Saved: 260,
  },
  {
    id: "driver3",
    name: "Emma Rodriguez",
    rating: 4.7,
    verified: false,
    totalRides: 12,
    profileImage: "/avatars/emma.jpg",
    joinedDate: "2023-09-05",
    co2Saved: 60,
  },
  {
    id: "driver4",
    name: "James Wilson",
    rating: 5.0,
    verified: true,
    totalRides: 88,
    profileImage: "/avatars/james.jpg",
    joinedDate: "2022-11-30",
    co2Saved: 440,
  },
  {
    id: "driver5",
    name: "Linda Park",
    rating: 4.6,
    verified: true,
    totalRides: 210,
    profileImage: "/avatars/linda.jpg",
    joinedDate: "2021-08-12",
    co2Saved: 1050,
  },
  {
    id: "driver6",
    name: "Robert Garcia",
    rating: 4.9,
    verified: true,
    totalRides: 175,
    profileImage: "/avatars/robert.jpg",
    joinedDate: "2022-02-08",
    co2Saved: 875,
  },
  {
    id: "driver7",
    name: "Alexandra Kim",
    rating: 4.8,
    verified: true,
    totalRides: 95,
    profileImage: "/avatars/alex.jpg",
    joinedDate: "2022-07-19",
    co2Saved: 475,
  },
  {
    id: "driver8",
    name: "Thomas Brown",
    rating: 4.7,
    verified: false,
    totalRides: 42,
    profileImage: "/avatars/thomas.jpg",
    joinedDate: "2023-03-27",
    co2Saved: 210,
  },
  {
    id: "driver9",
    name: "Sophia Martinez",
    rating: 4.8,
    verified: true,
    totalRides: 128,
    profileImage: "/avatars/sophia.jpg",
    joinedDate: "2022-05-14",
    co2Saved: 640,
  },
  {
    id: "driver10",
    name: "David Lee",
    rating: 4.5,
    verified: true,
    totalRides: 67,
    profileImage: "/avatars/david.jpg",
    joinedDate: "2023-02-01",
    co2Saved: 335,
  },
];
