"use client"

import { useState, useCallback, useEffect } from "react"
import {
  MessageSquare,
  Users,
  Trophy,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  Info,
  ClipboardPaste,
} from "lucide-react"
import { DashboardLayout } from "@/components/mom-hub/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { ServiceId } from "@/lib/connections"

interface ConnectionState {
  token: string
  status: "disconnected" | "connecting" | "connected" | "error"
  userName?: string
  error?: string
  lastSynced?: string
}

interface GroupMeGroup {
  id: string
  name: string
  description: string
  members_count: number
  messages_count: number
}

interface GroupMeMessage {
  id: string
  name: string
  text: string
  created_at: number
}

interface TeamSnapTeam {
  id: string
  name: string
  sport: string
  season: string
}

interface TeamSnapEvent {
  id: string
  name: string
  start_date: string
  location: string
  is_game: boolean
  opponent: string | null
}

const SERVICE_META: Record<ServiceId, {
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
}> = {
  groupme: { name: "GroupMe", icon: MessageSquare, color: "text-blue-600", bgColor: "bg-blue-50" },
  teamsnap: { name: "TeamSnap", icon: Users, color: "text-green-600", bgColor: "bg-green-50" },
  gamechanger: { name: "GameChanger", icon: Trophy, color: "text-orange-600", bgColor: "bg-orange-50" },
  remind: { name: "Remind", icon: GraduationCap, color: "text-purple-600", bgColor: "bg-purple-50" },
}

