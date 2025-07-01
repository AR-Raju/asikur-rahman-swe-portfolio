"use client";

import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";
import { LogOut, User } from "lucide-react";

export default function AdminHeader() {
  const { user, logout } = useAdmin();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">Manage your portfolio content</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>{user?.name}</span>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
