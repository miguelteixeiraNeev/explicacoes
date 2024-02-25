import prisma from "../../prisma/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Metadata } from "next"

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
import { RecentSales } from "./dashboard/components/recent-sales"
// import TeamSwitcher from "./dashboard/components/team-switcher"
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

  const nextBirthdays = students.filter((student: any) => student.Student.birthday !== null).map((student: any) => {
    return {
      name: student.Student.name,
      date: new Date(`${new Date().getFullYear()}-${("0" + (student.Student.birthday.getMonth() + 1)).slice(-2)}-${("0" + student.Student.birthday.getDate()).slice(-2)}`),
      desc: `${("0" + student.Student.birthday.getDate()).slice(-2)}/${("0" + (student.Student.birthday.getMonth() + 1)).slice(-2)} - Aniversário`,
      icon: 'party2.gif',
      avatar: student.Student.avatar,
    }
  })

  const nextEvents = events.map((event: any) => {
    return {
      name: event.StudentYear.Student.name,
      date: event.date,
      desc: `${("0" + event.date.getDate()).slice(-2)}/${("0" + (event.date.getMonth() + 1)).slice(-2)} - Teste de ${event.Subject.name} (${event.Subject.Level.name})`,
      icon: event.Subject.icon,
      avatar: event.StudentYear.Student.avatar,
    }
  })

  const totalNextEvents = [...nextEvents, ...nextBirthdays].filter((evt: any) => evt.date >= new Date()).sort((a, b) => {
    //@ts-ignore
    return new Date(a.date) - new Date(b.date);
  })

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
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
              <TabsTrigger value="info">
                Matéria
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
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
                    <RecentSales events={totalNextEvents} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="info" className="space-y-4">
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
                avatar: true,
              },
            }
          },
        },
        Subject: {
          include: {
            Level: {
              select: {
                name: true,
              }
            }
          }
        },
      },
    });
    return events
  } catch(e) {
    console.log('Erro:', e)
  }
}

