"use server";

import DB from "@/lib/prismaDb";
import { revalidatePath } from "next/cache";

export const Createsize = async (sizeName: string, sizeValue: string) => {
    try {
        const size = await DB.size.create({
            data: { name: sizeName, value: sizeValue },
        });
        revalidatePath("/", "layout");
        return {
            status: "ok",
            data: size,
        };
    } catch (error) {
        return {
            status: "error",
            error: error,
        };
    }
};
