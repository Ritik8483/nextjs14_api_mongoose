"use client";

// import { getServerSession } from "next-auth";
// import { SessionProvider } from "next-auth/react";
// import React from "react";

// const NextAuthProvider = async ({ children }) => {
//   const session = await getServerSession();

//   return <SessionProvider session={session}>{children}</SessionProvider>;
// };

// export default NextAuthProvider;

// import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

const NextAuthProvider = ({ children }) => {
  // const session = await getServerSession();
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
