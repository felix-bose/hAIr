import type { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authConfig = {
  providers: [GoogleProvider],
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnApi = nextUrl.pathname.startsWith("/api")
      if (isOnApi) {
        return isLoggedIn
      }
      return true
    },
  },
} satisfies NextAuthConfig
