import { NextResponse } from "next/server"

const TEAMSNAP_API = "https://api.teamsnap.com/v3"

function teamsnapHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  }
}

export async function POST(req: Request) {
  let body: { token?: string; action?: string; teamId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { token, action, teamId } = body

  if (!token) {
    return NextResponse.json({ error: "Access token required" }, { status: 401 })
  }

  try {
    if (action === "verify") {
      const res = await fetch(`${TEAMSNAP_API}/me`, { headers: teamsnapHeaders(token) })
      if (!res.ok) {
        return NextResponse.json({ error: "Invalid token. Please check your TeamSnap access token." }, { status: 401 })
      }
      const data = await res.json()
      const user = data?.collection?.items?.[0]?.data
      const firstName = user?.find((d: Record<string, string>) => d.name === "first_name")?.value || ""
      const lastName = user?.find((d: Record<string, string>) => d.name === "last_name")?.value || ""
      return NextResponse.json({
        verified: true,
        user: { name: `${firstName} ${lastName}`.trim() || "TeamSnap User" },
      })
    }

    if (action === "teams") {
      const res = await fetch(`${TEAMSNAP_API}/teams/search?user_id=me`, { headers: teamsnapHeaders(token) })
      if (!res.ok) throw new Error("Failed to fetch teams")
      const data = await res.json()
      const teams = (data?.collection?.items || []).map((item: Record<string, unknown>) => {
        const d = item.data as Record<string, string>[]
        const get = (name: string) => d?.find((f) => f.name === name)?.value || ""
        return {
          id: get("id"),
          name: get("team_name") || get("name"),
          sport: get("sport"),
          season: get("season_name"),
          division: get("division_name"),
        }
      })
      return NextResponse.json({ teams })
    }

    if (action === "events" && teamId) {
      const res = await fetch(`${TEAMSNAP_API}/events/search?team_id=${teamId}&started_after=${new Date().toISOString()}`, {
        headers: teamsnapHeaders(token),
      })
      if (!res.ok) throw new Error("Failed to fetch events")
      const data = await res.json()
      const events = (data?.collection?.items || []).map((item: Record<string, unknown>) => {
        const d = item.data as Record<string, string>[]
        const get = (name: string) => d?.find((f) => f.name === name)?.value || ""
        return {
          id: get("id"),
          team_id: teamId,
          name: get("name") || get("event_title"),
          start_date: get("start_date"),
          end_date: get("end_date"),
          location: get("location_name"),
          is_game: get("is_game") === "true",
          opponent: get("opponent_name"),
          notes: get("notes"),
        }
      })
      return NextResponse.json({ events })
    }

    return NextResponse.json({ error: "Invalid action. Use: verify, teams, events" }, { status: 400 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
