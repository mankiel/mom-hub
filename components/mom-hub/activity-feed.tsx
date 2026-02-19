"use client"

import {
  GraduationCap,
  Trophy,
  HandHeart,
  MessageCircle,
  Star,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    source: "ClassDojo",
    icon: GraduationCap,
    color: "bg-chart-1/10 text-chart-1",
    title: "Emma earned 3 points",
    description: "Excellent teamwork in math class",
    time: "15 min ago",
    child: "Emma",
  },
  {
    id: 2,
    source: "GameChanger",
    icon: Trophy,
    color: "bg-chart-2/10 text-chart-2",
    title: "Game schedule updated",
    description: "Saturday Soccer vs. Eagles moved to 11am",
    time: "1 hour ago",
    child: "Liam",
  },
  {
    id: 3,
    source: "ClassDojo",
    icon: MessageCircle,
    color: "bg-chart-1/10 text-chart-1",
    title: "New message from Ms. Johnson",
    description: "Reminder about the science fair project due Friday",
    time: "2 hours ago",
    child: "Emma",
  },
  {
    id: 4,
    source: "GetConnected",
    icon: HandHeart,
    color: "bg-chart-3/10 text-chart-3",
    title: "New volunteer opportunity",
    description: "School Book Fair - needs 5 volunteers this Thursday",
    time: "3 hours ago",
    child: null,
  },
  {
    id: 5,
    source: "GameChanger",
    icon: Star,
    color: "bg-chart-2/10 text-chart-2",
    title: "Liam - Player of the Game",
    description: "2 goals in last Saturday's match vs. Hawks",
    time: "1 day ago",
    child: "Liam",
  },
  {
    id: 6,
    source: "ClassDojo",
    icon: GraduationCap,
    color: "bg-chart-1/10 text-chart-1",
    title: "Weekly behavior report ready",
    description: "Liam scored 88% this week, up from 82% last week",
    time: "1 day ago",
    child: "Liam",
  },
  {
    id: 7,
    source: "GetConnected",
    icon: Clock,
    color: "bg-chart-3/10 text-chart-3",
    title: "Hours logged: 2.5 hrs",
    description: "Library Reading Program on Tuesday",
    time: "2 days ago",
    child: null,
  },
]

export function ActivityFeed() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Recent Activity</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {activities.length} updates
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-[400px] pr-3">
          <div className="flex flex-col gap-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${activity.color}`}
                >
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-tight">
                      {activity.title}
                    </p>
                    {activity.child && (
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                          {activity.child[0]}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
                      {activity.source}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
