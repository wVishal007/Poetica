import { NextResponse } from "next/server"

const dailyPoems = [
  {
    title: "Morning Whispers",
    poem: "In the quiet of dawn's first light,\nYour love makes everything bright.\nA whispered promise, soft and true,\nMy heart belongs forever to you.",
  },
  {
    title: "Starlit Dreams",
    poem: "Under stars that dance above,\nI found my home within your love.\nEach constellation spells your name,\nMy heart will never be the same.",
  },
  {
    title: "Garden of Hearts",
    poem: "In the garden of my heart you grow,\nA rose more beautiful than any I know.\nWith petals soft and fragrance sweet,\nYou make my world feel complete.",
  },
]

export async function GET() {
  try {
    // Get today's date and use it to select a poem
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    const selectedPoem = dailyPoems[dayOfYear % dailyPoems.length]

    return NextResponse.json(selectedPoem)
  } catch (error) {
    console.error("Error fetching daily poem:", error)
    return NextResponse.json({ error: "Failed to fetch daily poem" }, { status: 500 })
  }
}
