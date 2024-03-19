"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const session = useSession()
  useEffect(() => {
    if (session?.status === "authenticated" &&
    session?.data?.message === "UNAUTORIZED") {
      redirect("/dashboard");
    }
  }, [session?.status]);

  return (
    <div>
      <Link href="/login">Navigate to login page</Link>
    </div>
  );
}
