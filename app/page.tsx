"use client"

import { MomHubSidebar } from "@/components/mom-hub/sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <SidebarProvider>
      <MomHubSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Mom Hub</h1>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-6">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 p-6">
            <p className="text-muted-foreground">
              Select a section from the sidebar to get started.
            </p>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
