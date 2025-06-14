import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

// Fallback poems for when API key is not available
const fallbackPoems = {
  "joyful-love": [
    {
      title: "Dancing Hearts",
      poem: "In your eyes, I see the sunrise,\nIn your smile, my heart takes flight.\nEvery moment feels like magic,\nWhen you hold me close and tight.",
    },
    {
      title: "Endless Joy",
      poem: "You are my favorite hello,\nAnd my hardest goodbye.\nWith you, every day is brighter,\nLike stars dancing in the sky.",
    },
  ],
  heartbreak: [
    {
      title: "Empty Spaces",
      poem: "The silence where your laughter lived,\nThe cold where warmth once grew.\nI'm learning how to breathe again,\nIn a world that's missing you.",
    },
    {
      title: "Fading Echoes",
      poem: "Your memory lingers softly,\nLike perfume in the air.\nI reach for you in morning light,\nBut find you're no longer there.",
    },
  ],
  "secret-crush": [
    {
      title: "Unspoken Words",
      poem: "I write your name in morning mist,\nAnd watch it fade away.\nThe words I long to tell you,\nRemain unspoken every day.",
    },
    {
      title: "Hidden Feelings",
      poem: "From across the crowded room,\nI steal glances at your face.\nWishing I could find the courage,\nTo step into love's embrace.",
    },
  ],
  longing: [
    {
      title: "Miles Apart",
      poem: "Distance is just a number,\nBut it feels like eternity.\nEvery sunset reminds me,\nOf your love's sweet memory.",
    },
    {
      title: "Waiting Heart",
      poem: "I count the days until we meet,\nLike stars across the night.\nMy heart beats with anticipation,\nFor love's returning light.",
    },
  ],
  "timeless-romance": [
    {
      title: "Forever Yours",
      poem: "Through seasons that may come and go,\nAnd years that pass us by.\nMy love for you will never fade,\nLike stars that fill the sky.",
    },
    {
      title: "Eternal Promise",
      poem: "In this life and all the next,\nI choose to love you true.\nFor time may change many things,\nBut never my love for you.",
    },
  ],
}

export async function POST(request: NextRequest) {
  try {
    const { mood, keywords } = await request.json()

    // Check if OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY

    if (apiKey) {
      // Use AI generation if API key is available
      try {
        const moodPrompts = {
          "joyful-love": "Write a joyful, uplifting romantic poem about the happiness and bliss of being in love",
          heartbreak: "Write a melancholic but beautiful poem about heartbreak, loss, and the pain of love",
          "secret-crush": "Write a tender poem about having a secret crush, unspoken feelings, and hidden admiration",
          longing: "Write a poem about longing and yearning for someone, the ache of missing them",
          "timeless-romance": "Write a classic, timeless romantic poem about eternal love and devotion",
        }

        const basePrompt = moodPrompts[mood as keyof typeof moodPrompts] || moodPrompts["joyful-love"]
        const keywordPrompt = keywords ? ` Incorporate these keywords naturally: ${keywords}` : ""

        const fullPrompt = `${basePrompt}.${keywordPrompt} 

        The poem should be:
        - 4-8 lines long
        - Romantic and emotional
        - Beautiful and lyrical
        - Easy to read and understand
        - Original and creative
        
        Return only the poem text, no additional commentary.`

        const { text: poem } = await generateText({
          model: openai("gpt-4o"),
          prompt: fullPrompt,
        })

        // Generate a title for the poem
        const { text: title } = await generateText({
          model: openai("gpt-4o"),
          prompt: `Create a short, romantic title (2-4 words) for this poem: ${poem}. Return only the title, no quotes or additional text.`,
        })

        return NextResponse.json({
          poem: poem.trim(),
          title: title.trim(),
        })
      } catch (aiError) {
        console.error("AI generation failed, falling back to preset poems:", aiError)
        // Fall through to fallback system
      }
    }

    // Fallback system when API key is not available or AI fails
    const moodPoems = fallbackPoems[mood as keyof typeof fallbackPoems] || fallbackPoems["joyful-love"]
    const randomPoem = moodPoems[Math.floor(Math.random() * moodPoems.length)]

    // If keywords are provided, try to customize the fallback poem
    if (keywords) {
      const keywordList = keywords
        .toLowerCase()
        .split(",")
        .map((k) => k.trim())

      // Simple keyword integration for fallback poems
      let customizedPoem = randomPoem.poem
      const customizedTitle = randomPoem.title

      // Basic keyword replacement logic
      if (keywordList.includes("sunset") || keywordList.includes("sun")) {
        customizedPoem = customizedPoem.replace(/stars/gi, "sunset glow").replace(/night/gi, "evening")
      }
      if (keywordList.includes("moon") || keywordList.includes("moonlight")) {
        customizedPoem = customizedPoem.replace(/stars/gi, "moonlight").replace(/sunrise/gi, "moonrise")
      }
      if (keywordList.includes("ocean") || keywordList.includes("sea")) {
        customizedPoem = customizedPoem.replace(/sky/gi, "ocean").replace(/stars/gi, "waves")
      }

      return NextResponse.json({
        poem: customizedPoem,
        title: customizedTitle,
        fallback: true,
      })
    }

    return NextResponse.json({
      poem: randomPoem.poem,
      title: randomPoem.title,
      fallback: true,
    })
  } catch (error) {
    console.error("Error in poem generation:", error)

    // Ultimate fallback
    return NextResponse.json({
      poem: "In your eyes, I see forever,\nIn your smile, I find my home.\nWith you, my heart beats stronger,\nNever again will I roam.",
      title: "My Heart's Home",
      fallback: true,
    })
  }
}
