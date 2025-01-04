import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/",
  },
};

export const { handlers, auth } = NextAuth(config);