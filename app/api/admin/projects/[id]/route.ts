import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import projectsData from "@/data/projects.json"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()

    const updatedData = projectsData.map((item) => (item.id === id ? { ...item, ...data } : item))

    const filepath = join(process.cwd(), "data", "projects.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    const updatedItem = updatedData.find((item) => item.id === id)
    return NextResponse.json(updatedItem)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project entry" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updatedData = projectsData.filter((item) => item.id !== id)

    const filepath = join(process.cwd(), "data", "projects.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    return NextResponse.json({ message: "Project entry deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project entry" }, { status: 500 })
  }
}
