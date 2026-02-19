"use client"

import {
  Users,
  User,
  GraduationCap,
  Mail,
  Phone,
  Trophy,
} from "lucide-react"
import { DashboardLayout } from "@/components/mom-hub/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const familyMembers = [
  {
    name: "Emma",
    initials: "EM",
    role: "Child",
    age: 10,
    grade: "5th Grade",
    school: "Lincoln Elementary",
    activities: ["Soccer", "Art Club", "Chess"],
  },
  {
    name: "Liam",
    initials: "LI",
    role: "Child",
    age: 8,
    grade: "3rd Grade",
    school: "Lincoln Elementary",
    activities: ["Soccer", "Reading Club"],
  },
  {
    name: "Sarah",
    initials: "SM",
    role: "Parent",
    email: "sarah@example.com",
    phone: "(555) 123-4567",
  },
  {
    name: "John",
    initials: "JM",
    role: "Parent",
    email: "john@example.com",
    phone: "(555) 987-6543",
  },
]

const getAvatarClasses = (index: number) => {
  const classes = [
    "bg-chart-1/10 text-chart-1",
    "bg-chart-2/10 text-chart-2",
    "bg-chart-3/10 text-chart-3",
    "bg-chart-4/10 text-chart-4",
  ]
  return classes[index % classes.length]
}

export default function FamilyMembersPage() {
  const children = familyMembers.filter((member) => member.role === "Child")
  const parents = familyMembers.filter((member) => member.role === "Parent")

  // Calculate dynamic metrics
  const uniqueSchools = new Set(children.map((child) => child.school)).size
  const allSchools = Array.from(new Set(children.map((child) => child.school)))
  const totalActivities = new Set(children.flatMap((child) => child.activities || [])).size

  return (
    <DashboardLayout title="Family Members" subtitle="Manage your family">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
            <Users className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{familyMembers.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">{children.length} children, {parents.length} parents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Children</CardTitle>
            <User className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{children.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">Active students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">School{uniqueSchools > 1 ? "s" : ""}</CardTitle>
            <GraduationCap className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueSchools}</div>
            <p className="mt-1 text-xs text-muted-foreground">{allSchools.join(", ")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Activities</CardTitle>
            <Trophy className="h-4 w-4 text-chart-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActivities}</div>
            <p className="mt-1 text-xs text-muted-foreground">Total activities</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Children</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {children.map((child, index) => (
              <Card key={child.name}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className={`${getAvatarClasses(index)} text-xl font-bold`}>
                        {child.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{child.name}</CardTitle>
                      <CardDescription>
                        Age {child.age} - {child.grade}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{child.role}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{child.school}</span>
                  </div>
                  {child.activities && child.activities.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Activities</p>
                      <div className="flex flex-wrap gap-1.5">
                        {child.activities.map((activity) => (
                          <Badge key={activity} variant="secondary" className="text-xs">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-semibold mb-4">Parents</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {parents.map((parent, index) => (
              <Card key={parent.name}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className={`${getAvatarClasses(children.length + index)} text-xl font-bold`}>
                        {parent.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base">{parent.name}</CardTitle>
                      <CardDescription>{parent.role}</CardDescription>
                    </div>
                    <Badge variant="outline">{parent.role}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {parent.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{parent.email}</span>
                    </div>
                  )}
                  {parent.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{parent.phone}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
