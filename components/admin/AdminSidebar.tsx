"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Briefcase,
  Code,
  FolderOpen,
  BookOpen,
  Settings,
  Mail,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Skills", href: "/admin/skills", icon: Code },
  { name: "Projects", href: "/admin/projects", icon: FolderOpen },
  { name: "Blogs", href: "/admin/blogs", icon: BookOpen },
  { name: "Contact", href: "/admin/contact", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        <p className="text-sm text-gray-400">Portfolio Management</p>
      </div>

      <nav className="px-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-teal-500 text-gray-900" : "text-gray-300 hover:bg-gray-700 hover:text-white",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
