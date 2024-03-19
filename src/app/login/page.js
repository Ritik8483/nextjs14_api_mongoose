"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  console.log("session", session);

  useEffect(() => {
    if (session?.status === "authenticated") {
      redirect("/dashboard");
    }
  }, [session?.status]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {session?.status !== "authenticated" && (
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <h2>Login Page</h2>
          <input
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image
              onClick={() => signIn("google")}
              src="/google.svg"
              alt="google"
              height="40"
              width="40"
              style={{ cursor: "pointer" }}
            />
            <Image
              onClick={() => signIn("github")}
              // onClick={() => signIn()}    //if we dont give it will ask by own by giving options
              src="/github.png"
              alt="github"
              height="40"
              width="40"
              style={{ cursor: "pointer" }}
            />
            <Image
              src="/microsoft.svg"
              alt="microsoft"
              height="40"
              width="40"
              style={{ cursor: "pointer" }}
            />
            <Image
              src="/facebook.svg"
              alt="facebook"
              height="40"
              width="40"
              style={{ cursor: "pointer" }}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default page;
