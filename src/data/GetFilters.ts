"use server";
import DB from "@/lib/prismaDb";

export default async function getFilters() {
    const categories = await DB.category.findMany({
        where: {
            products: {
                some: {
                    isArchived: false,
                },
            },
        },
    });

    const colors = await DB.color.findMany({
        where: {
            products: {
                some: { isArchived: false },
            },
        },
    });
    const sizes = await DB.size.findMany({
        where: {
            products: {
                some: { isArchived: false },
            },
        },
    });
    return { categories, colors, sizes };
}
