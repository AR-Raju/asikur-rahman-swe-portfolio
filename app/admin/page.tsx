"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, Code, FolderOpen, GraduationCap, Plus, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardStats {
  education: number;
  experience: number;
  skills: number;
  projects: number;
  blogs: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    education: 0,
    experience: 0,
    skills: 0,
    projects: 0,
    blogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [educationRes, experienceRes, skillsRes, projectsRes, blogsRes] = await Promise.all([
        fetch("/api/admin/education"),
        fetch("/api/admin/experience"),
        fetch("/api/admin/skills"),
        fetch("/api/admin/projects"),
        fetch("/api/admin/blogs"),
      ]);

      const [education, experience, skills, projects, blogs] = await Promise.all([
        educationRes.json(),
        experienceRes.json(),
        skillsRes.json(),
        projectsRes.json(),
        blogsRes.json(),
      ]);

      setStats({
        education: education.length || 0,
        experience: experience.length || 0,
        skills: skills.length || 0,
        projects: projects.length || 0,
        blogs: blogs.length || 0,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Education",
      value: stats.education,
      icon: GraduationCap,
      description: "Educational qualifications",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/admin/education",
    },
    {
      title: "Experience",
      value: stats.experience,
      icon: Briefcase,
      description: "Work experiences",
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/admin/experience",
    },
    {
      title: "Skills",
      value: stats.skills,
      icon: Code,
      description: "Technical skills",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/admin/skills",
    },
    {
      title: "Projects",
      value: stats.projects,
      icon: FolderOpen,
      description: "Portfolio projects",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/admin/projects",
    },
    {
      title: "Blogs",
      value: stats.blogs,
      icon: BookOpen,
      description: "Blog articles",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      href: "/admin/blogs",
    },
  ];

  const quickActions = [
    { title: "Add New Project", href: "/admin/projects", icon: FolderOpen },
    { title: "Write Blog Post", href: "/admin/blogs", icon: BookOpen },
    { title: "Update Profile", href: "/admin/profile", icon: GraduationCap },
    { title: "Add Experience", href: "/admin/experience", icon: Briefcase },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your portfolio admin dashboard</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your portfolio admin dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="text-sm text-gray-600">All systems operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map(card => (
          <Link key={card.title} href={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                <p className="text-xs text-gray-500">{card.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map(action => (
              <Link key={action.title} href={action.href}>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <action.icon className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-900">{action.title}</span>
                  </div>
                  <Plus className="h-4 w-4 text-gray-400" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Database connected successfully</p>
                <p className="text-xs text-gray-500">System is ready for use</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Admin dashboard initialized</p>
                <p className="text-xs text-gray-500">All features are available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Authentication system active</p>
                <p className="text-xs text-gray-500">Secure access enabled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
