"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/auth";
import { Github, Linkedin, Mail, MapPin, Phone, Save, Twitter, Upload, User } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

interface ProfileData {
  designation: string;
  introduction: string;
  resumeUrl: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
  };
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await apiClient.getProfile();
      setProfile(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      let resumeUrl = profile.resumeUrl;

      // Upload resume if a new file is selected
      if (resumeFile) {
        const uploadResponse = await apiClient.uploadImage(resumeFile);
        resumeUrl = uploadResponse.data.url;
      }

      const updatedProfile = await apiClient.updateProfile({
        ...profile,
        resumeUrl,
      });

      setProfile(updatedProfile.data);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleSocialLinkChange = (platform: keyof ProfileData["socialLinks"], value: string) => {
    if (!profile) return;
    setProfile({
      ...profile,
      socialLinks: {
        ...profile.socialLinks,
        [platform]: value,
      },
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
          <p className="text-gray-600">Update your personal information and resume</p>
        </div>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white p-12 rounded-lg border border-gray-200 text-center">
        <p className="text-gray-500">Failed to load profile data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
        <p className="text-gray-600">Update your personal information and resume</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription className="text-gray-600">Your professional details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation" className="text-gray-700">
                  Designation
                </Label>
                <Input
                  id="designation"
                  value={profile.designation}
                  onChange={e => handleInputChange("designation", e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={e => handleInputChange("address", e.target.value)}
                  placeholder="e.g., Dhaka, Bangladesh"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={e => handleInputChange("phone", e.target.value)}
                  placeholder="e.g., +880 123 456 7890"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={e => handleInputChange("email", e.target.value)}
                  placeholder="e.g., your@email.com"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="introduction" className="text-gray-700">
                Introduction
              </Label>
              <Textarea
                id="introduction"
                value={profile.introduction}
                onChange={e => handleInputChange("introduction", e.target.value)}
                className="min-h-[120px] bg-white border-gray-300 text-gray-900"
                placeholder="Write a brief introduction about yourself..."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="text-gray-900">Social Links</CardTitle>
            <CardDescription className="text-gray-600">Your professional social media profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="flex items-center gap-2 text-gray-700">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={profile.socialLinks.linkedin}
                  onChange={e => handleSocialLinkChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github" className="flex items-center gap-2 text-gray-700">
                  <Github className="h-4 w-4" />
                  GitHub
                </Label>
                <Input
                  id="github"
                  value={profile.socialLinks.github}
                  onChange={e => handleSocialLinkChange("github", e.target.value)}
                  placeholder="https://github.com/username"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter" className="flex items-center gap-2 text-gray-700">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  value={profile.socialLinks.twitter}
                  onChange={e => handleSocialLinkChange("twitter", e.target.value)}
                  placeholder="https://twitter.com/username"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200">
          <CardHeader className="bg-white">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Upload className="h-5 w-5" />
              Resume
            </CardTitle>
            <CardDescription className="text-gray-600">Upload your latest resume (PDF format)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 bg-white">
            <div className="space-y-2">
              <Label htmlFor="resume" className="text-gray-700">
                Resume File
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={e => setResumeFile(e.target.files?.[0] || null)}
                  className="bg-white border-gray-300 text-gray-900"
                />
                {profile.resumeUrl && (
                  <Button type="button" variant="outline" size="sm" asChild className="bg-white border-gray-300 text-gray-700">
                    <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                      View Current
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white">
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