function ServiceIcon({ id, className }: { id: ServiceId; className?: string }) {
  const meta = SERVICE_META[id]
  const Icon = meta.icon
  return (
    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", meta.bgColor, className)}>
      <Icon className={cn("h-5 w-5", meta.color)} />
    </div>
  )
}

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<Record<string, ConnectionState>>({
    groupme: { token: "", status: "disconnected" },
    teamsnap: { token: "", status: "disconnected" },
  })

  const [groupmeData, setGroupmeData] = useState<{
    groups: GroupMeGroup[]
    messages: Record<string, GroupMeMessage[]>
    syncing: boolean
    expanded: string | null
  }>({ groups: [], messages: {}, syncing: false, expanded: null })

  const [teamsnapData, setTeamsnapData] = useState<{
    teams: TeamSnapTeam[]
    events: Record<string, TeamSnapEvent[]>
    syncing: boolean
    expanded: string | null
  }>({ teams: [], events: {}, syncing: false, expanded: null })

  const updateConnection = useCallback((id: string, update: Partial<ConnectionState>) => {
    setConnections(prev => ({
      ...prev,
      [id]: { ...prev[id], ...update },
    }))
  }, [])

  // Auto-connect GroupMe if server-side token is configured
  useEffect(() => {
    async function checkServerToken() {
      try {
        const res = await fetch("/api/connections/groupme")
        const data = await res.json()
        if (data.configured) {
          updateConnection("groupme", { status: "connecting", token: "server" })
          const verifyRes = await fetch("/api/connections/groupme", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "verify" }),
          })
          const verifyData = await verifyRes.json()
          if (verifyRes.ok) {
            updateConnection("groupme", {
              status: "connected",
              token: "server",
              userName: verifyData.user.name,
              lastSynced: new Date().toISOString(),
            })
          } else {
            updateConnection("groupme", { status: "error", token: "", error: verifyData.error })
          }
        }
      } catch { /* silent - fallback to manual entry */ }
    }
    checkServerToken()
  }, [updateConnection])

  async function connectGroupMe() {
    const conn = connections.groupme
    if (!conn.token.trim() || conn.token === "server") return
    updateConnection("groupme", { status: "connecting", error: undefined })

    try {
      // Send token in body for manual entry (server-side env var takes precedence in the API route)
      const res = await fetch("/api/connections/groupme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: conn.token, action: "verify" }),
      })
      const data = await res.json()
      if (!res.ok) {
        updateConnection("groupme", { status: "error", error: data.error })
        return
      }
      updateConnection("groupme", {
        status: "connected",
        userName: data.user.name,
        lastSynced: new Date().toISOString(),
      })
    } catch {
      updateConnection("groupme", { status: "error", error: "Network error" })
    }
  }

  async function syncGroupMe() {
    if (connections.groupme.status !== "connected") return
    setGroupmeData(prev => ({ ...prev, syncing: true }))

    try {
      const res = await fetch("/api/connections/groupme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "groups" }),
      })
      const data = await res.json()
      if (res.ok) {
        setGroupmeData(prev => ({ ...prev, groups: data.groups, syncing: false }))
        updateConnection("groupme", { lastSynced: new Date().toISOString() })
      } else {
        setGroupmeData(prev => ({ ...prev, syncing: false }))
      }
    } catch {
      setGroupmeData(prev => ({ ...prev, syncing: false }))
    }
  }

  async function fetchGroupMessages(groupId: string) {
    if (groupmeData.messages[groupId]) {
      setGroupmeData(prev => ({
        ...prev,
        expanded: prev.expanded === groupId ? null : groupId,
      }))
      return
    }

    try {
      const res = await fetch("/api/connections/groupme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "messages", groupId }),
      })
      const data = await res.json()
      if (res.ok) {
        setGroupmeData(prev => ({
          ...prev,
          messages: { ...prev.messages, [groupId]: data.messages },
          expanded: groupId,
        }))
      }
    } catch { /* silent */ }
  }

  async function connectTeamSnap() {
    const conn = connections.teamsnap
    if (!conn.token.trim()) return
    updateConnection("teamsnap", { status: "connecting", error: undefined })

    try {
      const res = await fetch("/api/connections/teamsnap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: conn.token, action: "verify" }),
      })
      const data = await res.json()
      if (!res.ok) {
        updateConnection("teamsnap", { status: "error", error: data.error })
        return
      }
      updateConnection("teamsnap", {
        status: "connected",
        userName: data.user.name,
        lastSynced: new Date().toISOString(),
      })
    } catch {
      updateConnection("teamsnap", { status: "error", error: "Network error" })
    }
  }

  async function syncTeamSnap() {
    const conn = connections.teamsnap
    if (conn.status !== "connected") return
    setTeamsnapData(prev => ({ ...prev, syncing: true }))

    try {
      const res = await fetch("/api/connections/teamsnap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: conn.token, action: "teams" }),
      })
      const data = await res.json()
      if (res.ok) {
        setTeamsnapData(prev => ({ ...prev, teams: data.teams, syncing: false }))
        updateConnection("teamsnap", { lastSynced: new Date().toISOString() })
      } else {
        setTeamsnapData(prev => ({ ...prev, syncing: false }))
      }
    } catch {
      setTeamsnapData(prev => ({ ...prev, syncing: false }))
    }
  }

  async function fetchTeamEvents(teamId: string) {
    if (teamsnapData.events[teamId]) {
      setTeamsnapData(prev => ({
        ...prev,
        expanded: prev.expanded === teamId ? null : teamId,
      }))
      return
    }

    const conn = connections.teamsnap
    try {
      const res = await fetch("/api/connections/teamsnap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: conn.token, action: "events", teamId }),
      })
      const data = await res.json()
      if (res.ok) {
        setTeamsnapData(prev => ({
          ...prev,
          events: { ...prev.events, [teamId]: data.events },
          expanded: teamId,
        }))
      }
    } catch { /* silent */ }
  }

  function disconnect(id: string) {
    updateConnection(id, { status: "disconnected", token: "", userName: undefined, error: undefined, lastSynced: undefined })
    if (id === "groupme") setGroupmeData({ groups: [], messages: {}, syncing: false, expanded: null })
    if (id === "teamsnap") setTeamsnapData({ teams: [], events: {}, syncing: false, expanded: null })
  }

  return (
    <DashboardLayout title="Connections" subtitle="Manage your app integrations">
      <p className="text-sm text-muted-foreground -mt-2">
        Connect your accounts to sync messages, schedules, and events into Mom Hub.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* GroupMe Card */}
        <Card className={cn(connections.groupme.status === "connected" && "border-blue-200")}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <ServiceIcon id="groupme" />
                <div>
                  <CardTitle className="text-base">GroupMe</CardTitle>
                  <CardDescription>Group messaging for teams and parent groups</CardDescription>
                </div>
              </div>
              {connections.groupme.status === "connected" && (
                <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50 shrink-0">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Connected
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {connections.groupme.status === "connecting" && connections.groupme.token === "server" ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Connecting with your saved token...
              </div>
            ) : connections.groupme.status !== "connected" ? (
              <>
                <div className="rounded-lg border border-dashed p-3">
                  <p className="text-xs text-muted-foreground mb-2">
                    Get your access token from{" "}
                    <a href="https://dev.groupme.com/" target="_blank" rel="noopener noreferrer"
                      className="text-primary font-medium hover:underline inline-flex items-center gap-0.5">
                      dev.groupme.com <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Paste your access token"
                      value={connections.groupme.token === "server" ? "" : connections.groupme.token}
                      onChange={e => updateConnection("groupme", { token: e.target.value })}
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={connectGroupMe}
                      disabled={!connections.groupme.token.trim() || connections.groupme.token === "server" || connections.groupme.status === "connecting"}
                    >
                      {connections.groupme.status === "connecting" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : "Connect"}
                    </Button>
                  </div>
                </div>
                {connections.groupme.error && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <XCircle className="h-4 w-4 shrink-0" />
                    {connections.groupme.error}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Signed in as </span>
                    <span className="font-medium">{connections.groupme.userName}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={syncGroupMe} disabled={groupmeData.syncing} className="gap-1.5">
                      {groupmeData.syncing ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                      Sync
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => disconnect("groupme")} className="text-destructive hover:text-destructive">
                      Disconnect
                    </Button>
                  </div>
                </div>

                {connections.groupme.lastSynced && (
                  <p className="text-[11px] text-muted-foreground">
                    Last synced: {new Date(connections.groupme.lastSynced).toLocaleString()}
                  </p>
                )}

                {groupmeData.groups.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Groups</h4>
                    <div className="space-y-1">
                      {groupmeData.groups.map(group => (
                        <div key={group.id} className="rounded-lg border">
                          <button
                            onClick={() => fetchGroupMessages(group.id)}
                            className="flex w-full items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors rounded-lg"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{group.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {group.members_count} members &middot; {group.messages_count} messages
                              </p>
                            </div>
                            {groupmeData.expanded === group.id ? (
                              <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                          </button>
                          {groupmeData.expanded === group.id && groupmeData.messages[group.id] && (
                            <div className="border-t divide-y max-h-60 overflow-auto">
                              {groupmeData.messages[group.id].map(msg => (
                                <div key={msg.id} className="px-3 py-2">
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-xs font-semibold">{msg.name}</span>
                                    <span className="text-[10px] text-muted-foreground">
                                      {new Date(msg.created_at * 1000).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-0.5">{msg.text}</p>
                                </div>
                              ))}
                              {groupmeData.messages[group.id].length === 0 && (
                                <p className="p-3 text-xs text-muted-foreground">No recent messages</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* TeamSnap Card */}
        <Card className={cn(connections.teamsnap.status === "connected" && "border-green-200")}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <ServiceIcon id="teamsnap" />
                <div>
                  <CardTitle className="text-base">TeamSnap</CardTitle>
                  <CardDescription>Team management and sports scheduling</CardDescription>
                </div>
              </div>
              {connections.teamsnap.status === "connected" && (
                <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 shrink-0">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Connected
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {connections.teamsnap.status !== "connected" ? (
              <>
                <div className="rounded-lg border border-dashed p-3">
                  <p className="text-xs text-muted-foreground mb-2">
                    Get your OAuth token from{" "}
                    <a href="https://auth.teamsnap.com/" target="_blank" rel="noopener noreferrer"
                      className="text-primary font-medium hover:underline inline-flex items-center gap-0.5">
                      auth.teamsnap.com <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Paste your access token"
                      value={connections.teamsnap.token}
                      onChange={e => updateConnection("teamsnap", { token: e.target.value })}
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={connectTeamSnap}
                      disabled={!connections.teamsnap.token.trim() || connections.teamsnap.status === "connecting"}
                    >
                      {connections.teamsnap.status === "connecting" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : "Connect"}
                    </Button>
                  </div>
                </div>
                {connections.teamsnap.error && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <XCircle className="h-4 w-4 shrink-0" />
                    {connections.teamsnap.error}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Signed in as </span>
                    <span className="font-medium">{connections.teamsnap.userName}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={syncTeamSnap} disabled={teamsnapData.syncing} className="gap-1.5">
                      {teamsnapData.syncing ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                      Sync
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => disconnect("teamsnap")} className="text-destructive hover:text-destructive">
                      Disconnect
                    </Button>
                  </div>
                </div>

                {connections.teamsnap.lastSynced && (
                  <p className="text-[11px] text-muted-foreground">
                    Last synced: {new Date(connections.teamsnap.lastSynced).toLocaleString()}
                  </p>
                )}

                {teamsnapData.teams.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Teams</h4>
                    <div className="space-y-1">
                      {teamsnapData.teams.map(team => (
                        <div key={team.id} className="rounded-lg border">
                          <button
                            onClick={() => fetchTeamEvents(team.id)}
                            className="flex w-full items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors rounded-lg"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{team.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {team.sport} {team.season && `- ${team.season}`}
                              </p>
                            </div>
                            {teamsnapData.expanded === team.id ? (
                              <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                          </button>
                          {teamsnapData.expanded === team.id && teamsnapData.events[team.id] && (
                            <div className="border-t divide-y max-h-60 overflow-auto">
                              {teamsnapData.events[team.id].map(evt => (
                                <div key={evt.id} className="px-3 py-2">
                                  <p className="text-sm font-medium">
                                    {evt.is_game ? "Game" : evt.name}
                                    {evt.opponent && ` vs. ${evt.opponent}`}
                                  </p>
                                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                                    {evt.start_date && (
                                      <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(evt.start_date).toLocaleDateString()}
                                      </span>
                                    )}
                                    {evt.start_date && (
                                      <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {new Date(evt.start_date).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                                      </span>
                                    )}
                                    {evt.location && (
                                      <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        {evt.location}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                              {teamsnapData.events[team.id].length === 0 && (
                                <p className="p-3 text-xs text-muted-foreground">No upcoming events</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* GameChanger Card -- No API */}
        <Card className="border-dashed">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <ServiceIcon id="gamechanger" />
                <div>
                  <CardTitle className="text-base">GameChanger</CardTitle>
                  <CardDescription>Live game scoring and stats for youth sports</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-muted-foreground shrink-0">
                No API
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted/50 p-4 space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">GameChanger does not offer a public API</p>
                  <p className="mt-1">You can still bring GameChanger data into Mom Hub using these methods:</p>
                </div>
              </div>
              <div className="space-y-2 pl-6">
                <Link href="/import" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <ClipboardPaste className="h-3.5 w-3.5" />
                  Smart Import -- paste messages or upload screenshots
                </Link>
                <Link href="/import" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Calendar className="h-3.5 w-3.5" />
                  ICS Calendar Import -- import schedules via calendar links
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Remind Card -- Partner Only */}
        <Card className="border-dashed">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <ServiceIcon id="remind" />
                <div>
                  <CardTitle className="text-base">Remind</CardTitle>
                  <CardDescription>School-home messaging platform</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-muted-foreground shrink-0">
                Partner Only
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted/50 p-4 space-y-3">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Remind requires a partner agreement for API access</p>
                  <p className="mt-1">
                    Contact{" "}
                    <a href="mailto:partners@remind.com" className="text-primary hover:underline">
                      partners@remind.com
                    </a>{" "}
                    to apply for partner integration. In the meantime:
                  </p>
                </div>
              </div>
              <div className="space-y-2 pl-6">
                <Link href="/import" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <ClipboardPaste className="h-3.5 w-3.5" />
                  Smart Import -- paste Remind messages
                </Link>
                <Link href="/import" className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Calendar className="h-3.5 w-3.5" />
                  ICS Calendar Import -- import school calendar links
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
