import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyRides from "./pages/MyRides";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import AddRide from "./pages/AddRide";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Leaderboard from "./pages/Leaderboard";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import React from "react";
import { getFromLocalStorage, saveToLocalStorage } from "./data/localStorage";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-ride" element={<AddRide />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/leaderboard" element={<Leaderboard />} />

      {/* Authenticated Routes - only rendered if user is authenticated */}
      {isAuthenticated && <Route path="/my-rides" element={<MyRides />} />}

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  React.useEffect(() => {
    const saveMockedDataToLocalStorage = async () => {
      saveToLocalStorage();
    };
    saveMockedDataToLocalStorage();
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
