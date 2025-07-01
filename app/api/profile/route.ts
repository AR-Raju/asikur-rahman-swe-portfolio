import { NextResponse } from "next/server"
import profileData from "@/data/profile.json"

export async function GET() {
  try {
    return NextResponse.json(profileData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile data" }, { status: 500 })
  }
}
