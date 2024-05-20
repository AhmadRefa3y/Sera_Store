"use server";

import DB from "@/lib/prismaDb";

export const CreateCategory = async (CategoryName: string, typeID: string) => {
    const Category = await DB.category.create({
        data: {
            name: CategoryName,
            type: {
                connect: { id: typeID },
            },
        },
    });

    return Category;
};
