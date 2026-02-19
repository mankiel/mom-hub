"use client"

import {
  HandHeart,
  Clock,
  Calendar,
  MapPin,
  Target,
  Users,
  CheckCircle2,
  Circle,
} from "lucide-react"
import { DashboardLayout } from "@/components/mom-hub/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

const hoursGoal = 20
const hoursLogged = 12.5

const opportunities = [
  { id: 1, title: "School Book Fair", org: "Lincoln Elementary PTA", date: "Thursday, Feb 19", time: "9:00 AM - 12:00 PM", location: "School Library", spots: 3, category: "Education" },
  { id: 2, title: "Spring Carnival Setup", org: "Lincoln Elementary PTA", date: "Friday, Mar 6", time: "3:00 PM - 6:00 PM", location: "School Gymnasium", spots: 8, category: "Events" },
  { id: 3, title: "Classroom Reading Helper", org: "Lincoln Elementary", date: "Tuesdays & Thursdays", time: "10:00 AM - 11:00 AM", location: "Room 102", spots: 2, category: "Education" },
  { id: 4, title: "Soccer Snack Coordinator", org: "Thunderbolts Team", date: "Saturdays", time: "Game days", location: "Various fields", spots: 5, category: "Sports" },
  { id: 5, title: "Community Garden Day", org: "Parks & Recreation", date: "Saturday, Mar 14", time: "8:00 AM - 12:00 PM", location: "Community Garden", spots: 15, category: "Community" },
]

const loggedHours = [
  { id: 1, activity: "Library Reading Program", org: "Lincoln Elementary", date: "Feb 11, 2026", hours: 2.5, verified: true },
  { id: 2, activity: "Classroom Volunteer", org: "Lincoln Elementary", date: "Feb 6, 2026", hours: 2.0, verified: true },
  { id: 3, activity: "Soccer Team Snacks", org: "Thunderbolts", date: "Feb 1, 2026", hours: 1.5, verified: true },
  { id: 4, activity: "PTA Meeting", org: "Lincoln Elementary PTA", date: "Jan 28, 2026", hours: 1.5, verified: true },
  { id: 5, activity: "Winter Festival Booth", org: "Lincoln Elementary PTA", date: "Jan 17, 2026", hours: 3.0, verified: true },
  { id: 6, activity: "Library Reading Program", org: "Lincoln Elementary", date: "Jan 14, 2026", hours: 2.0, verified: true },
]

const signedUp = [
  { id: 1, title: "School Book Fair", date: "Thursday, Feb 19", time: "9:00 AM - 12:00 PM", status: "confirmed" },
  { id: 2, title: "Spring Carnival Setup", date: "Friday, Mar 6", time: "3:00 PM - 6:00 PM", status: "pending" },
]

export default function GetConnectedPage() {
  const progressPct = Math.min((hoursLogged / hoursGoal) * 100, 100)

  return (
    <DashboardLayout title="GetConnected" subtitle="Volunteering & Community">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hours Logged</CardTitle>
            <Clock className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hoursLogged}</div>
            <p className="mt-1 text-xs text-muted-foreground">of {hoursGoal} hrs semester goal</p>
            <Progress value={progressPct} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Opportunities</CardTitle>
            <HandHeart className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunities.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">Available near you</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Signed Up</CardTitle>
            <Calendar className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{signedUp.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">Upcoming commitments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Goal Progress</CardTitle>
            <Target className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(progressPct)}%</div>
            <p className="mt-1 text-xs text-muted-foreground">{hoursGoal - hoursLogged} hrs remaining</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="w-full">
        <TabsList>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="scheduled">My Sign-ups</TabsTrigger>
          <TabsTrigger value="history">Hours Log</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities">
          <div className="grid gap-4 md:grid-cols-2">
            {opportunities.map((opp) => (
              <Card key={opp.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">{opp.title}</CardTitle>
                      <CardDescription>{opp.org}</CardDescription>
                    </div>
                    <Badge variant="outline" className="shrink-0 text-xs">{opp.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 shrink-0" />{opp.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-3 w-3 shrink-0" />{opp.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 shrink-0" />{opp.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-3 w-3 shrink-0" />{opp.spots} spots available
                    </span>
                  </div>
                  <Button size="sm" className="mt-4 w-full">Sign Up</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {signedUp.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      item.status === "confirmed" ? "bg-chart-3/10 text-chart-3" : "bg-chart-2/10 text-chart-2"
                    }`}>
                      {item.status === "confirmed" ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{item.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{item.time}</span>
                      </div>
                    </div>
                    <Badge variant={item.status === "confirmed" ? "default" : "secondary"}>
                      {item.status === "confirmed" ? "Confirmed" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="divide-y">
                  {loggedHours.map((entry) => (
                    <div key={entry.id} className="flex items-center gap-4 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chart-3/10 text-chart-3">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{entry.activity}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{entry.org} - {entry.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{entry.hours} hrs</p>
                        {entry.verified && (
                          <span className="text-[10px] text-chart-3">Verified</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
