"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Toaster } from "@/components/ui/toaster";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";
import { usePathname } from "next/navigation";
import type React from "react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdmin();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect via context
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50">
          <div className="p-6 pt-24">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
      <Toaster />
    </AdminProvider>
  );
}
