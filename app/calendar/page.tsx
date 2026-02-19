"use client"

import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  GraduationCap,
  Trophy,
  HandHeart,
  AlertCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/mom-hub/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const upcomingEvents = [
  {
    id: 1,
    title: "Soccer Practice",
    type: "sports",
    date: "Today",
    time: "4:00 PM - 5:30 PM",
    location: "Memorial Field",
    child: "Liam",
    source: "GameChanger",
    icon: Trophy,
  },
  {
    id: 2,
    title: "Parent-Teacher Conference",
    type: "school",
    date: "Tomorrow",
    time: "3:30 PM - 4:00 PM",
    location: "Room 204",
    child: "Emma",
    source: "ClassDojo",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "Book Fair Volunteering",
    type: "volunteer",
    date: "Thursday",
    time: "9:00 AM - 12:00 PM",
    location: "School Library",
    child: "Both",
    source: "GetConnected",
    icon: HandHeart,
  },
  {
    id: 4,
    title: "Soccer Game vs. Eagles",
    type: "sports",
    date: "Saturday",
    time: "11:00 AM",
    location: "Eagle Park, Field 3",
    child: "Liam",
    source: "GameChanger",
    icon: Trophy,
  },
  {
    id: 5,
    title: "Science Fair",
    type: "school",
    date: "Next Friday",
    time: "1:00 PM - 3:00 PM",
    location: "School Gym",
    child: "Emma",
    source: "ClassDojo",
    icon: GraduationCap,
  },
]

const todayEvents = upcomingEvents.filter(e => e.date === "Today")
const weekEvents = upcomingEvents.filter(e => e.date !== "Today")

const eventsByChild = {
  Emma: upcomingEvents.filter(e => e.child === "Emma" || e.child === "Both"),
  Liam: upcomingEvents.filter(e => e.child === "Liam" || e.child === "Both"),
}

export default function CalendarPage() {
  return (
    <DashboardLayout title="Calendar" subtitle="Upcoming Events & Schedule">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Events This Week</CardTitle>
            <CalendarDays className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">{todayEvents.length} today, {weekEvents.length} upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">School Events</CardTitle>
            <GraduationCap className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingEvents.filter(e => e.type === "school").length}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Academic & meetings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sports Events</CardTitle>
            <Trophy className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingEvents.filter(e => e.type === "sports").length}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Games & practices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Volunteer</CardTitle>
            <HandHeart className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {upcomingEvents.filter(e => e.type === "volunteer").length}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Opportunities</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="emma">Emma</TabsTrigger>
          <TabsTrigger value="liam">Liam</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="divide-y">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-4 p-4 hover:bg-muted/30 transition-colors">
                      <div className={\`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg \${
                        event.type === "school" ? "bg-chart-1/10 text-chart-1" :
                        event.type === "sports" ? "bg-chart-2/10 text-chart-2" :
                        "bg-chart-4/10 text-chart-4"
                      }\`}>
                        <event.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold">{event.title}</p>
                          <Badge variant="outline" className="text-[10px] h-5">{event.child}</Badge>
                        </div>
                        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                          <p className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {event.date}
                          </p>
                          <p className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Source: {event.source}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emma">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-chart-1/10 text-chart-1 font-semibold">EM</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{"Emma's Schedule"}</CardTitle>
                  <CardDescription>{eventsByChild.Emma.length} upcoming events</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {eventsByChild.Emma.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4">
                    <div className={\`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg \${
                      event.type === "school" ? "bg-chart-1/10 text-chart-1" :
                      event.type === "sports" ? "bg-chart-2/10 text-chart-2" :
                      "bg-chart-4/10 text-chart-4"
                    }\`}>
                      <event.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{event.title}</p>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />{event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />{event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liam">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-chart-2/10 text-chart-2 font-semibold">LI</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{"Liam's Schedule"}</CardTitle>
                  <CardDescription>{eventsByChild.Liam.length} upcoming events</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {eventsByChild.Liam.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4">
                    <div className={\`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg \${
                      event.type === "school" ? "bg-chart-1/10 text-chart-1" :
                      event.type === "sports" ? "bg-chart-2/10 text-chart-2" :
                      "bg-chart-4/10 text-chart-4"
                    }\`}>
                      <event.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{event.title}</p>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />{event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />{event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
