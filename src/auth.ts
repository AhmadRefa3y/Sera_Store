import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import DB from "./lib/prismaDb";
import Google from "next-auth/providers/google";
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(DB),
    callbacks: {
        session({ session, user }) {
            session.user.role = user.role;
            return session;
        },
    },
    providers: [Google],
});
