import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import experienceData from "@/data/experience.json"

export async function GET() {
  try {
    return NextResponse.json(experienceData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experience data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newExperience = {
      id: Math.max(...experienceData.map((e) => e.id), 0) + 1,
      ...data,
    }

    const updatedData = [...experienceData, newExperience]
    const filepath = join(process.cwd(), "data", "experience.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    return NextResponse.json(newExperience, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience entry" }, { status: 500 })
  }
}
