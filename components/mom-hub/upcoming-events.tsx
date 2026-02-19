"use client"

import {
  GraduationCap,
  Trophy,
  HandHeart,
  MapPin,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Soccer Practice",
    source: "GameChanger",
    icon: Trophy,
    color: "bg-chart-2/10 text-chart-2",
    borderColor: "border-l-chart-2",
    date: "Today",
    time: "4:00 PM - 5:30 PM",
    location: "Memorial Field",
    child: "Liam",
  },
  {
    id: 2,
    title: "Parent-Teacher Conference",
    source: "ClassDojo",
    icon: GraduationCap,
    color: "bg-chart-1/10 text-chart-1",
    borderColor: "border-l-chart-1",
    date: "Tomorrow",
    time: "3:30 PM - 4:00 PM",
    location: "Room 204",
    child: "Emma",
  },
  {
    id: 3,
    title: "Book Fair Volunteering",
    source: "GetConnected",
    icon: HandHeart,
    color: "bg-chart-3/10 text-chart-3",
    borderColor: "border-l-chart-3",
    date: "Thursday",
    time: "9:00 AM - 12:00 PM",
    location: "School Library",
    child: null,
  },
  {
    id: 4,
    title: "Soccer Game vs. Eagles",
    source: "GameChanger",
    icon: Trophy,
    color: "bg-chart-2/10 text-chart-2",
    borderColor: "border-l-chart-2",
    date: "Saturday",
    time: "11:00 AM",
    location: "Eagle Park, Field 3",
    child: "Liam",
  },
  {
    id: 5,
    title: "Science Fair",
    source: "ClassDojo",
    icon: GraduationCap,
    color: "bg-chart-1/10 text-chart-1",
    borderColor: "border-l-chart-1",
    date: "Next Friday",
    time: "1:00 PM - 3:00 PM",
    location: "School Gym",
    child: "Emma",
  },
]

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Upcoming Events</CardTitle>
          <Badge variant="secondary" className="text-xs">
            This week
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {events.map((event) => (
            <div
              key={event.id}
              className={`flex gap-3 rounded-lg border-l-2 ${event.borderColor} bg-muted/30 p-3`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${event.color}`}
              >
                <event.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{event.title}</p>
                  <span className="shrink-0 text-xs font-medium text-primary">
                    {event.date}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </span>
                </div>
                {event.child && (
                  <Badge variant="outline" className="mt-1 h-5 px-1.5 text-[10px]">
                    {event.child}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
