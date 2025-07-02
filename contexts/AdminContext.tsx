"use client";

import { apiClient } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AdminContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Don't check auth on login page
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const response = await apiClient.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
      if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiClient.login(email, password);
      setUser(response.user);
      router.push("/admin");
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      router.push("/admin/login");
    }
  };

  return <AdminContext.Provider value={{ user, loading, login, logout }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
