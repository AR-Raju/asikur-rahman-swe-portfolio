import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import educationData from "@/data/education.json"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()

    const updatedData = educationData.map((item) => (item.id === id ? { ...item, ...data } : item))

    const filepath = join(process.cwd(), "data", "education.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    const updatedItem = updatedData.find((item) => item.id === id)
    return NextResponse.json(updatedItem)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update education entry" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updatedData = educationData.filter((item) => item.id !== id)

    const filepath = join(process.cwd(), "data", "education.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    return NextResponse.json({ message: "Education entry deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete education entry" }, { status: 500 })
  }
}
