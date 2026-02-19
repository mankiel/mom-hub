// Smart import text parser
// Extracts dates, times, locations, and action items from pasted messages

export interface ParsedImport {
  source: string
  dates: string[]
  times: string[]
  locations: string[]
  actionItems: string[]
  rawText: string
  title: string
}

const SOURCE_KEYWORDS: Record<string, string[]> = {
  SportsYou: ["sportsyou", "sports you"],
  Remind: ["remind", "remindapp", "remind.com"],
  GameChanger: ["gamechanger", "game changer", "gc team"],
  TeamLinkt: ["teamlinkt", "team linkt"],
  GroupMe: ["groupme", "group me"],
  ClassDojo: ["classdojo", "class dojo", "dojo"],
  TeamReach: ["teamreach", "team reach"],
}

export function detectSource(text: string): string {
  const lower = text.toLowerCase()
  for (const [source, keywords] of Object.entries(SOURCE_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return source
    }
  }
  return "Unknown"
}

// Date patterns: "Feb 20", "February 20", "2/20", "02/20/2026", "March 3rd", etc.
const DATE_PATTERNS = [
  /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?(?:,?\s*\d{4})?\b/gi,
  /\b\d{1,2}\/\d{1,2}(?:\/\d{2,4})?\b/g,
  /\b(?:today|tomorrow|this\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)|next\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday))\b/gi,
  /\b(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)(?:,?\s+(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2})?\b/gi,
]

// Time patterns: "4:00 PM", "4pm", "4:00-5:30 PM", "16:00"
const TIME_PATTERNS = [
  /\b\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?\s*(?:-|to|–)\s*\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?\b/g,
  /\b\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)\b/g,
  /\b\d{1,2}\s*(?:AM|PM|am|pm)\b/g,
  /\b(?:at|@)\s+\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?\b/gi,
]

// Location patterns: "at [Place]", "Location: ...", "Field #", "Room ###"
const LOCATION_PATTERNS = [
  /(?:at|@)\s+([A-Z][A-Za-z0-9\s,.'#-]+?)(?:\.|$|\n|(?=\s+(?:at|on|from|starting|beginning)))/gm,
  /(?:location|place|where|address|field|venue|gym|room)[\s:]+([^\n.]+)/gi,
]

// Action item patterns: "bring", "don't forget", "RSVP", "sign up", "due by"
const ACTION_PATTERNS = [
  /(?:please\s+)?(?:bring|remember\s+to|don'?t\s+forget(?:\s+to)?|rsvp|sign\s+up|register|submit|turn\s+in|pick\s+up)\s+[^\n.!]+/gi,
  /(?:due\s+(?:by|on|before)|deadline)[:\s]+[^\n.!]+/gi,
  /(?:required|mandatory|needed)[:\s]+[^\n.!]+/gi,
]

function extractMatches(text: string, patterns: RegExp[]): string[] {
  const matches = new Set<string>()
  for (const pattern of patterns) {
    const regex = new RegExp(pattern.source, pattern.flags)
    let match
    while ((match = regex.exec(text)) !== null) {
      const value = (match[1] || match[0]).trim()
      if (value.length > 1) {
        matches.add(value)
      }
    }
  }
  return Array.from(matches)
}

function extractTitle(text: string): string {
  // Use the first meaningful line as the title
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean)
  for (const line of lines) {
    // Skip lines that look like metadata
    if (line.length > 5 && line.length < 120 && !/^(from|to|date|time|location|sent|re:|fw:)/i.test(line)) {
      return line
    }
  }
  return lines[0]?.slice(0, 80) || "Imported Item"
}

export function parseImportText(text: string): ParsedImport {
  return {
    source: detectSource(text),
    dates: extractMatches(text, DATE_PATTERNS),
    times: extractMatches(text, TIME_PATTERNS),
    locations: extractMatches(text, LOCATION_PATTERNS),
    actionItems: extractMatches(text, ACTION_PATTERNS),
    rawText: text,
    title: extractTitle(text),
  }
}
