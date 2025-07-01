import { NextResponse } from "next/server"
import blogsData from "@/data/blogs.json"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const blogId = Number.parseInt(params.id)
    const blog = blogsData.find((b) => b.id === blogId)

    if (!blog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog data" }, { status: 500 })
  }
}
