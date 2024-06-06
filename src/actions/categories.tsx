"use server";

import DB from "@/lib/prismaDb";

export const CreateCategory = async (CategoryName: string) => {
    try {
        const Category = await DB.category.create({
            data: {
                name: CategoryName,
            },
        });

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
