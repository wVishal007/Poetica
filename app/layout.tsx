import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Poetica - Express your emotions in verses of love",
  description:
    "A romantic poetry platform where hearts find their voice and love finds its rhythm. Generate AI-powered poems, explore beautiful verses, and download your favorites.",
  keywords: "poetry, romantic poems, love poems, AI poetry, poem generator, romantic verses",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
