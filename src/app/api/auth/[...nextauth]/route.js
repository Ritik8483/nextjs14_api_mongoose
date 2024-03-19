import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import AzureADProvider from "next-auth/providers/azure-ad";
import { connect } from "@/app/lib/db";
import User from "@/app/lib/model/user";

console.log("GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const res = await fetch("http://localhost:3000/api/users", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: "Bearer token123456789",
        //   },
        // });
        // console.log("res", res);
        // const userResp = await res.json();
        // console.log("userABOVE", userResp);
        // if (res.ok && userResp) {
        //   const user = {
        //     name: userResp?.user?.username,
        //     email: userResp?.user?.email,
        //   };
        //   return user;
        // }
        // return null;

        const res = await User.findOne({
          $and: [
            { email: credentials.email },
            { username: credentials.username },
            { password: credentials.password },
          ],
        });
        console.log("res", res);
        if (res?._id) {
          const user = {
            name: res?.username,
            email: res?.email,
          };
          return user;
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GIT_CLIENT_ID,
      clientSecret: process.env.GIT_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log("account", account);
      console.log("tokenAbove", token);
      if (account) {
        token.accessToken = account.access_token;
      }
      return token; // Do different verification for other providers that don't have `email_verified`
    },
    async session({ session, token, user }) {
      console.log("session", session);
      console.log("token", token);
      console.log("user", user);
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
