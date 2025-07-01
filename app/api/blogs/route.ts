import { NextResponse } from "next/server"
import blogsData from "@/data/blogs.json"

export async function GET() {
  try {
    return NextResponse.json(blogsData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs data" }, { status: 500 })
  }
}
