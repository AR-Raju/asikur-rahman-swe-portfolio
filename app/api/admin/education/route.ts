import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import educationData from "@/data/education.json"

export async function GET() {
  try {
    return NextResponse.json(educationData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch education data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const newEducation = {
      id: Math.max(...educationData.map((e) => e.id), 0) + 1,
      ...data,
    }

    const updatedData = [...educationData, newEducation]
    const filepath = join(process.cwd(), "data", "education.json")
    await writeFile(filepath, JSON.stringify(updatedData, null, 2))

    return NextResponse.json(newEducation, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create education entry" }, { status: 500 })
  }
}
