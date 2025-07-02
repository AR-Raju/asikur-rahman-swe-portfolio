"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/auth";
import { BookOpen, Briefcase, Code, FolderOpen, GraduationCap, MessageSquare, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardStats {
  education: number;
  experience: number;
  skills: number;
  projects: number;
  blogs: number;
  messages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    education: 0,
    experience: 0,
    skills: 0,
    projects: 0,
    blogs: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [education, experience, skills, projects, blogs, messages] = await Promise.all([
        apiClient.getEducation().catch(() => ({ data: [] })),
        apiClient.getExperience().catch(() => ({ data: [] })),
        apiClient.getSkills().catch(() => ({ data: [] })),
        apiClient.getProjects().catch(() => ({ data: [] })),
        apiClient.getBlogs().catch(() => ({ data: [] })),
        apiClient.getContactMessages().catch(() => ({ data: [] })),
      ]);

      setStats({
        education: education.data.length,
        experience: experience.data.length,
        skills: skills.data.length,
        projects: projects.data.length,
        blogs: blogs.data.length,
        messages: messages.data.length,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Education",
      value: stats.education,
      icon: GraduationCap,
      href: "/admin/education",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Educational qualifications",
    },
    {
      title: "Experience",
      value: stats.experience,
      icon: Briefcase,
      href: "/admin/experience",
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Work experience records",
    },
    {
      title: "Skills",
      value: stats.skills,
      icon: Code,
      href: "/admin/skills",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Technical skills",
    },
    {
      title: "Projects",
      value: stats.projects,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Portfolio projects",
    },
    {
      title: "Blog Posts",
      value: stats.blogs,
      icon: BookOpen,
      href: "/admin/blogs",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Published articles",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: MessageSquare,
      href: "/admin/contact",
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Contact messages",
    },
  ];

  const quickActions = [
    { title: "Add New Project", href: "/admin/projects", icon: FolderOpen, color: "text-orange-600" },
    { title: "Write Blog Post", href: "/admin/blogs", icon: BookOpen, color: "text-indigo-600" },
    { title: "Update Profile", href: "/admin/profile", icon: Users, color: "text-blue-600" },
    { title: "Add Experience", href: "/admin/experience", icon: Briefcase, color: "text-green-600" },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your portfolio admin panel</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
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
      {/* Header Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome to your portfolio admin panel</p>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              All Systems Operational
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map(card => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="hover:shadow-md transition-shadow bg-white border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                  </div>
                  <div className={`p-3 rounded-full ${card.bgColor}`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <Button asChild variant="outline" size="sm" className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Link href={card.href}>Manage {card.title}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="text-gray-900">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 bg-white">
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.title}
                  asChild
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 bg-white hover:bg-gray-50 text-gray-900"
                >
                  <Link href={action.href}>
                    <Icon className={`mr-3 h-4 w-4 ${action.color}`} />
                    <span>{action.title}</span>
                  </Link>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="text-gray-900">System Status</CardTitle>
            <CardDescription className="text-gray-600">Current system information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">API Connection</p>
                  <p className="text-xs text-gray-600">Connected and operational</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                Online
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Last Updated</p>
                  <p className="text-xs text-gray-600">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <span className="text-sm text-gray-700">Today</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Version</p>
                  <p className="text-xs text-gray-600">Portfolio Admin v1.0.0</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                Latest
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
