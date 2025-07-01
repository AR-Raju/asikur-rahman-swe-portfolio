import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import profileData from "@/data/profile.json"

export async function GET() {
  try {
    return NextResponse.json(profileData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile data" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData()
    const designation = formData.get("designation") as string
    const introduction = formData.get("introduction") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const location = formData.get("location") as string
    const resumeFile = formData.get("resume") as File | null

    let resumeUrl = profileData.resumeUrl

    // Handle resume file upload
    if (resumeFile && resumeFile.size > 0) {
      const bytes = await resumeFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `resume-${Date.now()}.pdf`
      const filepath = join(process.cwd(), "public", filename)
      await writeFile(filepath, buffer)
      resumeUrl = `/${filename}`
    }

    const updatedProfile = {
      ...profileData,
      designation,
      introduction,
      phone,
      email,
      location,
      resumeUrl,
    }

    // In a real app, you'd write to a database
    // For now, we'll just return the updated data
    const filepath = join(process.cwd(), "data", "profile.json")
    await writeFile(filepath, JSON.stringify(updatedProfile, null, 2))

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
