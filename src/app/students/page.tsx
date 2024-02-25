import prisma from "../../../prisma/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Metadata } from "next"
import { Cake } from 'lucide-react'
import { School } from 'lucide-react'
import { cn } from "@/lib/utils"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { MainNav } from "@/app/dashboard/components/main-nav"
// import TeamSwitcher from "@/app/dashboard/components/team-switcher"
import { UserNav } from "@/app/dashboard/components/user-nav"

export const metadata: Metadata = {
  title: "Students",
  description: "Students",
}

export default async function StudentsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session?.user) {
    redirect("/login");
  }

  const students = await getStudents();

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
            <h2 className="text-3xl font-bold tracking-tight">Alunos</h2>
          </div>
          <div className="space-y-4">
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
                          {student.birthday && <div className="flex items-start text-xs text-muted-foreground">
                            <Cake className="mr-1" size={16}/>
                            <span className="mt-px">{student.birthday.toLocaleDateString('pt-PT')}</span>
                          </div>}
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
          </div>
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