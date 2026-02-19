"use client"

import { DashboardLayout } from "@/components/mom-hub/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, GraduationCap, Trophy, HandHeart } from "lucide-react"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const CURRENT_MONTH = new Date().toLocaleString("en-US", { month: "long", year: "numeric" })

function getDaysInMonth() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = now.getDate()
  return { firstDay, daysInMonth, today }
}

const EVENTS = [
  { day: 3, title: "Parent-Teacher Conference", source: "ClassDojo", color: "bg-chart-1", icon: GraduationCap },
  { day: 5, title: "Soccer Practice", source: "GameChanger", color: "bg-chart-2", icon: Trophy },
  { day: 8, title: "Library Volunteer Shift", source: "GetConnected", color: "bg-chart-3", icon: HandHeart },
  { day: 10, title: "Math Test", source: "ClassDojo", color: "bg-chart-1", icon: GraduationCap },
  { day: 12, title: "Soccer Game vs Eagles", source: "GameChanger", color: "bg-chart-2", icon: Trophy },
  { day: 15, title: "Science Fair Setup", source: "GetConnected", color: "bg-chart-3", icon: HandHeart },
  { day: 18, title: "Report Cards Released", source: "ClassDojo", color: "bg-chart-1", icon: GraduationCap },
  { day: 20, title: "Soccer Tournament", source: "GameChanger", color: "bg-chart-2", icon: Trophy },
  { day: 22, title: "Book Drive Volunteer", source: "GetConnected", color: "bg-chart-3", icon: HandHeart },
  { day: 25, title: "Field Trip Permission Due", source: "ClassDojo", color: "bg-chart-1", icon: GraduationCap },
  { day: 27, title: "Soccer Practice", source: "GameChanger", color: "bg-chart-2", icon: Trophy },
]

export default function CalendarPage() {
  const { firstDay, daysInMonth, today } = getDaysInMonth()
  const eventsByDay = EVENTS.reduce<Record<number, typeof EVENTS>>((acc, e) => {
    if (!acc[e.day]) acc[e.day] = []
    acc[e.day].push(e)
    return acc
  }, {})

  return (
    <DashboardLayout title="Calendar" subtitle={CURRENT_MONTH}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="h-4 w-4 text-primary" />
              {CURRENT_MONTH}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px rounded-lg border bg-border overflow-hidden">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="bg-muted px-1 py-1.5 md:px-2 md:py-2 text-center text-[10px] md:text-xs font-medium text-muted-foreground"
                >
                  <span className="md:hidden">{day.charAt(0)}</span>
                  <span className="hidden md:inline">{day}</span>
                </div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-card min-h-10 md:min-h-20 p-1" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dayEvents = eventsByDay[day] || []
                const isToday = day === today
                return (
                  <div
                    key={day}
                    className={`bg-card min-h-10 md:min-h-20 p-1 md:p-1.5 ${isToday ? "ring-2 ring-primary ring-inset" : ""}`}
                  >
                    <span
                      className={`inline-flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full text-[10px] md:text-xs font-medium ${
                        isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                      }`}
                    >
                      {day}
                    </span>
                    {/* Mobile: colored dots */}
                    <div className="mt-0.5 flex flex-wrap gap-0.5 md:hidden">
                      {dayEvents.map((event, j) => (
                        <span
                          key={j}
                          className={`${event.color} h-1.5 w-1.5 rounded-full`}
                        />
                      ))}
                    </div>
                    {/* Desktop: full event labels */}
                    <div className="mt-0.5 space-y-0.5 hidden md:block">
                      {dayEvents.map((event, j) => (
                        <div
                          key={j}
                          className={`${event.color} truncate rounded px-1 py-0.5 text-[10px] font-medium text-primary-foreground`}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {EVENTS.filter((e) => e.day >= today)
                .slice(0, 6)
                .map((event, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${event.color}`}>
                      <event.icon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium">{event.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">Day {event.day}</span>
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {event.source}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-chart-1" />
                <span className="text-sm text-muted-foreground">ClassDojo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-chart-2" />
                <span className="text-sm text-muted-foreground">GameChanger</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-chart-3" />
                <span className="text-sm text-muted-foreground">GetConnected</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
