"use server";

import DB from "@/lib/prismaDb";

export const CreateType = async (TypeName: string) => {
    const type = await DB.type.create({ data: { name: TypeName } });
    return type;
};
