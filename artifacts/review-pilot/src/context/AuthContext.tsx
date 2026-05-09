import React, { createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "wouter";

type Role = "guest" | "owner" | "admin";

interface User {
  name: string;
  email: string;
  avatar: string;
  businessName: string;
}

interface AuthContextType {
  role: Role;
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

const ownerUser: User = {
  name: "Riya Kapoor",
  email: "riya@glowsalon.com",
  avatar: "RK",
  businessName: "Glow Salon",
};

const adminUser: User = {
  name: "Admin User",
  email: "admin@revora.com",
  avatar: "AU",
  businessName: "Revora",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("guest");
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  const login = (newRole: Role) => {
    setRole(newRole);
    if (newRole === "owner") {
      setUser(ownerUser);
      setLocation("/dashboard");
    }
    if (newRole === "admin") {
      setUser(adminUser);
      setLocation("/admin");
    }
  };

  const logout = () => {
    setRole("guest");
    setUser(null);
    setLocation("/");
  };

  return (
    <AuthContext.Provider value={{ role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
