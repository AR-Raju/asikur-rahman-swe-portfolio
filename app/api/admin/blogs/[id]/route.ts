import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import blogsData from "@/data/blogs.json"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const data = await request.json()

    const updatedData = blogsData.map((item) =>
      item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item,
    )

    const filepath = join(process.cwd(), "data", "blogs.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    const updatedItem = updatedData.find((item) => item.id === id)
    return NextResponse.json(updatedItem)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog entry" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updatedData = blogsData.filter((item) => item.id !== id)

    const filepath = join(process.cwd(), "data", "blogs.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    return NextResponse.json({ message: "Blog entry deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog entry" }, { status: 500 })
  }
}
