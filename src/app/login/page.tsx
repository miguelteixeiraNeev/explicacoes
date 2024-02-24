'use client'

import { UserAuthForm } from "@/app/auth/user-auth-form"
import { NotebookText } from "lucide-react"

export default function Login() {

  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <NotebookText />
            &nbsp;Explicações SCMVC
          </div>
          <div className="relative z-20 mt-auto"><blockquote className="space-y-2"><p className="text-lg">Banco Local de Voluntariado de Vila do Conde</p></blockquote></div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login
              </h1>
              <p className="text-sm text-muted-foreground">Introduza o seu email e password</p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}