import { generateText, Output } from "ai"
import * as z from "zod"

const ocrResultSchema = z.object({
  extractedText: z.string().describe("The full text visible in the screenshot, transcribed as-is"),
  source: z
    .string()
    .nullable()
    .describe(
      "The app the message appears to be from (e.g. SportsYou, Remind, GameChanger, TeamLinkt, GroupMe, ClassDojo, TeamReach), or null if unknown"
    ),
  dates: z.array(z.string()).describe("All dates mentioned, e.g. 'March 6th', 'Thursday, March 6'"),
  times: z.array(z.string()).describe("All times mentioned, e.g. '4:30 PM', '9:00 AM - 3:00 PM'"),
  locations: z
    .array(z.string())
    .describe("All locations or addresses mentioned, e.g. 'Lincoln Field', '123 Main St'"),
  actionItems: z
    .array(z.string())
    .describe(
      "Things the recipient needs to do, e.g. 'Bring cleats and water bottle', 'RSVP by Wednesday'"
    ),
  title: z
    .string()
    .describe("A short summary title for this message, e.g. 'Soccer Practice Moved to Thursday'"),
})

export async function POST(req: Request) {
  let body: { image?: string }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { image } = body

  if (!image || typeof image !== "string") {
    return Response.json({ error: "No image provided" }, { status: 400 })
  }

  try {
    const { output } = await generateText({
      model: "openai/gpt-4o-mini",
      output: Output.object({
        schema: ocrResultSchema,
      }),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are an OCR assistant for a family/parenting app called Mom Hub. 
Analyze this screenshot of a message from a school, sports, or activity app. 
Extract ALL visible text and identify the key details: dates, times, locations, and action items.
If you can identify which app the message is from (SportsYou, Remind, GameChanger, TeamLinkt, GroupMe, ClassDojo, TeamReach, etc.), include that.
Create a short descriptive title summarizing the message.
Be thorough - extract every date, time, and location mentioned.`,
            },
            {
              type: "image",
              image,
            },
          ],
        },
      ],
    })

    if (!output) {
      return Response.json(
        { error: "Could not extract information from the image. Try a clearer screenshot." },
        { status: 422 }
      )
    }

    return Response.json({ result: output })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("[v0] OCR error:", message)
    
    if (message.includes("API key") || message.includes("authentication") || message.includes("Unauthorized")) {
      return Response.json(
        { error: "AI service not configured. Please set up the Vercel AI Gateway or add an OpenAI API key." },
        { status: 401 }
      )
    }

    return Response.json(
      { error: `Failed to process image: ${message}` },
      { status: 500 }
    )
  }
}
