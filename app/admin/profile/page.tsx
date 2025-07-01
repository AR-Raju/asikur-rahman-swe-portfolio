"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

interface ProfileData {
  designation: string
  introduction: string
  resumeUrl: string
  phone: string
  email: string
  location: string
  socialLinks: {
    linkedin: string
    github: string
    twitter: string
  }
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/admin/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch profile data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    setSaving(true)
    try {
      const formData = new FormData()
      formData.append("designation", profile.designation)
      formData.append("introduction", profile.introduction)
      formData.append("phone", profile.phone)
      formData.append("email", profile.email)
      formData.append("location", profile.location)

      if (resumeFile) {
        formData.append("resume", resumeFile)
      }

      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        body: formData,
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        toast({
          title: "Success",
          description: "Profile updated successfully",
        })
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    if (!profile) return
    setProfile({ ...profile, [field]: value })
  }

  const handleSocialLinkChange = (platform: keyof ProfileData["socialLinks"], value: string) => {
    if (!profile) return
    setProfile({
      ...profile,
      socialLinks: {
        ...profile.socialLinks,
        [platform]: value,
      },
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Profile Management</h1>
          <p className="text-gray-400">Update your personal information and resume</p>
        </div>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              <div className="h-10 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              <div className="h-32 bg-gray-700 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Failed to load profile data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile Management</h1>
        <p className="text-gray-400">Update your personal information and resume</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
            <CardDescription className="text-gray-400">
              Your professional details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation" className="text-gray-300">
                  Designation
                </Label>
                <Input
                  id="designation"
                  value={profile.designation}
                  onChange={(e) => handleInputChange("designation", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-300">
                  Location
                </Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="e.g., Dhaka, Bangladesh"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="e.g., +880 123 456 7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="e.g., your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="introduction" className="text-gray-300">
                Introduction
              </Label>
              <Textarea
                id="introduction"
                value={profile.introduction}
                onChange={(e) => handleInputChange("introduction", e.target.value)}
                className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                placeholder="Write a brief introduction about yourself..."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Social Links</CardTitle>
            <CardDescription className="text-gray-400">Your professional social media profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-gray-300">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={profile.socialLinks.linkedin}
                  onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github" className="text-gray-300">
                  GitHub
                </Label>
                <Input
                  id="github"
                  value={profile.socialLinks.github}
                  onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-gray-300">
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  value={profile.socialLinks.twitter}
                  onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Resume</CardTitle>
            <CardDescription className="text-gray-400">Upload your latest resume (PDF format)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume" className="text-gray-300">
                Resume File
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                {profile.resumeUrl && (
                  <Button type="button" variant="outline" size="sm" asChild>
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
          <Button type="submit" disabled={saving} className="bg-teal-500 hover:bg-teal-600">
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
  )
}
