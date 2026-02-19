"use client"

import { MomHubSidebar } from "@/components/mom-hub/sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <SidebarProvider>
      <MomHubSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-6">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Mom Hub</h1>
        </header>
        <main className="flex-1 p-6">
          <p className="text-muted-foreground">
            Select a section from the sidebar to get started.
          </p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
