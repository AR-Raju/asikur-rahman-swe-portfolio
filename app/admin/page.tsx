"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FolderOpen, Code, GraduationCap, Briefcase } from "lucide-react"

interface Stats {
  education: number
  experience: number
  skills: number
  projects: number
  blogs: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    education: 0,
    experience: 0,
    skills: 0,
    projects: 0,
    blogs: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [education, experience, skills, projects, blogs] = await Promise.all([
        fetch("/api/admin/education").then((r) => r.json()),
        fetch("/api/admin/experience").then((r) => r.json()),
        fetch("/api/admin/skills").then((r) => r.json()),
        fetch("/api/admin/projects").then((r) => r.json()),
        fetch("/api/admin/blogs").then((r) => r.json()),
      ])

      setStats({
        education: education.length || 0,
        experience: experience.length || 0,
        skills: skills.length || 0,
        projects: projects.length || 0,
        blogs: blogs.length || 0,
      })
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Education",
      value: stats.education,
      icon: GraduationCap,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Experience",
      value: stats.experience,
      icon: Briefcase,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Skills",
      value: stats.skills,
      icon: Code,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Projects",
      value: stats.projects,
      icon: FolderOpen,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Blog Posts",
      value: stats.blogs,
      icon: BookOpen,
      color: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome to your portfolio admin panel</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-700 rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome to your portfolio admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-400">Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-white">Add New Project</span>
              <Badge variant="secondary">Quick</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-white">Write Blog Post</span>
              <Badge variant="secondary">Popular</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <span className="text-white">Update Profile</span>
              <Badge variant="secondary">Important</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">Your latest portfolio updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-white text-sm">Portfolio data loaded successfully</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-white text-sm">Admin dashboard initialized</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-white text-sm">Authentication system active</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
