import { NextResponse } from "next/server"
import projectsData from "@/data/projects.json"

export async function GET() {
  try {
    return NextResponse.json(projectsData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects data" }, { status: 500 })
  }
}
