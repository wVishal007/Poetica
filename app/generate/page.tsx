"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Sparkles, Download, Copy, Share, ArrowLeft, Loader2 } from "lucide-react"

const moods = [
  { value: "joyful-love", label: "Joyful Love", emoji: "💕" },
  { value: "heartbreak", label: "Heartbreak", emoji: "💔" },
  { value: "secret-crush", label: "Secret Crush", emoji: "🤫" },
  { value: "longing", label: "Longing", emoji: "🌙" },
  { value: "timeless-romance", label: "Timeless Romance", emoji: "🌹" },
]

export default function GeneratePage() {
  const [selectedMood, setSelectedMood] = useState("")
  const [keywords, setKeywords] = useState("")
  const [generatedPoem, setGeneratedPoem] = useState("")
  const [poemTitle, setPoemTitle] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("classic")

  const generatePoem = async () => {
    if (!selectedMood) return

    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-poem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood: selectedMood,
          keywords: keywords,
        }),
      })

      const data = await response.json()
      setGeneratedPoem(data.poem)
      setPoemTitle(data.title)

      // Show a subtle indicator if using fallback poems
      if (data.fallback) {
        console.log("Using curated poem - add OpenAI API key for AI generation")
      }
    } catch (error) {
      console.error("Error generating poem:", error)
      // Show error state or fallback poem
      setGeneratedPoem("Unable to generate poem at this time.\nPlease try again later.")
      setPoemTitle("Error")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyPoem = () => {
    navigator.clipboard.writeText(`${poemTitle}\n\n${generatedPoem}`)
  }

  const downloadPoem = async (template = "classic") => {
    try {
      const response = await fetch("/api/download-poem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: poemTitle,
          poem: generatedPoem,
          template: template,
        }),
      })

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${poemTitle.replace(/\s+/g, "-")}.pdf`
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

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Generate Your Love Poem
          </h2>
          <p className="text-indigo-600 text-lg">Let AI craft the perfect verses for your emotions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-lg">
            <h3 className="text-2xl font-semibold text-indigo-700 mb-6">Choose Your Mood</h3>

            <div className="space-y-3 mb-6">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedMood === mood.value
                      ? "bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-lg"
                      : "bg-white/50 text-indigo-700 hover:bg-white/70"
                  }`}
                >
                  <span className="text-xl mr-3">{mood.emoji}</span>
                  {mood.label}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-indigo-700 font-semibold mb-2">Keywords (Optional)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., sunset, whisper, forever..."
                className="w-full p-4 rounded-xl bg-white/50 border border-indigo-200 focus:border-indigo-400 focus:outline-none text-indigo-700 placeholder-indigo-400"
              />
            </div>

            <button
              onClick={generatePoem}
              disabled={!selectedMood || isGenerating}
              className="w-full py-4 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Crafting your poem...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Poem</span>
                </span>
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-lg">
            {generatedPoem ? (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-semibold text-indigo-700">Your Poem</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={copyPoem}
                      className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                      title="Copy poem"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <div className="relative">
                      <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="absolute -top-8 right-0 text-xs bg-indigo-50 border border-indigo-200 rounded px-2 py-1 text-indigo-600"
                      >
                        <option value="classic">Classic</option>
                        <option value="vintage">Vintage</option>
                        <option value="modern">Modern</option>
                        <option value="floral">Floral</option>
                      </select>
                      <button
                        onClick={() => downloadPoem(selectedTemplate)}
                        className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                        title="Download as PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                      title="Share poem"
                    >
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-200">
                  <h4 className="text-xl font-bold text-indigo-800 mb-4 text-center">{poemTitle}</h4>
                  <div className="text-indigo-700 leading-relaxed whitespace-pre-line text-center font-light">
                    {generatedPoem}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-indigo-400 py-12">
                <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Your beautiful poem will appear here</p>
                <p className="text-sm mt-2">Select a mood and click generate to begin</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
