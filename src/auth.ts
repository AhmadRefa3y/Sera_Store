import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import DB from "./lib/prismaDb";
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(DB),
    providers: [],
});
