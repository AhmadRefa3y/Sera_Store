"use server";

import DB from "@/lib/prismaDb";
import { revalidatePath } from "next/cache";

export const CreateCategory = async (CategoryName: string) => {
    try {
        const Category = await DB.category.create({
            data: {
                name: CategoryName,
            },
        });
        revalidatePath("/", "layout");
        return {
            status: "ok",
            data: Category,
        };
    } catch (error) {
        return {
            status: "error",
            error: error,
        };
    }
};
