import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  MessageSquare,
  LogOut,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "../context/AuthContext";
import { getFromLocalStorage } from "@/data/localStorage";
import { PersonalInfo } from "@/pages/Profile";

const Header = () => {
  const { logout, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const data = getFromLocalStorage();
    const personalData = data?.userProfile.mockPersonalData as PersonalInfo;
    if (personalData?.profileImage) {
      setProfileImage(personalData.profileImage);
    }
  }, []);

  const navigationItems = [
    { name: "Home", href: "/" },
    ...(isAuthenticated ? [{ name: "My Rides", href: "/my-rides" }] : []),
    { name: "Analytics", href: "/analytics" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      variant: "success",
    });
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CarPool</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                  isActiveRoute(item.href)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Profile Dropdown or Login */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-2"
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
                    style={{
                      background: profileImage 
                        ? `url(${profileImage}) center/cover no-repeat` 
                        : 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))'
                    }}
                  >
                    {!profileImage && <User className="w-4 h-4 text-white" />}
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link
                        to="/messages"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <MessageSquare className="w-4 h-4 mr-3" />
                        Messages
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        User Profile
                      </Link>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isAuthenticated && (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 p-2 rounded-md"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    isActiveRoute(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Profile Links */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 mb-2">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden mx-auto"
                        style={{
                          background: profileImage 
                            ? `url(${profileImage}) center/cover no-repeat` 
                            : 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))'
                        }}
                      >
                        {!profileImage && <User className="w-6 h-6 text-white" />}
                      </div>
                    </div>
                    <Link
                      to="/messages"
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MessageSquare className="w-5 h-5 mr-3" />
                      Messages
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5 mr-3" />
                      User Profile
                    </Link>
                    <button
                      className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LogIn className="w-5 h-5 mr-3" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md ml-3 mr-3"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
