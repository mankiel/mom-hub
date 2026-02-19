"use client"

import { MomHubSidebar } from "@/components/mom-hub/sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface DashboardLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
}

export function DashboardLayout({ title, subtitle, children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <MomHubSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold">{title}</h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-6 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
