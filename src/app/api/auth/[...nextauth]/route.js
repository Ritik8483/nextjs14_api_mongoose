import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

console.log("GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GIT_CLIENT_ID,
      clientSecret: process.env.GIT_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
