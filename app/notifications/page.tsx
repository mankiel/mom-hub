"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/mom-hub/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Bell,
  GraduationCap,
  Trophy,
  HandHeart,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Star,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NotificationType = "message" | "alert" | "success" | "info"
type SourceType = "ClassDojo" | "GameChanger" | "GetConnected"

interface Notification {
  id: number
  title: string
  description: string
  source: SourceType
  type: NotificationType
  time: string
  read: boolean
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    title: "New message from Mrs. Thompson",
    description: "Liam did great on his reading assignment today! He's showing real improvement.",
    source: "ClassDojo",
    type: "message",
    time: "10 min ago",
    read: false,
  },
  {
    id: 2,
    title: "Game reminder: Tomorrow at 4 PM",
    description: "Thunderbolts vs Eagles at Lincoln Field. Don't forget cleats and water bottle.",
    source: "GameChanger",
    type: "info",
    time: "25 min ago",
    read: false,
  },
  {
    id: 3,
    title: "Volunteer shift confirmed",
    description: "You're signed up for Library Helper on Friday, Feb 20 from 9 AM - 12 PM.",
    source: "GetConnected",
    type: "success",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    title: "Behavior report: Emma earned 5 points",
    description: "Emma earned points for Teamwork and Helping Others in class today.",
    source: "ClassDojo",
    type: "success",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 5,
    title: "Practice canceled",
    description: "Wednesday soccer practice has been canceled due to weather. Rescheduled to Thursday.",
    source: "GameChanger",
    type: "alert",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 6,
    title: "New opportunity: Science Fair Setup",
    description: "2 volunteer slots available for Science Fair setup on March 1. Sign up now!",
    source: "GetConnected",
    type: "info",
    time: "4 hours ago",
    read: true,
  },
  {
    id: 7,
    title: "Weekly behavior summary",
    description: "Liam had an excellent week with 23 positive points and 0 needs-work points.",
    source: "ClassDojo",
    type: "success",
    time: "Yesterday",
    read: true,
  },
  {
    id: 8,
    title: "Game stats published",
    description: "Stats from Saturday's game are now available. Liam scored 2 goals!",
    source: "GameChanger",
    type: "info",
    time: "Yesterday",
    read: true,
  },
  {
    id: 9,
    title: "Hours verified",
    description: "Your 3 volunteer hours from the Book Drive have been verified and logged.",
    source: "GetConnected",
    type: "success",
    time: "2 days ago",
    read: true,
  },
  {
    id: 10,
    title: "Permission slip due",
    description: "Field trip permission slip for the Natural History Museum is due by Friday.",
    source: "ClassDojo",
    type: "alert",
    time: "2 days ago",
    read: true,
  },
]

const SOURCE_CONFIG: Record<SourceType, { icon: typeof GraduationCap; color: string; bg: string }> = {
  ClassDojo: { icon: GraduationCap, color: "text-chart-1", bg: "bg-chart-1" },
  GameChanger: { icon: Trophy, color: "text-chart-2", bg: "bg-chart-2" },
  GetConnected: { icon: HandHeart, color: "text-chart-3", bg: "bg-chart-3" },
}

const TYPE_ICON: Record<NotificationType, typeof Bell> = {
  message: MessageSquare,
  alert: AlertTriangle,
  success: CheckCircle2,
  info: Bell,
}

type FilterType = "all" | SourceType

export default function NotificationsPage() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  const filtered = filter === "all" ? notifications : notifications.filter((n) => n.source === filter)
  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: number) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <DashboardLayout title="Notifications" subtitle={`${unreadCount} unread`}>
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1">
              {(["all", "ClassDojo", "GameChanger", "GetConnected"] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors shrink-0",
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {f === "all" ? "All" : f}
                </button>
              ))}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-medium text-primary hover:underline shrink-0"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="space-y-2">
            {filtered.map((notification) => {
              const source = SOURCE_CONFIG[notification.source]
              const TypeIcon = TYPE_ICON[notification.type]
              return (
                <Card
                  key={notification.id}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-muted/30",
                    !notification.read && "border-primary/20 bg-primary/[0.02]"
                  )}
                  onClick={() => markRead(notification.id)}
                >
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className={cn("mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", source.bg)}>
                      <source.icon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <p className={cn("text-sm", !notification.read ? "font-semibold" : "font-medium")}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                          )}
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {notification.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {notification.source}
                        </Badge>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <TypeIcon className="h-3 w-3" />
                          <span className="text-[10px] capitalize">{notification.type}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-sm font-semibold">{notifications.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Unread</span>
                <Badge variant={unreadCount > 0 ? "default" : "secondary"} className="text-xs">
                  {unreadCount}
                </Badge>
              </div>
              <div className="border-t pt-3 space-y-2">
                {(["ClassDojo", "GameChanger", "GetConnected"] as SourceType[]).map((source) => {
                  const config = SOURCE_CONFIG[source]
                  const count = notifications.filter((n) => n.source === source).length
                  const unread = notifications.filter((n) => n.source === source && !n.read).length
                  return (
                    <div key={source} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <config.icon className={cn("h-3.5 w-3.5", config.color)} />
                        <span className="text-sm text-muted-foreground">{source}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">{count}</span>
                        {unread > 0 && (
                          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                            {unread}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <Star className="h-4 w-4" />
                View starred
              </button>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <Calendar className="h-4 w-4" />
                Event reminders
              </button>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <Bell className="h-4 w-4" />
                Notification settings
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
