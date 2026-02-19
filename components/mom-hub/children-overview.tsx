"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const children = [
  {
    name: "Emma",
    initials: "EM",
    grade: "3rd Grade",
    school: "Lincoln Elementary",
    behaviorScore: 92,
    behaviorTrend: "up",
    sports: [],
    volunteerHours: 0,
    unreadMessages: 2,
    highlights: ["Star student this week", "Science fair project due Friday"],
  },
  {
    name: "Liam",
    initials: "LI",
    grade: "5th Grade",
    school: "Lincoln Elementary",
    behaviorScore: 88,
    behaviorTrend: "up",
    sports: ["Soccer - Thunderbolts"],
    volunteerHours: 0,
    unreadMessages: 0,
    highlights: ["Player of the Game - Saturday", "Behavior up 6 points"],
  },
]

export function ChildrenOverview() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Your Children</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {children.map((child) => (
            <div
              key={child.name}
              className="rounded-lg border bg-background p-4"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {child.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{child.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {child.grade} - {child.school}
                      </p>
                    </div>
                    {child.unreadMessages > 0 && (
                      <Badge className="h-5 px-1.5 text-[10px]">
                        {child.unreadMessages} new
                      </Badge>
                    )}
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Behavior Score
                      </span>
                      <span className="font-semibold">{child.behaviorScore}%</span>
                    </div>
                    <Progress value={child.behaviorScore} className="h-1.5" />
                  </div>

                  {child.sports.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {child.sports.map((sport) => (
                        <Badge
                          key={sport}
                          variant="outline"
                          className="text-[10px]"
                        >
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex flex-col gap-1">
                    {child.highlights.map((highlight) => (
                      <p
                        key={highlight}
                        className="text-xs text-muted-foreground leading-relaxed"
                      >
                        {highlight}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
