"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, Sparkles, Cloud, FlowerIcon as Rose } from "lucide-react"

export default function HomePage() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [showQuotes, setShowQuotes] = useState(true)

  useEffect(() => {
    const heartElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setHearts(heartElements)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute animate-float opacity-20"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: "6s",
            }}
          >
            <Heart className="w-4 h-4 text-purple-300 fill-current" />
          </div>
        ))}

        {/* Floating Clouds */}
        <div className="absolute top-10 left-10 animate-float opacity-30">
          <Cloud className="w-16 h-16 text-indigo-200" />
        </div>
        <div className="absolute top-32 right-20 animate-float opacity-25" style={{ animationDelay: "2s" }}>
          <Cloud className="w-12 h-12 text-purple-200" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float opacity-20" style={{ animationDelay: "4s" }}>
          <Rose className="w-8 h-8 text-cyan-300" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-indigo-500 fill-current" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Poetica
            </h1>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Home
            </Link>
            <Link href="/generate" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Generate
            </Link>
            <Link href="/explore" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Explore
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Tagline */}
          <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 bg-clip-text text-transparent animate-glow">
              Express your emotions
            </span>
            <br />
            <span className="text-indigo-400">in verses of love</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-indigo-600 mb-12 font-light leading-relaxed">
            Where hearts find their voice and love finds its rhythm
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/generate">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Generate My Poem</span>
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
            </Link>

            <Link href="/explore">
              <button className="px-8 py-4 border-2 border-indigo-300 text-indigo-600 rounded-full font-semibold text-lg hover:bg-indigo-50 transition-all duration-300 backdrop-blur-sm bg-white/30">
                Browse Poems        </button>
            </Link>
          </div>
        </div>

        {/* Quote Toggle Control */}
        <button
          onClick={() => setShowQuotes(!showQuotes)}
          className="fixed top-6 right-6 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300"
          title={showQuotes ? "Hide floating quotes" : "Show floating quotes"}
        >
          <Sparkles className={`w-5 h-5 transition-colors ${showQuotes ? "text-indigo-500" : "text-indigo-300"}`} />
        </button>

        {/* Animated Floating Quotes */}
        {showQuotes && (
          <>
            <div
              className="absolute animate-float-quote opacity-0 pointer-events-none"
              style={{
                left: "20%",
                top: "30%",
                animationDelay: "0s",
                animationDuration: "12s",
              }}
            >
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg">
                <p className="text-indigo-600 italic text-center font-light text-sm">
                  "Poetry is the spontaneous overflow of powerful feelings"
                </p>
                <p className="text-purple-400 text-xs text-center mt-1">- William Wordsworth</p>
              </div>
            </div>

            <div
              className="absolute animate-float-quote opacity-0 pointer-events-none"
              style={{
                right: "15%",
                top: "50%",
                animationDelay: "4s",
                animationDuration: "12s",
              }}
            >
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg">
                <p className="text-indigo-600 italic text-center font-light text-sm">
                  "Love is a canvas furnished by nature and embroidered by imagination"
                </p>
                <p className="text-purple-400 text-xs text-center mt-1">- Voltaire</p>
              </div>
            </div>

            <div
              className="absolute animate-float-quote opacity-0 pointer-events-none"
              style={{
                left: "70%",
                top: "25%",
                animationDelay: "8s",
                animationDuration: "12s",
              }}
            >
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg">
                <p className="text-indigo-600 italic text-center font-light text-sm">
                  "The best love is the kind that awakens the soul"
                </p>
                <p className="text-purple-400 text-xs text-center mt-1">- Nicholas Sparks</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
