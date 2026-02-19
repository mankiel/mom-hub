export type ServiceId = "groupme" | "teamsnap" | "gamechanger" | "remind"

export type ConnectionStatus = "connected" | "disconnected" | "syncing" | "error"

export interface ServiceConnection {
  id: ServiceId
  name: string
  description: string
  status: ConnectionStatus
  apiAvailable: boolean
  authMethod: "token" | "oauth" | "partner" | "none"
  tokenUrl?: string
  lastSynced?: string
  error?: string
}

export const SERVICES: ServiceConnection[] = [
  {
    id: "groupme",
    name: "GroupMe",
    description: "Group messaging for teams, clubs, and parent groups. Sync your messages and events.",
    status: "disconnected",
    apiAvailable: true,
    authMethod: "token",
    tokenUrl: "https://dev.groupme.com/",
  },
  {
    id: "teamsnap",
    name: "TeamSnap",
    description: "Team management for youth sports. Sync schedules, events, and availability.",
    status: "disconnected",
    apiAvailable: true,
    authMethod: "token",
    tokenUrl: "https://auth.teamsnap.com/",
  },
  {
    id: "gamechanger",
    name: "GameChanger",
    description: "Live game scoring and stats for youth sports. No public API available.",
    status: "disconnected",
    apiAvailable: false,
    authMethod: "none",
  },
  {
    id: "remind",
    name: "Remind",
    description: "School-home messaging platform. Requires partner access for API integration.",
    status: "disconnected",
    apiAvailable: false,
    authMethod: "partner",
  },
]

export interface GroupMeGroup {
  id: string
  name: string
  description: string
  image_url: string | null
  members_count: number
  messages_count: number
  updated_at: string
}

export interface GroupMeMessage {
  id: string
  name: string
  text: string
  created_at: number
  avatar_url: string | null
  favorited_by: string[]
}

export interface TeamSnapTeam {
  id: string
  name: string
  sport: string
  season: string
  division: string
}

export interface TeamSnapEvent {
  id: string
  team_id: string
  name: string
  start_date: string
  end_date: string | null
  location: string
  is_game: boolean
  opponent: string | null
  notes: string
}
