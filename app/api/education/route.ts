import { NextResponse } from "next/server"
import educationData from "@/data/education.json"

export async function GET() {
  try {
    return NextResponse.json(educationData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch education data" }, { status: 500 })
  }
}
