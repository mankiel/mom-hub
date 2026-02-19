"use client"

import {
  Trophy,
  Calendar,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  Users,
  Target,
} from "lucide-react"
import { DashboardLayout } from "@/components/mom-hub/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const teamStats = {
  name: "Thunderbolts",
  sport: "Soccer",
  season: "Spring 2026",
  record: "8-2-1",
  nextGame: "Saturday, 11:00 AM",
  opponent: "Eagles",
  location: "Eagle Park, Field 3",
}

const playerStats = {
  name: "Liam",
  initials: "LI",
  position: "Forward",
  gamesPlayed: 11,
  goals: 8,
  assists: 5,
  mvpAwards: 2,
}

const schedule = [
  { id: 1, opponent: "Eagles", date: "Saturday, Feb 21", time: "11:00 AM", location: "Eagle Park, Field 3", home: false, result: null },
  { id: 2, opponent: "Wildcats", date: "Saturday, Feb 28", time: "10:00 AM", location: "Memorial Field", home: true, result: null },
  { id: 3, opponent: "Sharks", date: "Saturday, Mar 7", time: "2:00 PM", location: "Ocean View Park", home: false, result: null },
]

const recentGames = [
  { id: 1, opponent: "Hawks", date: "Saturday, Feb 14", score: "3-1", result: "W", liamGoals: 2, liamAssists: 0, mvp: true },
  { id: 2, opponent: "Lions", date: "Saturday, Feb 7", score: "2-2", result: "D", liamGoals: 1, liamAssists: 1, mvp: false },
  { id: 3, opponent: "Bears", date: "Saturday, Jan 31", score: "4-0", result: "W", liamGoals: 1, liamAssists: 2, mvp: false },
  { id: 4, opponent: "Wolves", date: "Saturday, Jan 24", score: "2-1", result: "W", liamGoals: 0, liamAssists: 1, mvp: false },
  { id: 5, opponent: "Tigers", date: "Saturday, Jan 17", score: "1-3", result: "L", liamGoals: 1, liamAssists: 0, mvp: false },
]

export default function GameChangerPage() {
  return (
    <DashboardLayout title="GameChanger" subtitle="Sports & Games">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Season Record</CardTitle>
            <Trophy className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats.record}</div>
            <p className="mt-1 text-xs text-muted-foreground">{teamStats.name} - {teamStats.season}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{"Liam's Goals"}</CardTitle>
            <Target className="h-4 w-4 text-chart-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playerStats.goals}</div>
            <p className="mt-1 text-xs text-muted-foreground">{playerStats.assists} assists this season</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Game</CardTitle>
            <Calendar className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sat 11am</div>
            <p className="mt-1 text-xs text-muted-foreground">vs. {teamStats.opponent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">MVP Awards</CardTitle>
            <Star className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playerStats.mvpAwards}</div>
            <p className="mt-1 text-xs text-muted-foreground">Player of the Game</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList>
          <TabsTrigger value="schedule">Upcoming Games</TabsTrigger>
          <TabsTrigger value="results">Recent Results</TabsTrigger>
          <TabsTrigger value="player">Player Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {schedule.map((game) => (
                  <div key={game.id} className="flex items-center gap-4 p-4">
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-chart-2/10">
                      <Trophy className="h-5 w-5 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        {game.home ? "vs." : "@"} {game.opponent}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />{game.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />{game.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />{game.location}
                        </span>
                      </div>
                    </div>
                    <Badge variant={game.home ? "default" : "outline"}>
                      {game.home ? "Home" : "Away"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="divide-y">
                  {recentGames.map((game) => (
                    <div key={game.id} className="flex items-center gap-4 p-4">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm ${
                        game.result === "W" ? "bg-chart-3/10 text-chart-3" :
                        game.result === "L" ? "bg-destructive/10 text-destructive" :
                        "bg-chart-2/10 text-chart-2"
                      }`}>
                        {game.result}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">vs. {game.opponent}</p>
                          <span className="text-lg font-bold">{game.score}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{game.date}</p>
                      </div>
                      <div className="text-right text-xs">
                        {game.liamGoals > 0 && <p className="font-medium">{game.liamGoals} goal{game.liamGoals > 1 ? "s" : ""}</p>}
                        {game.liamAssists > 0 && <p className="text-muted-foreground">{game.liamAssists} assist{game.liamAssists > 1 ? "s" : ""}</p>}
                        {game.mvp && <Badge className="mt-1 h-4 px-1 text-[9px]">MVP</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="player">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-chart-2/10 text-chart-2 text-xl font-bold">LI</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">Liam</h3>
                  <p className="text-sm text-muted-foreground">{playerStats.position} - {teamStats.name}</p>
                  <p className="text-xs text-muted-foreground">{teamStats.sport} - {teamStats.season}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl border p-4 text-center">
                  <p className="text-2xl font-bold">{playerStats.gamesPlayed}</p>
                  <p className="text-xs text-muted-foreground mt-1">Games Played</p>
                </div>
                <div className="rounded-xl border p-4 text-center">
                  <p className="text-2xl font-bold">{playerStats.goals}</p>
                  <p className="text-xs text-muted-foreground mt-1">Goals</p>
                </div>
                <div className="rounded-xl border p-4 text-center">
                  <p className="text-2xl font-bold">{playerStats.assists}</p>
                  <p className="text-xs text-muted-foreground mt-1">Assists</p>
                </div>
                <div className="rounded-xl border p-4 text-center">
                  <p className="text-2xl font-bold">{playerStats.mvpAwards}</p>
                  <p className="text-xs text-muted-foreground mt-1">MVP Awards</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
