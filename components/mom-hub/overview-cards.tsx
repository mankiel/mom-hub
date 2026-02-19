"use client"

import {
  GraduationCap,
  Trophy,
  HandHeart,
  TrendingUp,
  Calendar,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Behavior Score",
    value: "92%",
    change: "+5% this week",
    icon: GraduationCap,
    source: "ClassDojo",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    title: "Upcoming Games",
    value: "3",
    change: "Next: Saturday 10am",
    icon: Trophy,
    source: "GameChanger",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Volunteer Hours",
    value: "12.5",
    change: "Goal: 20 hrs/semester",
    icon: HandHeart,
    source: "GetConnected",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    title: "Events This Week",
    value: "7",
    change: "2 today, 3 tomorrow",
    icon: Calendar,
    source: "All Sources",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function OverviewCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
            <p className="mt-2 text-xs font-medium text-muted-foreground/70">
              {stat.source}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
