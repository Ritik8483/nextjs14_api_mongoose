"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const session = useSession();

  useEffect(() => {
    if (session?.data?.user?.name) {
      redirect("/dashboard");
    }
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        Signed in as {session?.data?.user?.name} <br />
        <button
          onClick={() =>
            signOut({ callbackUrl: "http://localhost:3000/login" })
          }
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default page;
