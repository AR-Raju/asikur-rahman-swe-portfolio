import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import blogsData from "@/data/blogs.json"

export async function GET() {
  try {
    return NextResponse.json(blogsData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newBlog = {
      id: Math.max(...blogsData.map((b) => b.id), 0) + 1,
      ...data,
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedData = [...blogsData, newBlog]
    const filepath = join(process.cwd(), "data", "blogs.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog entry" }, { status: 500 })
  }
}
