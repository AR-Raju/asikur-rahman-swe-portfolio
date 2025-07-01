"use client"

import type React from "react"

import { AdminProvider } from "@/contexts/AdminContext"
import AdminSidebar from "@/components/admin/AdminSidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  if (isLoginPage) {
    return (
      <AdminProvider>
        <div className="min-h-screen bg-gray-900">{children}</div>
      </AdminProvider>
    )
  }

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-900 flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </AdminProvider>
  )
}
