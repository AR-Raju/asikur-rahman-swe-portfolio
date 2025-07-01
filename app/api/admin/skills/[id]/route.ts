import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import skillsData from "@/data/skills.json"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()

    const updatedData = skillsData.map((item) => (item.id === id ? { ...item, ...data } : item))

    const filepath = join(process.cwd(), "data", "skills.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    const updatedItem = updatedData.find((item) => item.id === id)
    return NextResponse.json(updatedItem)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update skill entry" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updatedData = skillsData.filter((item) => item.id !== id)

    const filepath = join(process.cwd(), "data", "skills.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    return NextResponse.json({ message: "Skill entry deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete skill entry" }, { status: 500 })
  }
}
