"use client"

import {
  MomHubSidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/mom-hub/sidebar"
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
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 md:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between min-w-0">
            <h1 className="text-lg font-semibold truncate">{title}</h1>
            {subtitle && (
              <p className="hidden sm:block text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
