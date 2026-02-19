"use client"

import { useState, useCallback, useRef } from "react"
import { DashboardLayout } from "@/components/mom-hub/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ClipboardPaste,
  Camera,
  CalendarPlus,
  MapPin,
  Clock,
  Calendar,
  ListChecks,
  Tag,
  Upload,
  FileImage,
  Link2,
  Check,
  X,
  Loader2,
  AlertCircle,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { parseImportText, type ParsedImport } from "@/lib/parse-import"
import { parseICS, type ICSEvent } from "@/lib/parse-ics"

// ─── Saved items store (demo state) ──────────────────────────────────────────

interface SavedItem {
  id: string
  type: "event" | "task" | "notification"
  title: string
  source: string
  date?: string
  time?: string
  location?: string
  savedAt: string
}

// ─── Tab A: Smart Text Import ────────────────────────────────────────────────

function TextImportTab() {
  const [text, setText] = useState("")
  const [parsed, setParsed] = useState<ParsedImport | null>(null)
  const [saved, setSaved] = useState<SavedItem[]>([])

  function handleParse() {
    if (!text.trim()) return
    const result = parseImportText(text)
    setParsed(result)
  }

  function handleSave(type: "event" | "task" | "notification") {
    if (!parsed) return
    const item: SavedItem = {
      id: crypto.randomUUID(),
      type,
      title: parsed.title,
      source: parsed.source,
      date: parsed.dates[0],
      time: parsed.times[0],
      location: parsed.locations[0],
      savedAt: new Date().toLocaleTimeString(),
    }
    setSaved((prev) => [item, ...prev])
    setParsed(null)
    setText("")
  }

  const PLACEHOLDER = `Paste a message from any app here. For example:

"Reminder from Coach Mike: Soccer practice moved to Thursday, March 6th at 4:30 PM at Lincoln Field. Please bring cleats and water bottle. RSVP by Wednesday."

Mom Hub will extract the date, time, location, and action items automatically.`

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardPaste className="h-4 w-4 text-primary" />
            Paste Message
          </CardTitle>
          <CardDescription>
            Paste text from SportsYou, Remind, GameChanger, TeamLinkt, GroupMe, ClassDojo, or TeamReach.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={6}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleParse} disabled={!text.trim()} className="gap-2">
              <ListChecks className="h-4 w-4" />
              Extract Info
            </Button>
            {text.trim() && (
              <Button variant="ghost" size="sm" onClick={() => { setText(""); setParsed(null) }}>
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {parsed && (
        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">{parsed.title}</CardTitle>
                <CardDescription className="mt-1">Review extracted information below</CardDescription>
              </div>
              <Badge variant="secondary" className="shrink-0">{parsed.source}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <ExtractedField
                icon={Calendar}
                label="Dates"
                items={parsed.dates}
                emptyText="No dates found"
              />
              <ExtractedField
                icon={Clock}
                label="Times"
                items={parsed.times}
                emptyText="No times found"
              />
              <ExtractedField
                icon={MapPin}
                label="Locations"
                items={parsed.locations}
                emptyText="No locations found"
              />
              <ExtractedField
                icon={ListChecks}
                label="Action Items"
                items={parsed.actionItems}
                emptyText="No action items found"
              />
            </div>

            <div className="flex flex-wrap gap-2 border-t pt-4">
              <span className="text-sm text-muted-foreground mr-1 self-center">Save as:</span>
              <Button size="sm" onClick={() => handleSave("event")} className="gap-1.5">
                <CalendarPlus className="h-3.5 w-3.5" />
                Event
              </Button>
              <Button size="sm" variant="secondary" onClick={() => handleSave("task")} className="gap-1.5">
                <ListChecks className="h-3.5 w-3.5" />
                Task
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleSave("notification")} className="gap-1.5">
                <Tag className="h-3.5 w-3.5" />
                Notification
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {saved.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recently Imported</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {saved.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-lg bg-muted/40 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize">{item.type}</Badge>
                      <span className="text-[10px] text-muted-foreground">{item.source}</span>
                      {item.date && <span className="text-[10px] text-muted-foreground">{item.date}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ExtractedField({
  icon: Icon,
  label,
  items,
  emptyText,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  items: string[]
  emptyText: string
}) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      {items.length > 0 ? (
        <div className="flex flex-col gap-1">
          {items.map((item, i) => (
            <span key={i} className="text-sm">{item}</span>
          ))}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground/60">{emptyText}</span>
      )}
    </div>
  )
}

// ─── Tab B: Screenshot Upload → OCR ──────────────────────────────────────────

function ScreenshotTab() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState("")
  const [processing, setProcessing] = useState(false)
  const [ocrResult, setOcrResult] = useState<ParsedImport | null>(null)
  const [saved, setSaved] = useState<SavedItem[]>([])
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string)
      setOcrResult(null)
    }
    reader.readAsDataURL(file)
  }, [])

  function simulateOCR() {
    if (!imageUrl) return
    setProcessing(true)
    // Simulate processing delay
    setTimeout(() => {
      // Simulated OCR result based on the idea of a pasted screenshot
      const simulatedText = `Soccer practice reminder from Coach Mike via GameChanger.
Practice moved to Thursday, March 6th at 4:30 PM.
Location: Lincoln Memorial Field, Field #3.
Please bring cleats, shin guards, and water bottle.
RSVP by Wednesday so we can plan accordingly.`
      const result = parseImportText(simulatedText)
      setOcrResult(result)
      setProcessing(false)
    }, 1500)
  }

  function handleSave(type: "event" | "task" | "notification") {
    if (!ocrResult) return
    const item: SavedItem = {
      id: crypto.randomUUID(),
      type,
      title: ocrResult.title,
      source: ocrResult.source,
      date: ocrResult.dates[0],
      time: ocrResult.times[0],
      location: ocrResult.locations[0],
      savedAt: new Date().toLocaleTimeString(),
    }
    setSaved((prev) => [item, ...prev])
    setOcrResult(null)
    setImageUrl(null)
    setFileName("")
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Camera className="h-4 w-4 text-primary" />
            Upload Screenshot
          </CardTitle>
          <CardDescription>
            Screenshot a message or post from any app, and Mom Hub will extract the key details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!imageUrl ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-colors",
                dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Drop an image here or click to browse</p>
                <p className="mt-1 text-xs text-muted-foreground">Supports PNG, JPG, WEBP</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="relative overflow-hidden rounded-lg border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Uploaded screenshot"
                  className="max-h-64 w-full object-contain bg-muted/20"
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <FileImage className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground truncate">{fileName}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => { setImageUrl(null); setFileName(""); setOcrResult(null) }}>
                    <X className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={simulateOCR} disabled={processing} className="gap-1.5">
                    {processing ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ListChecks className="h-3.5 w-3.5" />
                        Extract Text
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {ocrResult && (
        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <CardTitle className="text-base">{ocrResult.title}</CardTitle>
                <CardDescription className="mt-1">Extracted from screenshot</CardDescription>
              </div>
              <Badge variant="secondary" className="shrink-0">{ocrResult.source}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-lg border bg-muted/20 p-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Extracted Text</p>
              <p className="text-sm whitespace-pre-line">{ocrResult.rawText}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <ExtractedField icon={Calendar} label="Dates" items={ocrResult.dates} emptyText="No dates found" />
              <ExtractedField icon={Clock} label="Times" items={ocrResult.times} emptyText="No times found" />
              <ExtractedField icon={MapPin} label="Locations" items={ocrResult.locations} emptyText="No locations found" />
              <ExtractedField icon={ListChecks} label="Action Items" items={ocrResult.actionItems} emptyText="No action items found" />
            </div>

            <div className="flex flex-wrap gap-2 border-t pt-4">
              <span className="text-sm text-muted-foreground mr-1 self-center">Save as:</span>
              <Button size="sm" onClick={() => handleSave("event")} className="gap-1.5">
                <CalendarPlus className="h-3.5 w-3.5" />
                Event
              </Button>
              <Button size="sm" variant="secondary" onClick={() => handleSave("task")} className="gap-1.5">
                <ListChecks className="h-3.5 w-3.5" />
                Task
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleSave("notification")} className="gap-1.5">
                <Tag className="h-3.5 w-3.5" />
                Notification
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {saved.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recently Imported</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {saved.map((item) => (
                <div key={item.id} className="flex items-center gap-3 rounded-lg bg-muted/40 p-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize">{item.type}</Badge>
                      <span className="text-[10px] text-muted-foreground">{item.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ─── Tab C: Calendar Links (ICS) ────────────────────────────────────────────

const SAMPLE_ICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//GameChanger//Schedule//EN
BEGIN:VEVENT
UID:gc-001@gamechanger.com
DTSTART:20260307T110000
DTEND:20260307T130000
SUMMARY:Soccer Game vs Eagles
DESCRIPTION:Thunderbolts vs Eagles - arrive 30 min early for warmup
LOCATION:Eagle Park, Field 3
END:VEVENT
BEGIN:VEVENT
UID:gc-002@gamechanger.com
DTSTART:20260310T163000
DTEND:20260310T180000
SUMMARY:Soccer Practice
DESCRIPTION:Regular practice - bring water and cleats
LOCATION:Lincoln Memorial Field
END:VEVENT
BEGIN:VEVENT
UID:gc-003@gamechanger.com
DTSTART:20260314T090000
DTEND:20260314T150000
SUMMARY:Spring Tournament - Day 1
DESCRIPTION:First day of spring tournament. Schedule TBD based on bracket.
LOCATION:Metro Sports Complex
END:VEVENT
END:VCALENDAR`

function CalendarLinksTab() {
  const [url, setUrl] = useState("")
  const [icsText, setIcsText] = useState("")
  const [events, setEvents] = useState<ICSEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [imported, setImported] = useState<string[]>([])

  function handleFetchICS() {
    if (!url.trim()) return
    setLoading(true)
    setError("")
    // Simulate fetching an ICS file (can't do real CORS fetch in demo)
    setTimeout(() => {
      const parsed = parseICS(SAMPLE_ICS)
      setEvents(parsed)
      setIcsText(SAMPLE_ICS)
      setLoading(false)
    }, 1000)
  }

  function handlePasteICS() {
    if (!icsText.trim()) return
    setError("")
    try {
      const parsed = parseICS(icsText)
      if (parsed.length === 0) {
        setError("No events found in the ICS data. Make sure it contains VEVENT blocks.")
        return
      }
      setEvents(parsed)
    } catch {
      setError("Failed to parse ICS data. Please check the format.")
    }
  }

  function handleImportEvent(uid: string) {
    setImported((prev) => [...prev, uid])
  }

  function handleImportAll() {
    setImported(events.map((e) => e.uid))
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Link2 className="h-4 w-4 text-primary" />
            Import Calendar (ICS)
          </CardTitle>
          <CardDescription>
            Paste an ICS calendar URL or the ICS file contents directly. Many sports and school apps offer ICS calendar exports.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Calendar URL</label>
            <div className="flex gap-2">
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/calendar.ics"
                className="flex-1"
              />
              <Button onClick={handleFetchICS} disabled={!url.trim() || loading} className="gap-1.5 shrink-0">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4" />}
                Fetch
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or paste ICS content</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">ICS Content</label>
            <textarea
              value={icsText}
              onChange={(e) => setIcsText(e.target.value)}
              placeholder={`Paste ICS calendar content here...\n\nBEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\n...`}
              rows={5}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 font-mono text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
            />
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={handlePasteICS} disabled={!icsText.trim()} className="gap-1.5">
                <ListChecks className="h-4 w-4" />
                Parse Events
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setIcsText(SAMPLE_ICS) }}>
                Load sample
              </Button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {events.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Found {events.length} Event{events.length !== 1 ? "s" : ""}
              </CardTitle>
              {imported.length < events.length && (
                <Button size="sm" variant="secondary" onClick={handleImportAll} className="gap-1.5">
                  <CalendarPlus className="h-3.5 w-3.5" />
                  Import All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {events.map((event) => {
                const isImported = imported.includes(event.uid)
                return (
                  <div
                    key={event.uid}
                    className={cn(
                      "flex items-start gap-3 rounded-lg border p-3 transition-colors",
                      isImported ? "bg-primary/5 border-primary/20" : "hover:bg-muted/30"
                    )}
                  >
                    <div className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      isImported ? "bg-primary" : "bg-primary/10"
                    )}>
                      {isImported ? (
                        <Check className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Calendar className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{event.summary}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        {event.dtstart && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.dtstart}{event.dtend ? ` - ${event.dtend}` : ""}
                          </span>
                        )}
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        )}
                      </div>
                      {event.description && (
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                      )}
                    </div>
                    {!isImported && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleImportEvent(event.uid)}
                        className="shrink-0 gap-1"
                      >
                        <ChevronRight className="h-4 w-4" />
                        Import
                      </Button>
                    )}
                    {isImported && (
                      <Badge className="shrink-0 bg-primary/10 text-primary hover:bg-primary/10">Imported</Badge>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ─── Main Import Page ────────────────────────────────────────────────────────

export default function ImportPage() {
  return (
    <DashboardLayout title="Smart Import" subtitle="Import from any app">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-balance">
          Import Events and Tasks
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste text, upload a screenshot, or import a calendar link to add events and tasks.
        </p>
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="text" className="gap-1.5">
            <ClipboardPaste className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Text Import</span>
            <span className="sm:hidden">Text</span>
          </TabsTrigger>
          <TabsTrigger value="screenshot" className="gap-1.5">
            <Camera className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Screenshot</span>
            <span className="sm:hidden">Photo</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-1.5">
            <CalendarPlus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Calendar (ICS)</span>
            <span className="sm:hidden">ICS</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="mt-4">
          <TextImportTab />
        </TabsContent>
        <TabsContent value="screenshot" className="mt-4">
          <ScreenshotTab />
        </TabsContent>
        <TabsContent value="calendar" className="mt-4">
          <CalendarLinksTab />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
