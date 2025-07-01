import { NextResponse } from "next/server"
import projectsData from "@/data/projects.json"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const projectId = Number.parseInt(params.id)
    const project = projectsData.find((p) => p.id === projectId)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project data" }, { status: 500 })
  }
}
