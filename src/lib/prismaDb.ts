import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    const neon = new Pool({
        connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaNeon(neon);
    return new PrismaClient({ adapter });
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const DB = globalThis.prismaGlobal ?? prismaClientSingleton();

export default DB;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = DB;
