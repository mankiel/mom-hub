"use client"

import {
  GraduationCap,
  MessageCircle,
  Star,
  TrendingUp,
  TrendingDown,
  ThumbsUp,
  BookOpen,
  Users,
  AlertCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/mom-hub/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const behaviorData = [
  { child: "Emma", initials: "EM", score: 92, trend: "up", change: 5, points: 47, streak: 12 },
  { child: "Liam", initials: "LI", score: 88, trend: "up", change: 6, points: 38, streak: 5 },
]

const recentPoints = [
  { child: "Emma", skill: "Teamwork", points: 3, teacher: "Ms. Johnson", time: "Today, 10:30 AM", positive: true },
  { child: "Emma", skill: "Helping others", points: 2, teacher: "Ms. Johnson", time: "Today, 9:15 AM", positive: true },
  { child: "Liam", skill: "On task", points: 2, teacher: "Mr. Davis", time: "Today, 11:00 AM", positive: true },
  { child: "Liam", skill: "Needs work: Talking out", points: -1, teacher: "Mr. Davis", time: "Yesterday, 2:30 PM", positive: false },
  { child: "Emma", skill: "Participation", points: 2, teacher: "Ms. Johnson", time: "Yesterday, 1:00 PM", positive: true },
  { child: "Liam", skill: "Working hard", points: 3, teacher: "Mr. Davis", time: "Yesterday, 10:45 AM", positive: true },
]

const messages = [
  { from: "Ms. Johnson", subject: "Science Fair Reminder", preview: "Just a reminder that science fair projects are due this Friday. Emma is working on a great project about plant growth...", time: "2 hours ago", unread: true },
  { from: "Mr. Davis", subject: "Field Trip Permission", preview: "We have a field trip to the Natural History Museum next Tuesday. Please sign and return the permission slip...", time: "1 day ago", unread: true },
  { from: "Ms. Johnson", subject: "Weekly Update", preview: "Emma had a wonderful week! She has been participating actively and helping her classmates...", time: "3 days ago", unread: false },
  { from: "Mr. Davis", subject: "Math Test Results", preview: "Liam did great on the fraction test! He scored 87% and showed excellent improvement from...", time: "5 days ago", unread: false },
]

export default function ClassDojoPage() {
  return (
    <DashboardLayout title="ClassDojo" subtitle="School Behavior & Communication">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Behavior</CardTitle>
            <GraduationCap className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-chart-3">
              <TrendingUp className="h-3 w-3" /> +5.5% this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Points Today</CardTitle>
            <Star className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="mt-1 text-xs text-muted-foreground">Across 2 children</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unread Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="mt-1 text-xs text-muted-foreground">From 2 teachers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Best Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="mt-1 text-xs text-muted-foreground">{"Emma's positive streak"}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="behavior" className="w-full">
        <TabsList>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="points">Recent Points</TabsTrigger>
        </TabsList>

        <TabsContent value="behavior">
          <div className="grid gap-4 md:grid-cols-2">
            {behaviorData.map((child) => (
              <Card key={child.child}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-chart-1/10 text-chart-1 font-semibold">
                        {child.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{child.child}</CardTitle>
                      <CardDescription>
                        {child.trend === "up" ? (
                          <span className="flex items-center gap-1 text-chart-3">
                            <TrendingUp className="h-3 w-3" /> Up {child.change}% this week
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-destructive">
                            <TrendingDown className="h-3 w-3" /> Down {child.change}%
                          </span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Behavior Score</span>
                      <span className="font-bold text-lg">{child.score}%</span>
                    </div>
                    <Progress value={child.score} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-xl font-bold">{child.points}</p>
                      <p className="text-xs text-muted-foreground">Points this week</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-center">
                      <p className="text-xl font-bold">{child.streak}</p>
                      <p className="text-xs text-muted-foreground">Day streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="divide-y">
                  {messages.map((msg, i) => (
                    <div key={i} className="flex gap-3 p-4 hover:bg-muted/30 transition-colors">
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarFallback className="bg-chart-1/10 text-chart-1 text-xs">
                          {msg.from.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium truncate">{msg.from}</p>
                          <span className="shrink-0 text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm font-medium mt-0.5">
                          {msg.subject}
                          {msg.unread && <Badge className="ml-2 h-4 px-1 text-[9px]">New</Badge>}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{msg.preview}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="points">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="divide-y">
                  {recentPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-3 p-4">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${point.positive ? "bg-chart-3/10 text-chart-3" : "bg-destructive/10 text-destructive"}`}>
                        {point.positive ? <ThumbsUp className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] h-5">{point.child}</Badge>
                          <p className="text-sm font-medium truncate">{point.skill}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{point.teacher} - {point.time}</p>
                      </div>
                      <span className={`font-semibold text-sm ${point.positive ? "text-chart-3" : "text-destructive"}`}>
                        {point.positive ? "+" : ""}{point.points}
                      </span>
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
