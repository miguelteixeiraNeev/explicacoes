import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Students",
  description: "Students",
}

export default async function StudentsPage() {

}