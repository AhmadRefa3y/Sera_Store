"use server";

import DB from "@/lib/prismaDb";

export const Createsize = async (sizeName: string, sizeValue: string) => {
    const size = await DB.size.create({
        data: { name: sizeName, value: sizeValue },
    });
    return size;
};
