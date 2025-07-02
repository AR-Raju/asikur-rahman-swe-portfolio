"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmin } from "@/contexts/AdminContext";
import { Database, Globe, LogOut, Monitor, Settings, Shield, Smartphone, User } from "lucide-react";

export default function AdminSettings() {
  const { user, logout } = useAdmin();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and system settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription className="text-gray-600">Your account details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Name</span>
              <span className="text-sm text-gray-900">{user?.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Email</span>
              <span className="text-sm text-gray-900">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Role</span>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">Administrator</Badge>
            </div>
            <div className="pt-4">
              <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Database className="h-5 w-5" />
              API Status
            </CardTitle>
            <CardDescription className="text-gray-600">External API connection and statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Connection</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">API Version</span>
              <span className="text-sm text-gray-900">v1.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Environment</span>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Development
              </Badge>
            </div>
            <div className="pt-4">
              <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                <Database className="h-4 w-4 mr-2" />
                View API Docs
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription className="text-gray-600">Security settings and authentication</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Two-Factor Auth</span>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                Disabled
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Session Timeout</span>
              <span className="text-sm text-gray-900">24 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Last Login</span>
              <span className="text-sm text-gray-900">Today</span>
            </div>
            <div className="pt-4">
              <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                <Shield className="h-4 w-4 mr-2" />
                Security Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Globe className="h-5 w-5" />
              Portfolio Settings
            </CardTitle>
            <CardDescription className="text-gray-600">Portfolio display and configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Theme</span>
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                Dark
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Language</span>
              <span className="text-sm text-gray-900">English</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Responsive</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">Enabled</Badge>
            </div>
            <div className="pt-4">
              <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                <Monitor className="h-4 w-4 mr-2" />
                Preview Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border border-gray-200">
        <CardHeader className="bg-white">
          <CardTitle className="text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600">Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Database className="h-6 w-6" />
              <span className="text-sm">Backup Data</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Settings className="h-6 w-6" />
              <span className="text-sm">System Maintenance</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Smartphone className="h-6 w-6" />
              <span className="text-sm">Mobile Preview</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 bg-transparent"
              onClick={logout}
            >
              <LogOut className="h-6 w-6" />
              <span className="text-sm">Sign Out</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
