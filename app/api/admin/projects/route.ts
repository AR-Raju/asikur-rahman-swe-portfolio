import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import projectsData from "@/data/projects.json"

export async function GET() {
  try {
    return NextResponse.json(projectsData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newProject = {
      id: Math.max(...projectsData.map((p) => p.id), 0) + 1,
      ...data,
    }

    const updatedData = [...projectsData, newProject]
    const filepath = join(process.cwd(), "data", "projects.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project entry" }, { status: 500 })
  }
}
