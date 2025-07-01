"use client"

import { Button } from "@/components/ui/button"
import { useAdmin } from "@/contexts/AdminContext"
import { LogOut, User } from "lucide-react"

export default function AdminHeader() {
  const { user, logout } = useAdmin()

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Portfolio Admin</h1>
          <p className="text-sm text-gray-400">Manage your portfolio content</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <User className="h-4 w-4" />
            <span className="text-sm">{user?.name}</span>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="border-gray-600 text-gray-300 bg-transparent">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
