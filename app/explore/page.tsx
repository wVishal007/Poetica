"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Copy, Download, Share, ArrowLeft } from "lucide-react"

const samplePoems = [
  {
    id: 1,
    title: "Under Moonlit Skies",
    poem: "Your voice, a lullaby in the night,\nGuiding my soul with soft delight.\nThe moon blushed as it heard you speak,\nMy heart kneeled down, forever weak.",
  },
  {
    id: 2,
    title: "When You Smiled",
    poem: "The world stood still, stars aligned,\nI found eternity in your smile so kind.",
  },
  {
    id: 3,
    title: "Letters I Never Sent",
    poem: "In silence, I wrote you a thousand lines,\nAll sealed within heartbeats and sighs.",
  },
  {
    id: 4,
    title: "A Gentle Chaos",
    poem: "You are the calm in my storm,\nAnd the thunder in my calm.",
  },
  {
    id: 5,
    title: "The Color Red",
    poem: "It's not roses or sunsets,\nIt's the way you blush that defines red.",
  },
  {
    id: 6,
    title: "Love, Unwritten",
    poem: "Some stories don't need words,\nJust gazes that speak in echoes.",
  },
  {
    id: 7,
    title: "In Another Life",
    poem: "If not this time, then next —\nI'll find you, love you, lose you, repeat.",
  },
  {
    id: 8,
    title: "His Scarf, Her Tears",
    poem: "She kept his scarf, he forgot his love —\nBut it still smelled of him.",
  },
  {
    id: 9,
    title: "Forever is a Lie",
    poem: "But I'd still write your name on every star.",
  },
  {
    id: 10,
    title: "We Never Said Goodbye",
    poem: "Only silence packed its bags,\nAnd tears waved from the door.",
  },
  {
    id: 11,
    title: "Love at First Glance",
    poem: "One look — and I remembered\nAll the lives I must have loved you in.",
  },
  {
    id: 12,
    title: "Velvet Nights",
    poem: "Wrapped in stardust and quiet sighs,\nWe became the poetry we read.",
  },
  {
    id: 13,
    title: "Her Eyes",
    poem: "Two galaxies in orbit,\nPulling me into the gravity of her gaze.",
  },
  {
    id: 14,
    title: "Last Winter",
    poem: "It wasn't the snow that made me shiver,\nIt was your absence.",
  },
  {
    id: 15,
    title: "To You, With Love",
    poem: "Not every poem needs pain —\nSome are born from joy, from you.",
  },
  {
    id: 16,
    title: "Ink & Petals",
    poem: "I wrote you a poem,\nAnd roses grew from the pages.",
  },
  {
    id: 17,
    title: "Soul Tied",
    poem: "Even if we unmeet,\nI'll know your soul from a whisper.",
  },
  {
    id: 18,
    title: "Blush",
    poem: "The way your name sounds in my head,\nThat's why I blush before I speak.",
  },
  {
    id: 19,
    title: "Timeless",
    poem: "Love, like old film —\nGrainy, raw, and unforgettable.",
  },
  {
    id: 20,
    title: "Rain, and You",
    poem: "You happened like the rain,\nUninvited — but so needed.",
  },
]

export default function ExplorePage() {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [selectedTemplates, setSelectedTemplates] = useState<Record<number, string>>({})

  const copyPoem = (poem: (typeof samplePoems)[0]) => {
    navigator.clipboard.writeText(`${poem.title}\n\n${poem.poem}`)
    setCopiedId(poem.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const downloadPoem = async (poem: (typeof samplePoems)[0], template = "classic") => {
    try {
      const response = await fetch("/api/download-poem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: poem.title,
          poem: poem.poem,
          template: template,
        }),
      })

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${poem.title.replace(/\s+/g, "-")}.pdf`
      a.click()
    } catch (error) {
      console.error("Error downloading poem:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-indigo-500 fill-current" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Poetica
            </h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Explore Love Poems
          </h2>
          <p className="text-indigo-600 text-lg">A curated collection of romantic verses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {samplePoems.map((poem) => (
            <div
              key={poem.id}
              className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-indigo-700 mb-4 text-center">{poem.title}</h3>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 mb-4 border border-indigo-100">
                <p className="text-indigo-600 text-sm leading-relaxed whitespace-pre-line text-center font-light">
                  {poem.poem}
                </p>
              </div>

              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => copyPoem(poem)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    copiedId === poem.id
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                  }`}
                  title="Copy poem"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <div className="relative group">
                  <button
                    onClick={() => downloadPoem(poem, selectedTemplates[poem.id] || "classic")}
                    className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                    title="Download as PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <select
                    value={selectedTemplates[poem.id] || "classic"}
                    onChange={(e) => setSelectedTemplates((prev) => ({ ...prev, [poem.id]: e.target.value }))}
                    className="absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-white border border-indigo-200 rounded px-2 py-1 text-indigo-600 shadow-lg z-10"
                  >
                    <option value="classic">Classic</option>
                    <option value="vintage">Vintage</option>
                    <option value="modern">Modern</option>
                    <option value="floral">Floral</option>
                  </select>
                </div>

                <button
                  className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                  title="Share poem"
                >
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
