import React, { useRef, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { User, Star, Car, Shield } from "lucide-react";
import { getFromLocalStorage, updateModuleProperty } from "@/data/localStorage";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

export interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
}

export interface PreferencesInfo {
  emailNotifications: boolean;
  smsNotifications: boolean;
  showPhoneNumber: boolean;
  preferredLocation: string;
}

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    make: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",
  });
  const [preferences, setPreferences] = useState<PreferencesInfo>({
    emailNotifications: true,
    smsNotifications: true,
    showPhoneNumber: false,
    preferredLocation: "",
  });

  const fetchUserData = async () => {
    try {
      const data = getFromLocalStorage();
      const personalData = data?.userProfile.mockPersonalData as PersonalInfo;
      const personalDataVehicle = data?.userProfile
        .mockVehicleData as VehicleInfo;
      const personalDataPreferences = data?.userProfile
        .mockPreferences as PreferencesInfo;

      const personalDataFromLocal = {
        firstName: personalData.firstName,
        lastName: personalData.lastName,
        email: personalData.email,
        phone: personalData.phone,
        bio: personalData.bio,
      };

      const personalVehicleData = {
        make: personalDataVehicle.make,
        model: personalDataVehicle.model,
        year: personalDataVehicle.year,
        color: personalDataVehicle.color,
        licensePlate: personalDataVehicle.licensePlate,
      };

      const personalPreferences = {
        emailNotifications: personalDataPreferences.emailNotifications,
        smsNotifications: personalDataPreferences.smsNotifications,
        showPhoneNumber: personalDataPreferences.showPhoneNumber,
        preferredLocation: personalDataPreferences.preferredLocation,
      };

      setPersonalInfo(personalDataFromLocal);
      setVehicleInfo(personalVehicleData);
      setPreferences(personalPreferences);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVehicleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicleInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences((prev) => ({
      ...prev,
      preferredLocation: e.target.value,
    }));
  };

  const handlePreferenceChange = (name: keyof PreferencesInfo) => {
    if (typeof preferences[name] === "boolean") {
      setPreferences((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    }
  };

  const handleSavePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateModuleProperty(
        "userProfile",
        "mockPersonalData",
        personalInfo
      );
    } catch (error) {
      console.error("Error saving personal info:", error);
      alert("Failed to update personal information");
    }
  };

  const handleUpdateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateModuleProperty("userProfile", "mockVehicleData", vehicleInfo);
    } catch (error) {
      console.error("Error updating vehicle info:", error);
    }
  };

  const handleSaveAllChanges = async () => {
    try {
      await Promise.all([
        updateModuleProperty("userProfile", "mockPersonalData", personalInfo),
        updateModuleProperty("userProfile", "mockVehicleData", vehicleInfo),
        updateModuleProperty("userProfile", "mockPreferences", preferences),
      ]);
    } catch (error) {
      console.error("Error saving all changes:", error);
    }
  };

  const handleEditProfile = () => {
    // Trigger the hidden file input when button is clicked
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      // Here you would typically upload the image to your server
      // For now, we'll just create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Profile
          </h1>
          <p className="text-gray-600">Manage your profile and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden"
                  style={{
                    background: profileImage
                      ? `url(${profileImage}) center/cover no-repeat`
                      : "linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))",
                  }}
                >
                  {!profileImage && (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  John Doe
                </h2>
                <p className="text-gray-600 mb-4">john.doe@example.com</p>

                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    4.9 (127 reviews)
                  </span>
                </div>

                {/* Verification Badges */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Verified Profile</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <Car className="w-4 h-4" />
                    <span className="text-sm">Verified Driver</span>
                  </div>
                </div>

                <button
                  onClick={handleEditProfile}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-2"
                >
                  Edit Picture
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  View Public Profile
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">Jan 2023</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total rides</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response rate</span>
                  <span className="font-medium text-green-600">98%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Personal Information
              </h3>
              <form className="space-y-4" onSubmit={handleSavePersonalInfo}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={personalInfo.bio}
                    onChange={handlePersonalInfoChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>

            {/* Vehicle Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Vehicle Information
              </h3>
              <form className="space-y-4" onSubmit={handleUpdateVehicle}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Make
                    </label>
                    <input
                      type="text"
                      name="make"
                      value={vehicleInfo.make}
                      onChange={handleVehicleInfoChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={vehicleInfo.model}
                      onChange={handleVehicleInfoChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="text"
                      name="year"
                      value={vehicleInfo.year}
                      onChange={handleVehicleInfoChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={vehicleInfo.color}
                      onChange={handleVehicleInfoChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Plate
                  </label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={vehicleInfo.licensePlate}
                    onChange={handleVehicleInfoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Vehicle
                </button>
              </form>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Preferences
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Email Notifications
                    </p>
                    <p className="text-sm text-gray-600">
                      Receive emails about ride updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.emailNotifications}
                      onChange={() =>
                        handlePreferenceChange("emailNotifications")
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      SMS Notifications
                    </p>
                    <p className="text-sm text-gray-600">
                      Receive text messages for urgent updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.smsNotifications}
                      onChange={() =>
                        handlePreferenceChange("smsNotifications")
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Show Phone Number
                    </p>
                    <p className="text-sm text-gray-600">
                      Allow other users to see your phone number
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.showPhoneNumber}
                      onChange={() => handlePreferenceChange("showPhoneNumber")}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-gray-900">
                      Preferred Pickup/Dropoff Location
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Set your default location for rides
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={preferences.preferredLocation}
                      onChange={handleLocationChange}
                      placeholder="Enter your preferred location"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSaveAllChanges}
                    className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save all changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
