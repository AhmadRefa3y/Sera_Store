"use server";

import DB from "@/lib/prismaDb";

export const CreateColor = async (ColorName: string, ColorValue: string) => {
    const Color = await DB.color.create({
        data: { name: ColorName, value: ColorValue },
    });
    return Color;
};
