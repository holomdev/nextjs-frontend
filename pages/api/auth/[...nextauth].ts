import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, _req) {
        const res = await axios.post("/authentication/sign-in", {
          email: credentials?.email,
          password: credentials?.password,
        });
        
        const user = await res.data;
        if (user?.error) {
          return null
        } else {
          return user
        }
      }
    })
  ],
  pages: {
    signIn: "/"
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user = token as any
      return session
    },
    async jwt({token, user, trigger, session}) {
      if(trigger === "update") {
        return {...token, ...session.user}
      }
      return {...token, ...user}
    }
  }
}

export default NextAuth(authOptions)