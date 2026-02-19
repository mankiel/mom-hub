"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Heart,
  LayoutDashboard,
  GraduationCap,
  Trophy,
  HandHeart,
  CalendarDays,
  Bell,
  PanelLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

const SidebarContext = createContext({ open: true, toggle: () => {} })

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <SidebarContext.Provider value={{ open, toggle: () => setOpen((o) => !o) }}>
      <div className="flex h-screen overflow-hidden">{children}</div>
    </SidebarContext.Provider>
  )
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggle } = useContext(SidebarContext)
  return (
    <button
      onClick={toggle}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
        className
      )}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  )
}

export function SidebarInset({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col overflow-auto bg-background">
      {children}
    </div>
  )
}

const MAIN_NAV = [
  { title: "Overview", href: "/", icon: LayoutDashboard },
  { title: "Calendar", href: "/calendar", icon: CalendarDays },
  { title: "Notifications", href: "/notifications", icon: Bell },
]

const SOURCES_NAV = [
  { title: "ClassDojo", href: "/classdojo", icon: GraduationCap },
  { title: "GameChanger", href: "/gamechanger", icon: Trophy },
  { title: "GetConnected", href: "/getconnected", icon: HandHeart },
]

function NavItem({
  item,
  isActive,
  collapsed,
}: {
  item: { title: string; href: string; icon: React.ComponentType<{ className?: string }> }
  isActive: boolean
  collapsed: boolean
}) {
  return (
    <Link
      href={item.href}
      title={collapsed ? item.title : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
      )}
    >
      <item.icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span className="truncate">{item.title}</span>}
    </Link>
  )
}

export function MomHubSidebar() {
  const pathname = usePathname()
  const { open } = useContext(SidebarContext)

  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
        open ? "w-64" : "w-0 overflow-hidden border-r-0"
      )}
    >
      <div className="flex h-14 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
          <Heart className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Mom Hub</span>
          <span className="text-[10px] text-sidebar-foreground/60">Family Dashboard</span>
        </div>
      </div>

      <nav className="flex-1 overflow-auto p-2">
        <div className="mb-1 px-3 py-1.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
            Main
          </span>
        </div>
        <div className="space-y-0.5">
          {MAIN_NAV.map((item) => (
            <NavItem key={item.href} item={item} isActive={pathname === item.href} collapsed={false} />
          ))}
        </div>

        <div className="mb-1 mt-4 px-3 py-1.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
            Connected Apps
          </span>
        </div>
        <div className="space-y-0.5">
          {SOURCES_NAV.map((item) => (
            <NavItem key={item.href} item={item} isActive={pathname === item.href} collapsed={false} />
          ))}
        </div>
      </nav>


    </aside>
  )
}
