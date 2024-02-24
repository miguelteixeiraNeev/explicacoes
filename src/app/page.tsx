import prisma from "../../prisma/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Metadata } from "next"
import Image from "next/image"
import { Cake } from 'lucide-react'
import { School } from 'lucide-react'
import { cn } from "@/lib/utils"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import Calendar from "@/app/dashboard/components/calendar"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { MainNav } from "./dashboard/components/main-nav"
import { Overview } from "./dashboard/components/overview"
import { RecentSales } from "./dashboard/components/recent-sales"
import TeamSwitcher from "./dashboard/components/team-switcher"
import { UserNav } from "./dashboard/components/user-nav"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session?.user) {
    redirect("/login");
  }

  const students = await getStudents();
  const events = await getEvents();
  console.log(events);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">
                Geral
              </TabsTrigger>
              <TabsTrigger value="analytics">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports">
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications">
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {students?.map((fullStudent: any) => {
                  const { Student: student, School: school } = fullStudent;
                  return (
                    <Card key={student.name} className={cn("shadow-none", {
                      "border-pink-300/75": student.gender,
                      "border-cyan-300/75": !student.gender,
                    })}>
                      <div className="px-6 py-3 flex items-center">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={student.avatar} alt="Avatar" />
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                        <div className="pl-6">
                          <CardHeader className="p-0 flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-md font-medium">
                              {student.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            <div className="flex items-start text-xs text-muted-foreground">
                              <Cake className="mr-1" size={16}/>
                              <span className="mt-px">{student.birthday.toLocaleDateString('pt-PT')}</span>
                            </div>
                            <div className="flex items-start text-xs text-muted-foreground mt-1">
                              <School className="mr-1" size={16} />
                              <span className="mt-px">{school.name}</span>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  )
              })}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2 p-6">
                  <Calendar events={events} students={students} />
                </Card>
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Próximos Eventos</CardTitle>
                    <CardDescription>
                      Os próximos exames ou aniversários
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
                  Analytics
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

async function getStudents() {
  try {
    const students = await prisma.StudentYear.findMany({
      where: {
        year_id: 1,
      },
      include: {
        Student: true,
        School: true,
      },
    });
    return students
  } catch(e) {
    console.log('Erro:', e)
  }
}

async function getEvents() {
  try {
    const events = await prisma.Grade.findMany({
      where: {
        year_id: 1,
      },
      include: {
        StudentYear: {
          include: {
            Student: {
              select: {
                name: true,
              },
            }
          },
        },
        Subject: {
          select: {
            name: true,
          }
        },
      },
    });
    return events
  } catch(e) {
    console.log('Erro:', e)
  }
}

