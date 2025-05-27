import React from "react";

interface UserCredentials {
  email: string;
  password: string;
}

const AUTH_STORAGE_KEY = "user_auth";

/**
 * Hook for managing user authentication state
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(() => {
    return !!localStorage.getItem(AUTH_STORAGE_KEY);
  });

  const storeUserData = (
    credentials: UserCredentials & { name?: string }
  ): void => {
    try {
      const encryptedPassword = btoa(credentials.password);
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          email: credentials.email,
          password: encryptedPassword,
          name: credentials.name,
        })
      );
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error storing user data:", error);
      setIsAuthenticated(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      storeUserData({ email, password });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      storeUserData({ name, email, password });
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      setIsAuthenticated(false);
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return {
    isAuthenticated,
    login,
    register,
    logout,
  };
}
