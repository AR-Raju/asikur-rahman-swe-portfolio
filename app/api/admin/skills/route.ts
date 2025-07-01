import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import skillsData from "@/data/skills.json"

export async function GET() {
  try {
    return NextResponse.json(skillsData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newSkill = {
      id: Math.max(...skillsData.map((s) => s.id), 0) + 1,
      ...data,
    }

    const updatedData = [...skillsData, newSkill]
    const filepath = join(process.cwd(), "data", "skills.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    return NextResponse.json(newSkill, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill entry" }, { status: 500 })
  }
}
