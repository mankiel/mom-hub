"use client"

import {
  Bell,
  GraduationCap,
  Trophy,
  HandHeart,
  MessageCircle,
  Calendar,
  Star,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/mom-hub/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const notifications = [
  {
    id: 1,
    type: "message",
    source: "ClassDojo",
    icon: MessageCircle,
    color: "chart-1",
    title: "New message from Ms. Johnson",
    description: "Reminder about the science fair project due Friday",
    time: "15 minutes ago",
    unread: true,
    child: "Emma",
  },
  {
    id: 2,
    type: "points",
    source: "ClassDojo",
    icon: Star,
    color: "chart-3",
    title: "Emma earned 3 points",
    description: "Excellent teamwork in math class",
    time: "1 hour ago",
    unread: true,
    child: "Emma",
  },
  {
    id: 3,
    type: "event",
    source: "GameChanger",
    icon: Calendar,
    color: "chart-2",
    title: "Game schedule updated",
    description: "Saturday Soccer vs. Eagles moved to 11am",
    time: "2 hours ago",
    unread: true,
    child: "Liam",
  },
  {
    id: 4,
    type: "volunteer",
    source: "GetConnected",
    icon: HandHeart,
    color: "chart-4",
    title: "New volunteer opportunity",
    description: "School Book Fair - needs 5 volunteers this Thursday",
    time: "3 hours ago",
    unread: false,
    child: "Both",
  },
  {
    id: 5,
    type: "achievement",
    source: "GameChanger",
    icon: Trophy,
    color: "chart-2",
    title: "Liam - Player of the Game",
    description: "2 goals in last Saturday's match vs. Hawks",
    time: "1 day ago",
    unread: false,
    child: "Liam",
  },
  {
    id: 6,
    type: "report",
    source: "ClassDojo",
    icon: GraduationCap,
    color: "chart-1",
    title: "Weekly behavior report ready",
    description: "Liam scored 88% this week, up from 82% last week",
    time: "1 day ago",
    unread: false,
    child: "Liam",
  },
  {
    id: 7,
    type: "hours",
    source: "GetConnected",
    icon: CheckCircle,
    color: "chart-3",
    title: "Hours logged: 2.5 hrs",
    description: "Library Reading Program on Tuesday",
    time: "2 days ago",
    unread: false,
    child: "Both",
  },
  {
    id: 8,
    type: "message",
    source: "ClassDojo",
    icon: MessageCircle,
    color: "chart-1",
    title: "New message from Mr. Davis",
    description: "Great job on the math test!",
    time: "2 days ago",
    unread: false,
    child: "Liam",
  },
]

const unreadCount = notifications.filter(n => n.unread).length
const bySource = {
  ClassDojo: notifications.filter(n => n.source === "ClassDojo"),
  GameChanger: notifications.filter(n => n.source === "GameChanger"),
  GetConnected: notifications.filter(n => n.source === "GetConnected"),
}

export default function NotificationsPage() {
  return (
    <DashboardLayout title="Notifications" subtitle="Recent Updates & Alerts">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unread</CardTitle>
            <Bell className="h-4 w-4 text-chart-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">New notifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ClassDojo</CardTitle>
            <GraduationCap className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bySource.ClassDojo.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">School updates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">GameChanger</CardTitle>
            <Trophy className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bySource.GameChanger.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">Sports updates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">GetConnected</CardTitle>
            <HandHeart className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bySource.GetConnected.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">Volunteer updates</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="classdojo">ClassDojo</TabsTrigger>
          <TabsTrigger value="gamechanger">GameChanger</TabsTrigger>
          <TabsTrigger value="getconnected">GetConnected</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="divide-y">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={\`flex items-start gap-4 p-4 hover:bg-muted/30 transition-colors \${notif.unread ? "bg-muted/20" : ""}\`}
                    >
                      <div className={\`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-\${notif.color}/10 text-\${notif.color}\`}>
                        <notif.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold">{notif.title}</p>
                          {notif.unread && <Badge className="h-4 px-1 text-[9px]">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notif.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline" className="text-[10px] h-5">{notif.source}</Badge>
                          <Badge variant="outline" className="text-[10px] h-5">{notif.child}</Badge>
                          <span className="text-xs text-muted-foreground">{notif.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.filter(n => n.unread).map((notif) => (
                  <div 
                    key={notif.id} 
                    className="flex items-start gap-4 p-4 bg-muted/20"
                  >
                    <div className={\`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-\${notif.color}/10 text-\${notif.color}\`}>
                      <notif.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold">{notif.title}</p>
                        <Badge className="h-4 px-1 text-[9px]">New</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notif.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant="outline" className="text-[10px] h-5">{notif.source}</Badge>
                        <Badge variant="outline" className="text-[10px] h-5">{notif.child}</Badge>
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classdojo">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10">
                  <GraduationCap className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <CardTitle className="text-base">ClassDojo Notifications</CardTitle>
                  <CardDescription>{bySource.ClassDojo.length} notifications</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {bySource.ClassDojo.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={\`flex items-start gap-4 p-4 \${notif.unread ? "bg-muted/20" : ""}\`}
                  >
                    <div className={\`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-\${notif.color}/10 text-\${notif.color}\`}>
                      <notif.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{notif.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{notif.description}</p>
                      <span className="text-xs text-muted-foreground mt-1 inline-block">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gamechanger">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                  <Trophy className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <CardTitle className="text-base">GameChanger Notifications</CardTitle>
                  <CardDescription>{bySource.GameChanger.length} notifications</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {bySource.GameChanger.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={\`flex items-start gap-4 p-4 \${notif.unread ? "bg-muted/20" : ""}\`}
                  >
                    <div className={\`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-\${notif.color}/10 text-\${notif.color}\`}>
                      <notif.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{notif.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{notif.description}</p>
                      <span className="text-xs text-muted-foreground mt-1 inline-block">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="getconnected">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                  <HandHeart className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <CardTitle className="text-base">GetConnected Notifications</CardTitle>
                  <CardDescription>{bySource.GetConnected.length} notifications</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {bySource.GetConnected.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={\`flex items-start gap-4 p-4 \${notif.unread ? "bg-muted/20" : ""}\`}
                  >
                    <div className={\`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-\${notif.color}/10 text-\${notif.color}\`}>
                      <notif.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{notif.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{notif.description}</p>
                      <span className="text-xs text-muted-foreground mt-1 inline-block">{notif.time}</span>
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
