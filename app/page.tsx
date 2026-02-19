"use client"

import {
  MomHubSidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/mom-hub/sidebar"
import { Separator } from "@/components/ui/separator"
import { OverviewCards } from "@/components/mom-hub/overview-cards"
import { ActivityFeed } from "@/components/mom-hub/activity-feed"
import { UpcomingEvents } from "@/components/mom-hub/upcoming-events"
import { ChildrenOverview } from "@/components/mom-hub/children-overview"

export default function Home() {
  return (
    <SidebarProvider>
      <MomHubSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 md:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex flex-1 items-center justify-between min-w-0">
            <h1 className="text-lg font-semibold">Overview</h1>
            <p className="hidden sm:block text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-balance">
              Good morning, Sarah
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {"Here's what's happening across your family's activities today."}
            </p>
          </div>
          <OverviewCards />
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3 flex flex-col gap-6">
              <ActivityFeed />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-6">
              <ChildrenOverview />
              <UpcomingEvents />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
