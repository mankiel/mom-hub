import { NextResponse } from "next/server"

const GROUPME_API = "https://api.groupme.com/v3"

export async function GET() {
  const token = process.env.GROUPME_ACCESS_TOKEN
  return NextResponse.json({ configured: !!token })
}

export async function POST(req: Request) {
  let body: { token?: string; action?: string; groupId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const { action, groupId } = body
  // Use server-side env var first, fall back to client-provided token
  const token = process.env.GROUPME_ACCESS_TOKEN || body.token

  if (!token) {
    return NextResponse.json({ error: "GroupMe access token not configured. Add GROUPME_ACCESS_TOKEN in your environment variables." }, { status: 401 })
  }

  try {
    if (action === "verify") {
      const res = await fetch(`${GROUPME_API}/users/me?token=${token}`)
      if (!res.ok) {
        return NextResponse.json({ error: "Invalid token. Please check your GroupMe access token." }, { status: 401 })
      }
      const data = await res.json()
      return NextResponse.json({
        verified: true,
        user: { name: data.response.name, id: data.response.id },
      })
    }

    if (action === "groups") {
      const res = await fetch(`${GROUPME_API}/groups?token=${token}&per_page=50`)
      if (!res.ok) throw new Error("Failed to fetch groups")
      const data = await res.json()
      const groups = (data.response || []).map((g: Record<string, unknown>) => ({
        id: g.id || g.group_id,
        name: g.name,
        description: g.description || "",
        image_url: g.image_url,
        members_count: (g.members as unknown[])?.length || 0,
        messages_count: (g.messages as Record<string, unknown>)?.count || 0,
        updated_at: g.updated_at,
      }))
      return NextResponse.json({ groups })
    }

    if (action === "messages" && groupId) {
      const res = await fetch(`${GROUPME_API}/groups/${groupId}/messages?token=${token}&limit=20`)
      if (!res.ok) throw new Error("Failed to fetch messages")
      const data = await res.json()
      const messages = (data.response?.messages || []).map((m: Record<string, unknown>) => ({
        id: m.id,
        name: m.name,
        text: m.text,
        created_at: m.created_at,
        avatar_url: m.avatar_url,
        favorited_by: m.favorited_by || [],
      }))
      return NextResponse.json({ messages })
    }

    return NextResponse.json({ error: "Invalid action. Use: verify, groups, messages" }, { status: 400 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
