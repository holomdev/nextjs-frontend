import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, _req) {
        const res = await fetch("http://localhost:3500/authentication/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          })
        });
        
        const user = await res.json();
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
    async jwt({token, user}) {
      return {...token, ...user}
    }
  }
}

export default NextAuth(authOptions)