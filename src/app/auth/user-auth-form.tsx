"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/lib/database.types'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from 'lucide-react';

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>("")

  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const handleSignIn = async (email: string, password: string) => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    setIsLoading(false);
    res?.error === null ? router.push('/') : setError(res)
  }

  async function onSubmit(event: any) {
    event.preventDefault()
    setIsLoading(true)

    const data = new FormData(event.target);
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    if(email && password) {
        handleSignIn(email, password)
    }
  }

  return (
    <div className="grid gap-6">
        {error !== "" && 
            <Alert variant="destructive">
                <AlertTriangle color="red" className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error?.message}
                </AlertDescription>
            </Alert>}
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">
              Username/Email
            </Label>
            <Input
              id="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <Button disabled={isLoading}>
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}