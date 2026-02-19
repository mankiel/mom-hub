// Simple ICS (iCalendar) parser for extracting events from .ics files/URLs

export interface ICSEvent {
  uid: string
  summary: string
  description: string
  dtstart: string
  dtend: string
  location: string
  organizer: string
}

function parseICSDate(value: string): string {
  // Handle formats: 20260220T160000Z or 20260220T160000 or 20260220
  const clean = value.replace(/^.*:/, "") // remove any prefix like TZID=...
  const match = clean.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2}))?/)
  if (!match) return value

  const [, year, month, day, hours, minutes] = match
  const date = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    hours ? parseInt(hours) : 0,
    minutes ? parseInt(minutes) : 0
  )

  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(hours ? { hour: "numeric", minute: "2-digit" } : {}),
  })
}

function unfoldLines(text: string): string {
  // ICS spec: lines can be folded with a CRLF followed by a space/tab
  return text.replace(/\r?\n[ \t]/g, "")
}

export function parseICS(icsText: string): ICSEvent[] {
  const events: ICSEvent[] = []
  const unfolded = unfoldLines(icsText)
  const lines = unfolded.split(/\r?\n/)

  let inEvent = false
  let current: Partial<ICSEvent> = {}

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      inEvent = true
      current = {}
      continue
    }

    if (line === "END:VEVENT") {
      inEvent = false
      events.push({
        uid: current.uid || crypto.randomUUID(),
        summary: current.summary || "Untitled Event",
        description: current.description || "",
        dtstart: current.dtstart || "",
        dtend: current.dtend || "",
        location: current.location || "",
        organizer: current.organizer || "",
      })
      continue
    }

    if (!inEvent) continue

    const colonIdx = line.indexOf(":")
    if (colonIdx === -1) continue

    const keyPart = line.slice(0, colonIdx)
    const value = line.slice(colonIdx + 1).trim()

    // Strip parameters from key (e.g. DTSTART;TZID=America/New_York)
    const key = keyPart.split(";")[0].toUpperCase()

    switch (key) {
      case "UID":
        current.uid = value
        break
      case "SUMMARY":
        current.summary = value.replace(/\\n/g, " ").replace(/\\,/g, ",")
        break
      case "DESCRIPTION":
        current.description = value.replace(/\\n/g, "\n").replace(/\\,/g, ",")
        break
      case "DTSTART":
        current.dtstart = parseICSDate(value)
        break
      case "DTEND":
        current.dtend = parseICSDate(value)
        break
      case "LOCATION":
        current.location = value.replace(/\\n/g, " ").replace(/\\,/g, ",")
        break
      case "ORGANIZER":
        current.organizer = value.replace(/mailto:/i, "")
        break
    }
  }

  return events
}
