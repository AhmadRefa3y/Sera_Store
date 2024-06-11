"use server";

import DB from "@/lib/prismaDb";
import { revalidatePath } from "next/cache";

export const CreateColor = async (ColorName: string, ColorValue: string) => {
    try {
        const Color = await DB.color.create({
            data: { name: ColorName, value: ColorValue },
        });
        revalidatePath("/", "layout");
        return {
            status: "ok",
            data: Color,
        };
    } catch (error) {
        return {
            status: "error",
            error: error,
        };
    }
};
